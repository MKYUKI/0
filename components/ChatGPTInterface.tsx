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

/**
 * 1ページ目のみ: height → ほぼ画面全体
 * 2～6ページ目: height 60～70%程度
 * さらにファイルアップロード(Word/PDF/画像/その他)可能。
 */
export default function ChatGPTInterface({ isPage1Override }: ChatProps) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 常に最下部へ
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // ファイルアップロード → Base64化してメッセージに表示
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result
      if (!base64 || typeof base64 !== 'string') return
      const fileMsg = {
        role: 'user' as const,
        content: `File uploaded: ${file.name} (size=${file.size} bytes, base64Len=${base64.length})`,
      }
      setMessages((prev) => [...prev, fileMsg])
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
              return [...prev.slice(0, -1), { role: 'assistant', content: buffer }]
            } else {
              return [...prev, { role: 'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 25)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  // レイアウト
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255,255,255,0.9)',
    border: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
    margin: '0 auto',
  }

  if (isPage1Override) {
    // 1ページ目 → ほぼ全画面
    containerStyle.width = '100%'
    containerStyle.maxWidth = '100%'
    containerStyle.height = 'calc(100vh - 70px)' // sticky nav の高さ差し引き
  } else {
    // 2~6ページ目
    containerStyle.width = '100%'
    containerStyle.maxWidth = '900px'
    containerStyle.height = '60vh' // 大きさは適宜変更可
  }

  const topAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
  }

  const bottomAreaStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid #ccc',
    background: '#f3f3f3',
  }

  const textAreaStyle: React.CSSProperties = {
    flex: 1,
    resize: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '0.95rem',
  }

  const fileButtonStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.3rem',
  }

  const sendButtonStyle: React.CSSProperties = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0 16px',
    fontSize: '1rem',
    cursor: 'pointer',
  }

  return (
    <div style={containerStyle}>
      <div style={topAreaStyle}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={bottomAreaStyle}>
        {/* ファイル送信用 Input */}
        <input
          type="file"
          style={fileButtonStyle}
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        <textarea
          style={textAreaStyle}
          placeholder="(Inspired by chatgpt.com) Enter your text or attach files..."
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
