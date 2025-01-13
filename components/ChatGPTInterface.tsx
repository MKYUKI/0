// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({ role, content }: { role:'user'|'assistant'|'system'; content:string }) {
  return <div className={`message-bubble ${role}`}>{content}</div>
}

interface Props {
  isPage1?: boolean
}

export default function ChatGPTInterface({ isPage1 }: Props) {
  const [messages, setMessages] = useState<{ role:'user'|'assistant'|'system'; content:string }[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement|null>(null)

  const scrollToBottom = () => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }
  useEffect(() => { scrollToBottom() }, [messages])

  const handleSend = async () => {
    if(!userInput.trim()) return
    const userMsg = { role:'user' as const, content:userInput.trim() }
    setMessages(prev => [...prev, userMsg])
    setUserInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ model:'gpt-4', messages:[...messages, userMsg] })
      })
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content || ''

      let buffer=''
      let i=0
      const intervalID = setInterval(()=>{
        if(i<text.length){
          buffer += text.charAt(i++)
          setMessages(prev => {
            const last=prev[prev.length-1]
            if(last && last.role==='assistant'){
              return [...prev.slice(0,-1), { role:'assistant', content:buffer }]
            } else {
              return [...prev, { role:'assistant', content:buffer }]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      },20)
    } catch(err){
      console.error('Error in /api/chat:', err)
      setIsLoading(false)
    }
  }

  // base style
  const containerStyle: React.CSSProperties = {
    display:'flex',
    flexDirection:'column',
    margin:'0 auto',
    background:'#fafafa',
    border:'1px solid #ddd',
    borderRadius:'8px',
    overflow:'hidden',
    position:'relative',
    // default: 60vh
    height:'60vh',
    maxWidth:'800px',
    width:'100%',
  }

  if(isPage1) {
    // page1: 70vh
    containerStyle.height = '70vh'
  }

  return (
    <div style={containerStyle}>
      <div className="messages-window" style={{ flex:1, overflowY:'auto', padding:'16px' }}>
        {messages.map((m, i) => <MessageBubble key={i} role={m.role} content={m.content} />)}
        <div ref={bottomRef} />
      </div>

      <div className="input-container" style={{ display:'flex', background:'#f3f3f3', borderTop:'1px solid #ccc', padding:'0.75rem', gap:'0.75rem' }}>
        <textarea
          style={{
            flex:1, resize:'none', border:'1px solid #ccc', borderRadius:'4px',
            padding:'12px', fontFamily:'Helvetica', outline:'none', boxSizing:'border-box',
            fontSize:'0.95rem', color:'#000', background:'#fff'
          }}
          placeholder="Ask 0 anything..."
          value={userInput}
          onChange={(e)=>setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={{
            backgroundColor:'#31a37d', color:'#fff', border:'none',
            padding:'0 24px', fontSize:'0.95rem', cursor:'pointer',
            borderRadius:'4px'
          }}
          onClick={handleSend}
          disabled={isLoading||!userInput.trim()}
        >
          {isLoading?'Thinking...':'Send'}
        </button>
      </div>
    </div>
  )
}
