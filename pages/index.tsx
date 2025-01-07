// pages/index.tsx
import React from 'react';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // セッション読み込み中
  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  // ▼ 未ログイン: 「異次元」アニメーション
  if (!session) {
    return (
      <div className={styles.main}>
        {/* メインSVGアニメContainer */}
        <div className={styles.svgContainer}>
          <svg
            className={styles.kaleidoSvg}
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/*
                濃い青(#000080相当)～濃紫(#330066)～深ラズベリー(#88002b)
                さらに色を区切り増やして激しく
              */}
              <radialGradient id="infiniteGrad" cx="50%" cy="50%" r="85%">
                <stop offset="0%" stopColor="#000080" />
                <stop offset="30%" stopColor="#330066" />
                <stop offset="60%" stopColor="#66002b" />
                <stop offset="90%" stopColor="#88002b" />
                <stop offset="100%" stopColor="#220011" />
              </radialGradient>
            </defs>

            {/* 大円 */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="url(#infiniteGrad)"
              className={styles.circleMain}
            />

            {/* リング1 */}
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#330066"
              strokeWidth="8"
              style={{ mixBlendMode: 'screen' }}
              className={styles.ring1}
            />
            {/* リング2 */}
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="#88002b"
              strokeWidth="5"
              style={{ mixBlendMode: 'screen' }}
              className={styles.ring2}
            />

            {/* path1: 複雑形 */}
            <path
              d="M100,10 C140,30 180,90 150,130 120,170 70,160 60,110 50,70 80,40 100,20Z"
              fill="#000080"
              fillOpacity="0.8"
              style={{ mixBlendMode: 'screen' }}
              className={styles.path1}
            />
            {/* path2 */}
            <path
              d="M30,180 C70,130 160,130 190,90 200,70 160,50 120,30 
                90,20 60,30 30,60 10,90 10,140 20,160Z"
              fill="#88002b"
              fillOpacity="0.7"
              style={{ mixBlendMode: 'screen' }}
              className={styles.path2}
            />

            {/* ドット複数 */}
            <circle
              cx="140"
              cy="60"
              r="8"
              fill="#330066"
              fillOpacity="0.8"
              className={styles.dot1}
            />
            <circle
              cx="60"
              cy="140"
              r="6"
              fill="#66002b"
              fillOpacity="0.7"
              className={styles.dot2}
            />
            <circle
              cx="120"
              cy="30"
              r="5"
              fill="#000080"
              fillOpacity="0.75"
              className={styles.dot3}
            />
          </svg>
        </div>

        {/* 前景UI */}
        <div className={styles.container}>
          <h1 className={styles.title}>0 へようこそ</h1>
          <p className={styles.subtitle}>
            <br />
            
          </p>
          {/* ボタンでログイン (NextAuth) */}
          <button className={styles.loginButton} onClick={() => signIn()}>
            ログイン
          </button>
        </div>
      </div>
    );
  }

  // ▼ ログイン済み: アニメOFF → Chat or 超越ページへ
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>ログイン済み: </h1>
        <p className={styles.subtitle}>ユーザ: {session.user?.email}</p>
        <button className={styles.logoutButton} onClick={() => signOut()}>
          ログアウト
        </button>
        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = '/chat')}
        >
          ChatGPTページ
        </button>
        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = '/mega')}
        >
          世界最大アニメへ
        </button>
      </div>
    </div>
  );
};

export default Home;
