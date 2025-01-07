// pages/mega.tsx
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function MegaPage() {
  // ダミーのログイン判定
  const [loggedIn] = useState(true); // 本来は useSession() で

  if (!loggedIn) {
    // 未ログインならリダイレクト or エラーメッセージ
    return (
      <div style={{ padding: '2rem' }}>
        <h2>ログインが必要です</h2>
        <p><a href="/login">ログインページへ</a></p>
      </div>
    );
  }

  // ログイン済 → “史上最大”アニメを表示
  return (
    <div className={styles.megaMain}>
      {/* SVGコンテナ */}
      <div className={styles.megaSvgContainer}>
        <svg
          className={styles.megaSvg}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* 濃い青(#000080)～濃紫(#330066)～ラズベリー(#88002b)～漆黒(#220011) */}
            <radialGradient id="superGodGrad" cx="50%" cy="50%" r="95%">
              <stop offset="0%" stopColor="#000080" />
              <stop offset="33%" stopColor="#330066" />
              <stop offset="66%" stopColor="#660022" />
              <stop offset="100%" stopColor="#220011" />
            </radialGradient>
          </defs>

          {/* 超大円 */}
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="url(#superGodGrad)"
            className={styles.megaCircle1}
          />

          {/* 複数リング */}
          <circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="#330066"
            strokeWidth="10"
            style={{ mixBlendMode: 'screen' }}
            className={styles.megaCircle2}
          />
          <circle
            cx="250"
            cy="250"
            r="90"
            fill="none"
            stroke="#88002b"
            strokeWidth="6"
            style={{ mixBlendMode: 'screen' }}
            className={styles.megaCircle3}
          />

          {/* 形状 path1 */}
          <path
            d="M250,30 C320,60 400,130 370,200 340,270 300,320 250,370 
               200,320 160,270 130,200 110,140 170,70 250,50Z"
            fill="#000080"
            fillOpacity="0.8"
            className={styles.megaPath1}
          />

          {/* 形状 path2 */}
          <path
            d="M380,250 C400,230 450,170 430,120 400,40 280,30 250,80 
               220,30 100,40 70,120 50,170 100,230 120,250 
               140,270 180,330 250,380 320,330 360,270 380,250Z"
            fill="#88002b"
            fillOpacity="0.6"
            className={styles.megaPath2}
          />

          {/* 小円散りばめ */}
          <circle cx="380" cy="120" r="16" fill="#330066" fillOpacity="0.85" className={styles.megaDot1}/>
          <circle cx="120" cy="380" r="14" fill="#88002b" fillOpacity="0.8" className={styles.megaDot2}/>
          <circle cx="320" cy="80" r="12" fill="#000080" fillOpacity="0.8" className={styles.megaDot3}/>
        </svg>
      </div>

      {/* 前景UI */}
      <div className={styles.megaContainer}>
        <h1 className={styles.megaTitle}>史上最大・神々しき異次元アニメ</h1>
        <p className={styles.megaSubtitle}>
          全てを超越し、世界の歴史を塗り替える超・神映像
        </p>
        <a href="/chat" className={styles.megaBackButton}>
          ChatGPTへ戻る
        </a>
      </div>
    </div>
  );
}
