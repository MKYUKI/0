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
      const fileMsg = {
        role: 'user' as const,
        content: `File uploaded: ${file.name}, size=${file.size}, base64Len=${base64.length}`,
      }
      setMessages((prev) => [...prev, fileMsg])
    }
    reader.readAsDataURL(file)
  }

  // 送信
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
            const lastMsg = prev[prev.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
              // すでにassistantがあるなら連結
              return [...prev.slice(0, -1), { role: 'assistant', content: buffer }]
            } else {
              // なければ追加
              return [...prev, { role: 'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 25)
    } catch (err) {
      console.error('Chat error:', err)
      setIsLoading(false)
    }
  }

  // レイアウト調整
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fafafa',
    borderTop: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
    margin: '0 auto',
    width: '100%',
  }

  if (isPage1Override) {
    // 1ページ目のみ: (ヘッダー60px + フッター80px) を除いた全画面
    containerStyle.height = 'calc(100vh - 60px - 80px)'
    containerStyle.maxWidth = '100%'
  } else {
    // 2～6ページ目
    containerStyle.height = '60vh'
    containerStyle.maxWidth = '800px'
  }

  const topArea = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
  } as React.CSSProperties

  const bottomArea = {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid #ccc',
    background: '#f3f3f3',
  } as React.CSSProperties

  const textAreaStyle = {
    flex: 1,
    resize: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '0.95rem',
    fontFamily: 'sans-serif',
  } as React.CSSProperties

  const fileButtonStyle = {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.3rem',
  } as React.CSSProperties

  const sendButtonStyle = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0 16px',
    fontSize: '1rem',
    cursor: 'pointer',
  } as React.CSSProperties

  return (
    <div style={containerStyle}>
      <div style={topArea}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={bottomArea}>
        {/* ファイルアップロード */}
        <input
          type="file"
          style={fileButtonStyle}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <textarea
          style={textAreaStyle}
          placeholder="(Reference: chatgpt.com) Enter text or attach a file..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={sendButtonStyle}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
