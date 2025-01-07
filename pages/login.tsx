// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // 本来は next-auth の signIn() などを呼ぶ
    // ここではダミーでフラグを立てる→ anime へ
    setLoggedIn(true);
    router.push('/anime');
  };

  if (loggedIn) {
    // ログイン済みなら何も表示しない or anime.tsx へリダイレクト
    return null;
  }

  return (
    <div style={{
      width: '100%', height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#f0f0ff'
    }}>
      <h1>ログインページ</h1>
      <p>神アニメを見るにはログインが必要です</p>
      <button
        onClick={handleLogin}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '4px',
          background: '#000080', // 濃紺
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        ログイン(ダミー)
      </button>
    </div>
  );
}
