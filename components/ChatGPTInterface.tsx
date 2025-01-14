// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react'

function MessageBubble({ role, content }: { role: 'user'|'assistant'|'system'; content: string }) {
  return <div className={`message-bubble ${role}`}>{content}</div>
}

interface ChatProps {
  isPage1Override?: boolean
}

export default function ChatGPTInterface({ isPage1Override }: ChatProps) {
  const [messages, setMessages] = useState<{ role:'user'|'assistant'|'system'; content:string }[]>([])
  const [userInput, setUserInput] = useState('')
  const [file, setFile] = useState<File|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement|null>(null)

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length>0){
      setFile(e.target.files[0])
    }
  }

  const handleSend = async () => {
    if(!userInput.trim() && !file) return

    // 送信メッセージ作成
    let userMsgContent = userInput.trim()
    if(file) {
      userMsgContent += ` [Attached File: ${file.name}]`
    }
    const userMsg = { role:'user' as const, content: userMsgContent }
    setMessages(prev=>[...prev, userMsg])

    // Reset
    setUserInput('')
    setFile(null)
    setIsLoading(true)

    try {
      // ChatGPT API
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          model: 'gpt-4',
          messages:[...messages, userMsg]
        })
      })
      const data = await res.json()
      const text = data?.choices?.[0]?.message?.content || ''

      // タイピング風表示
      let buffer=''
      let i=0
      const intervalID = setInterval(()=>{
        if(i< text.length){
          buffer += text.charAt(i++)
          setMessages(prev=>{
            const last = prev[prev.length-1]
            if(last && last.role==='assistant'){
              return [...prev.slice(0,-1), {role:'assistant', content: buffer}]
            } else {
              return [...prev, {role:'assistant', content: buffer}]
            }
          })
        } else {
          clearInterval(intervalID)
          setIsLoading(false)
        }
      }, 20)

    } catch(err){
      console.error("Error calling /api/chat:", err)
      setIsLoading(false)
    }
  }

  // ★ isPage1Override: Chat欄をフル画面に近く
  const containerStyle: React.CSSProperties = {
    display:'flex',
    flexDirection:'column',
    margin:'0 auto',
    background:'#fafafa',
    overflow:'hidden',
    borderTop:'1px solid #ddd',
    borderLeft:'1px solid #ddd',
    borderRight:'1px solid #ddd',
    borderRadius:'8px 8px 0 0'
  }
  if(isPage1Override){
    containerStyle.height = 'calc(100vh - 80px)'
    containerStyle.width = '100%'
    containerStyle.maxWidth = '100%'
  } else {
    containerStyle.height= '60vh'
    containerStyle.width= '100%'
    containerStyle.maxWidth= '800px'
  }

  return (
    <div style={containerStyle}>
      <div className="messages-window" style={{ flex:1, overflowY:'auto', padding:16 }}>
        {messages.map((m, idx)=>
          <MessageBubble key={idx} role={m.role} content={m.content} />
        )}
        <div ref={bottomRef}/>
      </div>

      <div className="input-container" style={{ display:'flex', background:'#f3f3f3', borderTop:'1px solid #ccc', padding:'0.75rem', gap:'0.75rem'}}>
        <input type="file" onChange={handleFileChange} />
        <textarea
          style={{ flex:1, resize:'none', border:'1px solid #ccc', borderRadius:4, padding:12 }}
          placeholder="Type or attach a file..."
          value={userInput}
          onChange={(e)=>setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={{ background:'#31a37d', color:'#fff', border:'none', padding:'0 24px', borderRadius:4 }}
          onClick={handleSend}
          disabled={isLoading || (!userInput.trim() && !file)}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
