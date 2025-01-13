// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({ role, content }: { role: 'user'|'assistant'|'system'; content: string }) {
  return (
    <div className={`message-bubble ${role}`}>
      {content}
    </div>
  )
}

export default function ChatGPTInterface() {
  const [messages, setMessages] = useState<{ role:'user'|'assistant'|'system'; content:string }[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement|null>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if(!userInput.trim()) return
    const userMsg = { role:'user' as const, content: userInput.trim() }
    setMessages(prev => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          model:'gpt-4',
          messages:[...messages, userMsg]
        })
      })
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content || ''

      let buffer = ''
      let i = 0
      const intervalID = setInterval(() => {
        if(i < text.length) {
          buffer += text.charAt(i++)
          setMessages(prev => {
            const last = prev[prev.length - 1]
            if(last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role:'assistant', content: buffer }]
            } else {
              return [...prev, { role:'assistant', content: buffer }]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 20)
    } catch(err) {
      console.error('Error calling /api/chat:', err)
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="messages-window">
        {messages.map((m, idx) =>
          <MessageBubble key={idx} role={m.role} content={m.content} />
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-container">
        <textarea
          placeholder="Ask 0 anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
