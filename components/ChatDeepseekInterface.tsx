// File: components/ChatDeepseekInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

type ChatRole = 'user' | 'assistant' | 'system'

interface ChatMessage {
  role: ChatRole
  content: string
}

function MessageBubble({ role, content }: ChatMessage) {
  return (
    <div className={`message-bubble ${role}`} style={{ margin: '0.4rem 0' }}>
      <strong style={{ textTransform: 'capitalize' }}>{role}:</strong>{' '}
      {content}
    </div>
  )
}

interface ChatProps {
  // 背景を透過ガラス風にするかどうか (オプション)
  isGlass?: boolean
}

export default function ChatDeepseekInterface({ isGlass }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // メッセージが追加されるたびに下端までスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ファイルアップロード例 (任意)
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const fileMsg: ChatMessage = {
      role: 'user',
      content: `File uploaded: ${file.name} (size=${file.size} bytes)`
    }
    setMessages((prev) => [...prev, fileMsg])
  }

  // 送信ボタン
  const handleSend = async () => {
    if (!userInput.trim()) return

    const userMsg: ChatMessage = {
      role: 'user',
      content: userInput.trim()
    }
    setMessages((prev) => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      // Next.js => /api/chat => Python => Deepseek R1
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-R1', // 任意
          messages: [...messages, userMsg],
        }),
      })
      const data = await res.json()
      const answerText = data?.answer || '(no answer)'

      // タイピング風に表示
      let buffer = ''
      let i = 0
      const intervalId = setInterval(() => {
        if (i < answerText.length) {
          buffer += answerText.charAt(i++)
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last && last.role === 'assistant') {
              // すでに途中のassistantメッセージがあれば置き換え
              return [...prev.slice(0, -1), { role: 'assistant', content: buffer }]
            } else {
              // 新たにassistantメッセージを追加
              return [...prev, { role: 'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(intervalId)
          setIsLoading(false)
        }
      }, 20)
    } catch (err) {
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
    }
  }

  // スタイル
  const baseContainer: React.CSSProperties = {
    margin: '0 auto',
    width: '90%',
    maxWidth: '600px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    color: '#fff',
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden'
  }
  const normalBg = { background: 'rgba(0,0,0,0.4)' }
  const glassBg = { background: 'transparent' }

  const containerStyle = {
    ...baseContainer,
    ...(isGlass ? glassBg : normalBg)
  }

  const topAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem'
  }

  const bottomAreaStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.3)',
    background: isGlass ? 'transparent' : 'rgba(0,0,0,0.6)'
  }

  const fileRowStyle: React.CSSProperties = { marginBottom: '0.5rem' }
  const textAreaStyle: React.CSSProperties = {
    resize: 'none',
    border: isGlass ? '1px solid rgba(255,255,255,0.4)' : '1px solid #444',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '0.95rem',
    fontFamily: 'sans-serif',
    background: isGlass ? 'transparent' : '#222',
    color: '#fff',
    width: '100%',
    marginBottom: '0.5rem'
  }
  const sendButtonStyle: React.CSSProperties = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    alignSelf: 'flex-end'
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
        <div style={fileRowStyle}>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ color: '#fff', background: 'transparent' }}
          />
        </div>

        <textarea
          style={textAreaStyle}
          placeholder="Type your message..."
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
