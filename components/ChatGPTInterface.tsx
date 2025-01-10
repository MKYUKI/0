// components/ChatGPTInterface.tsx
import React, { useState } from 'react';

/**
 * ChatGPTInterface:
 *  * Minimal QA/chat style
 *  * 2017 Transformer-based approach (ref. "Attention Is All You Need": https://arxiv.org/abs/1706.03762)
 */
export default function ChatGPTInterface(){
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([]);
  const [input, setInput] = useState('');

  async function handleSend() {
    if(!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role:'user', content: userMsg }]);
    setInput('');

    try {
      // Fake /api/ask usage
      const res = await fetch('/api/ask',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ question: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role:'assistant', content: data.answer || '(No response)' }]);
    } catch(e) {
      console.error(e);
      setMessages(prev => [...prev, { role:'assistant', content:'(Error occurred)' }]);
    }
  }

  return (
    <div style={{maxWidth:'600px', margin:'1rem auto'}}>
      <div style={{
        border:'1px solid #888', borderRadius:'4px',
        padding:'8px', height:'220px', overflowY:'auto',
        marginBottom:'1rem', background:'rgba(255,255,255,0.7)'
      }}>
        {messages.map((m,i) => (
          <div key={i} style={{ margin:'4px 0'}}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        style={{width:'100%', marginBottom:'0.5rem'}}
        placeholder="Ask me anything..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
