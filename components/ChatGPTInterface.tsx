// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

// 吹き出しコンポーネント
function MessageBubble({
  role, 
  content 
}: { role: 'user' | 'assistant' | 'system'; content: string }) {
  return (
    <div className={`message-bubble ${role}`}>
      <div className="bubble-content">{content}</div>
    </div>
  )
}

export default function ChatGPTInterface() {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'system'; content: string }[]
  >([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // 送信処理
  const handleSend = async () => {
    if (!userInput.trim()) return
    const newUserMessage = { role: 'user' as const, content: userInput }

    setMessages(prev => [...prev, newUserMessage])
    setUserInput('')
    setIsLoading(true)

    try {
      // GPT-4.0推論例
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [...messages, newUserMessage]
        }),
      })
      const data = await response.json()
      const text = data.choices?.[0]?.message?.content ?? ''

      // 文字送り演出
      let buffer = ''
      let i = 0
      const intervalID = setInterval(() => {
        if (i < text.length) {
          buffer += text.charAt(i++)
          setMessages(prev => {
            const lastMsg = prev[prev.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { role: 'assistant', content: buffer }
              ]
            } else {
              return [
                ...prev,
                { role: 'assistant', content: buffer }
              ]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 20)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  // メッセージ末尾へスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat-container">
      <div className="messages-window">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !userInput.trim()}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
