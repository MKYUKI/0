// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({
  role,
  content
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

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
          messages: [...messages, userMsg]
        })
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
      }, 20)
    } catch (err) {
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
    }
  }

  // ★ 1ページ目だけ特大スタイルにする
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    borderTop: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    borderBottom: 'none',
    borderRadius: '8px 8px 0 0',
    background: '#fafafa',
    overflow: 'hidden'
  }

  if (isPage1Override) {
    // PC幅: 高さを大きめ, スマホ幅: 画面上から下まで柔軟に
    containerStyle.height = 'calc(100vh - 80px)' // navbar + some margin
    containerStyle.maxWidth = '100%'
    containerStyle.width = '100%'
  } else {
    // 他ページ: 従来通り
    containerStyle.height = '60vh'
    containerStyle.maxWidth = '800px'
    containerStyle.width = '100%'
  }

  return (
    <div style={containerStyle}>
      <div className="messages-window" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div
        className="input-container"
        style={{
          display: 'flex',
          background: '#f3f3f3',
          borderTop: '1px solid #ccc',
          padding: '0.75rem',
          gap: '0.75rem'
        }}
      >
        <textarea
          style={{
            flex: 1,
            resize: 'none',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: 12,
            fontFamily: 'Helvetica, sans-serif',
            outline: 'none',
            boxSizing: 'border-box',
            fontSize: '0.95rem',
            color: '#000',
            background: '#fff'
          }}
          placeholder="Send a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={{
            backgroundColor: '#31a37d',
            color: '#fff',
            border: 'none',
            padding: '0 24px',
            fontSize: '0.95rem',
            cursor: 'pointer',
            borderRadius: 4,
            minWidth: 84
          }}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
