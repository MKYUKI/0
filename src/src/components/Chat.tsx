// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  receiverId: string;
};

interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: string;
}

export default function Chat({ receiverId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/chat', { params: { receiverId } });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!text) return;
    try {
      await axios.post('/api/chat', { receiverId, content: text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  return (
    <div style={{ border: '1px solid #aaa', padding: '1rem', marginTop: '1rem' }}>
      <h4>チャット</h4>
      <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#fafafa', marginBottom: '0.5rem' }}>
        {messages.map((m) => (
          <div key={m._id} style={{ borderBottom: '1px solid #ddd', padding: '0.25rem' }}>
            <strong>{m.senderId}</strong>: {m.content}
          </div>
        ))}
      </div>
      <div>
        <input
          style={{ width: '70%' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メッセージ"
        />
        <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  );
}
