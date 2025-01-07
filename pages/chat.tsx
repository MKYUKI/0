// pages/chat.tsx
import React, { useState } from 'react';
import styles from '../styles/Chat.module.css';

export default function ChatPage() {
  // チャット履歴
  const [messages, setMessages] = useState<{ role: 'user'|'assistant'; content: string }[]>([]);
  // ユーザ入力
  const [input, setInput] = useState('');
  // ローディング
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // /api/dummy に問い合わせ (OpenAI代替)
      const res = await fetch('/api/dummy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.assistant ?? '...' }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error occurred' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>ChatGPT 風ページ</h1>

      <div className={styles.chatBox}>
        {messages.map((m,i) => (
          <div
            key={i}
            className={m.role === 'user' ? styles.userMessage : styles.assistantMessage}
          >
            <strong>{m.role === 'user' ? 'You' : 'GPT'}:</strong> {m.content}
          </div>
        ))}
        {loading && (
          <div className={styles.assistantMessage}>
            <strong>GPT:</strong> thinking...
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.sendButton} onClick={sendMessage} disabled={loading}>
          送信
        </button>
      </div>
    </div>
  );
}
