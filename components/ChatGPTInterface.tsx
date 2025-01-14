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
  /** 1ページ目のみ true → 高さを (100vh - Xpx) */
  isPage1Override?: boolean
}

export default function ChatGPTInterface({ isPage1Override }: ChatProps) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // スクロール自動追尾
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // ファイルアップロード: Base64化してメッセージとして表示 (参考実装)
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result
      if (!base64 || typeof base64 !== 'string') return
      const fileMsg = {
        role: 'user' as const,
        content: `File: ${file.name}, size=${file.size}, base64Len=${base64.length}`,
      }
      setMessages((prev) => [...prev, fileMsg])
    }
    reader.readAsDataURL(file)
  }

  // テキスト送信
  const handleSend = async () => {
    if (!userInput.trim()) return
    const userMsg = { role: 'user' as const, content: userInput.trim() }
    setMessages((prev) => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      // Chat API
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

      // 1文字ずつ出力
      let buffer = ''
      let i = 0
      const typingAnim = setInterval(() => {
        if (i < text.length) {
          buffer += text.charAt(i++)
          setMessages((prev) => {
            // 直前がassistantなら結合
            const last = prev[prev.length - 1]
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', content: buffer }]
            } else {
              return [...prev, { role: 'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(typingAnim)
          setIsLoading(false)
        }
      }, 20)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  // レイアウト: 1ページ目だけ画面ほぼ全体
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fefefe',  // chatgpt.comに近い
    borderTop: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
    margin: '0 auto',
  }

  if (isPage1Override) {
    containerStyle.width = '100%'
    containerStyle.maxWidth = '100%'
    containerStyle.height = 'calc(100vh - 80px)' // navbar分差し引き
  } else {
    containerStyle.width = '100%'
    containerStyle.maxWidth = '800px'
    containerStyle.height = '60vh'
  }

  const chatAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
  }

  const inputAreaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid #ccc',
    background: '#f3f3f3',
  }

  const fileStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.3rem',
    fontSize: '0.85rem',
  }

  const textStyle: React.CSSProperties = {
    flex: 1,
    resize: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '0.95rem',
  }

  const btnStyle: React.CSSProperties = {
    background: '#2bc760',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.95rem',
    cursor: 'pointer',
    minWidth: '80px',
  }

  return (
    <div style={containerStyle}>
      {/* メッセージ表示エリア */}
      <div style={chatAreaStyle}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力欄 */}
      <div style={inputAreaStyle}>
        <input
          type="file"
          style={fileStyle}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <textarea
          style={textStyle}
          placeholder="(Ref: chatgpt.com) Enter text or drop files..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={btnStyle}
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
