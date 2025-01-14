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

export default function ChatGPTInterface() {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // チャット欄の高さを 1ページ目 9割 (0.9 * window.innerHeight)
  // 2〜6ページ目 7割 (0.7 * window.innerHeight) にする例
  // Next.js SSRとの兼ね合いで、typeof window を使いクライアントサイドで判定
  const [chatHeight, setChatHeight] = useState<string>('70vh')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (currentPath === '/') {
        // Page1
        setChatHeight('90vh')
      } else {
        // Page2〜6
        setChatHeight('70vh')
      }
    }
  }, [])

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
      }, 20)
    } catch (err) {
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
    }
  }

  // インラインスタイルで高さを設定
  // 例: border や幅を適宜アレンジ
  // ここで height: chatHeight
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '100%', // 横は100%
    maxWidth: '1400px',
    height: chatHeight, // '90vh' か '70vh'
    border: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    background: '#fafafa',
    overflow: 'hidden',
  }

  const messagesWindowStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  }

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    background: '#f3f3f3',
    borderTop: '1px solid #ccc',
    padding: '0.75rem',
    gap: '0.75rem',
  }

  const textAreaStyle: React.CSSProperties = {
    flex: 1,
    resize: 'none',
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: 12,
    fontFamily: 'Helvetica, sans-serif',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontSize: '0.95rem',
    color: '#000',
    background: '#fff',
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#31a37d',
    color: '#fff',
    border: 'none',
    padding: '0 24px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    borderRadius: 4,
    minWidth: 84,
  }

  return (
    <div style={containerStyle}>
      <div style={messagesWindowStyle}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={inputContainerStyle}>
        <textarea
          style={textAreaStyle}
          placeholder="Send a message (text/word/pdf/image/etc.)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={buttonStyle}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
