// components/ChatGPTInterface.tsx
import React, { useState, useEffect, useRef } from 'react';

// メッセージの吹き出しコンポーネント
function MessageBubble({ role, content }: { role: 'user' | 'assistant' | 'system'; content: string }) {
  return (
    <div className={`message-bubble ${role}`}>
      <div className="bubble-content">
        {content}
      </div>
    </div>
  );
}

export default function ChatGPTInterface() {
  // 全メッセージを管理するステート
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system'; content: string }[]>([]);
  // ユーザーの入力
  const [userInput, setUserInput] = useState('');
  // API呼び出し中フラグ
  const [isLoading, setIsLoading] = useState(false);

  // スクロール制御に使うRef
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ユーザーが送信ボタンを押した際の処理
  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newUserMessage = { role: 'user', content: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // ---- GPTモデル推論リクエスト例 ----
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4', // GPT-4.0を利用（APIキーが対応している場合）
          messages: [...messages, newUserMessage],
          // ここに自前Attentionや独自トークナイザなどを利用する場合のパラメータを追加可能
        }),
      });
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content ?? '';

      // 文字送り演出
      let buffer = '';
      let idx = 0;

      const typeInterval = setInterval(() => {
        if (idx < text.length) {
          buffer += text.charAt(idx);
          idx++;
          setMessages((prev) => {
            // すでに末尾がassistantなら上書き
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { role: 'assistant', content: buffer },
              ];
            } else {
              return [...prev, { role: 'assistant', content: buffer }];
            }
          });
        } else {
          clearInterval(typeInterval);
          setIsLoading(false);
        }
      }, 20); // 打鍵速度(ミリ秒)
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // メッセージ末尾へ自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages-window">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !userInput.trim()}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
