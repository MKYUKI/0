// components/ChatGPTInterface.tsx
import React, { useState } from 'react';

/**
 * ChatGPTInterface (2025 edition)
 *  * Real-time QA/chat style
 *  * Transformer-based approach referencing "Attention Is All You Need" (2017)
 */
export default function ChatGPTInterface() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer || '(No response)' }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: '(Error occurred)' }]);
    }
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
      <div
        style={{
          border: '1px solid #999',
          borderRadius: '6px',
          padding: '1rem',
          height: '240px',
          overflowY: 'auto',
          marginBottom: '1rem',
          background: 'rgba(255,255,255,0.7)',
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '6px 0', textAlign: 'left' }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        style={{ width: '100%', marginBottom: '0.5rem' }}
        placeholder="Ask something about Transformers..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button
        onClick={handleSend}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          background: '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </div>
  );
}
