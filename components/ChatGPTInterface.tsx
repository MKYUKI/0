// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant' | 'system'
  content: string
}) {
  return <div className={`message-bubble ${role}`}>{content}</div>
}

interface ChatProps {
  isPage1Override?: boolean
}

export default function ChatGPTInterface({ isPage1Override }: ChatProps) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 常に最下部へスクロール
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // ファイルアップロード
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result
      if (!base64 || typeof base64 !== 'string') return
      const msg = {
        role: 'user' as const,
        content: `File upload: ${file.name}, size=${file.size}, base64Len=${base64.length}`,
      }
      setMessages((prev) => [...prev, msg])
    }
    reader.readAsDataURL(file)
  }

  const handleSend = async () => {
    if (!userInput.trim()) return
    const userMsg = { role: 'user' as const, content: userInput.trim() }
    setMessages((prev) => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [...messages, userMsg],
        }),
      })
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content || ''

      let buffer = ''
      let i = 0
      const intervalID = setInterval(() => {
        if (i < text.length) {
          buffer += text.charAt(i++)
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last && last.role === 'assistant') {
              // 直前がassistantなら連結
              return [...prev.slice(0, -1), { role: 'assistant', content: buffer }]
            } else {
              // 新規assistant回答
              return [...prev, { role: 'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 25)
    } catch (err) {
      console.error('Error in chat API:', err)
      setIsLoading(false)
    }
  }

  // レイアウト: フッターに固定されているコンポーネント
  // isPage1Overrideなら「height: calc(100vh - 60px)」 → ほぼ画面全体
  // そうしないと、スクロール不可問題が再発する可能性があるため
  const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    background: '#fff',
    // 1ページ目なら特大
    height: isPage1Override ? 'calc(100vh - 60px)' : '300px', // 300px程度でOK
    borderTop: '1px solid #ccc',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
  }

  const messagesWindow: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    background: 'rgba(255,255,255,0.85)',
  }

  const inputContainer: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    borderTop: '1px solid #ccc',
    padding: '0.75rem',
    background: '#f3f3f3',
  }

  const textAreaStyle: React.CSSProperties = {
    flex: 1,
    resize: 'none',
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '0.6rem',
  }

  const fileBtnStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.3rem',
  }

  const sendBtnStyle: React.CSSProperties = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0 1rem',
    cursor: 'pointer',
  }

  return (
    <div style={container}>
      <div style={messagesWindow}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={inputContainer}>
        <input
          type="file"
          style={fileBtnStyle}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <textarea
          style={textAreaStyle}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
          placeholder="(Reference: chatgpt.com) Type a message or attach a file..."
        />
        <button
          style={sendBtnStyle}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
