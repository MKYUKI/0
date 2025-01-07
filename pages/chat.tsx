// pages/chat.tsx
import React from 'react';
import { useSession } from 'next-auth/react';
import styles from '../styles/Chat.module.css';

export default function ChatPage() {
  const { data: session, status } = useSession();

  // ログイン必須
  if (status === 'loading') {
    return <div>Loading session for Chat...</div>;
  }
  if (!session) {
    return (
      <div style={{ padding: '2rem', color: '#333' }}>
        <h2>ログインしていません</h2>
        <p>
          <a href="/">トップへ戻る</a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.megaMain}>
      {/* --- 背景の超絶アニメSVG --- */}
      <div className={styles.svgContainer}>
        <svg
          className={styles.megaSvg}
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* さらに限界まで濃い青・紫・ラズベリー */}
            <radialGradient id="megaGradient" cx="50%" cy="50%" r="90%">
              <stop offset="0%" stopColor="#000080" />
              <stop offset="30%" stopColor="#330066" />
              <stop offset="60%" stopColor="#66002b" />
              <stop offset="90%" stopColor="#88002b" />
              <stop offset="100%" stopColor="#220011" />
            </radialGradient>
          </defs>

          {/* 超巨大円 */}
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="url(#megaGradient)"
            className={styles.megaCircle1}
          />

          {/* リング1 */}
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#330066"
            strokeWidth="10"
            style={{ mixBlendMode: 'screen' }}
            className={styles.megaCircle2}
          />
          {/* リング2 */}
          <circle
            cx="200"
            cy="200"
            r="80"
            fill="none"
            stroke="#88002b"
            strokeWidth="6"
            style={{ mixBlendMode: 'screen' }}
            className={styles.megaCircle3}
          />

          {/* path1: 複雑にうねる形 (濃青) */}
          <path
            d="M200,40 C270,60 370,140 340,220 320,260 260,300 200,340 
               140,300 80,260 60,220 40,160 110,90 200,60Z"
            fill="#000080"
            fillOpacity="0.8"
            className={styles.megaPath1}
          />

          {/* path2: 更に奇抜な形 (ラズベリー) */}
          <path
            d="M320,200 C340,180 400,130 380,80 340,0 220,20 200,80 
               180,20 60,0 20,80 0,130 60,180 80,200 100,220 140,280 200,340 
               260,280 300,220 320,200Z"
            fill="#88002b"
            fillOpacity="0.65"
            className={styles.megaPath2}
          />

          {/* 複数の点を散りばめ */}
          <circle
            cx="300"
            cy="100"
            r="15"
            fill="#330066"
            fillOpacity="0.85"
            className={styles.dot1}
          />
          <circle
            cx="100"
            cy="300"
            r="12"
            fill="#66002b"
            fillOpacity="0.8"
            className={styles.dot2}
          />
          <circle
            cx="280"
            cy="60"
            r="10"
            fill="#000080"
            fillOpacity="0.9"
            className={styles.dot3}
          />
        </svg>
      </div>

      {/* --- 前景: チャットUI想定 --- */}
      <div className={styles.megaContainer}>
        <h1 className={styles.megaTitle}>超越チャット空間</h1>
        <p className={styles.megaSubtitle}>
          ここでChatGPTと会話が可能。<br />
          史上最大の量子的アニメが背後でうごめく…！
        </p>

        {/* 実際のチャットUIはお好みで */}
        <div className={styles.chatBox}>
          <p>（ChatGPT APIと連携してメッセージやりとりする例）</p>
          <p>ユーザ入力欄 → AIレスポンス表示</p>
        </div>

        <a href="/" className={styles.megaBackButton}>
          トップへ戻る
        </a>
      </div>
    </div>
  );
}
