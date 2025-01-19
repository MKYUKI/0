// ========================================
// File: components/ChatGPTInterface.tsx
// ========================================
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant' | 'system'
  content: string
}) {
  return (
    <div className={`message-bubble ${role}`} style={{ margin: '0.4rem 0' }}>
      <strong style={{ textTransform: 'capitalize' }}>{role}:</strong> {content}
    </div>
  )
}

/**
 * ChatProps
 * - isGlass?: boolean => true の場合、ガラス風 (background透過 + border枠 + ぼかし) を適用
 */
interface ChatProps {
  isGlass?: boolean
}

export default function ChatGPTInterface({ isGlass }: ChatProps) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ファイルアップロード
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

  // 送信
  const handleSend = async () => {
    if (!userInput.trim()) return
    const userMsg = { role: 'user' as const, content: userInput.trim() }
    setMessages((prev) => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      // ダミーAPI例
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
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
    }
  }

  /**
   * ★ ガラス風スタイル (isGlass=true) の場合:
   *   - background: 薄い透過(例: rgba(255,255,255,0.06)) 
   *   - backdropFilter: blur(8px) など
   *   - border: 薄い白枠
   *   - boxShadow: 少し外側に発光
   */
  const glassContainer: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)', // ほんの少し白み
    // backdropFilter / WebKit系のprefix:
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(255,255,255,0.05)',
    margin: '0 auto',
    width: '90%',
    maxWidth: '600px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden', // コンテンツはみ出し防止
  }

  /**
   * ★ 通常 (黒背景)
   */
  const normalContainer: React.CSSProperties = {
    background: 'rgba(0,0,0,0.4)',
    margin: '0 auto',
    width: '90%',
    maxWidth: '600px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
  }

  const containerStyle = isGlass ? glassContainer : normalContainer

  // メッセージ表示領域
  const topAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
  }

  // 下部のファイル&入力欄
  const bottomAreaStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    padding: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.3)',
    // isGlass の場合、背景はさらに透明でもOK
    background: isGlass ? 'transparent' : 'rgba(0,0,0,0.6)',
  }

  const fileRowStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
  }

  // テキストエリア
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
    marginBottom: '0.5rem',
  }

  const sendButtonStyle: React.CSSProperties = {
    background: '#31a37d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  }

  return (
    <div style={containerStyle}>
      {/* 上部メッセージ表示部分 */}
      <div style={topAreaStyle}>
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 下部入力欄 */}
      <div style={bottomAreaStyle}>
        {/* ファイル選択 */}
        <div style={fileRowStyle}>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ color: '#fff', background: 'transparent' }}
          />
        </div>

        {/* テキスト入力 */}
        <textarea
          style={textAreaStyle}
          placeholder="メッセージを入力..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />

        {/* 送信ボタン */}
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
