// pages/anime.tsx
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function AnimePage() {
  // ダミーのログインフラグ
  const [loggedIn] = useState(true); // 本当は認証状態チェックなど

  if (!loggedIn) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>ログインしていません</h2>
        <p><a href="/login">ログインページへ</a></p>
      </div>
    );
  }

  // ログイン済み → 超絶SVGアニメーションを表示
  return (
    <div className={styles.godlyMain}>
      <div className={styles.godlySvgContainer}>
        <svg
          className={styles.godlySvg}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* 濃青～濃紫～ラズベリー～黒紫 */}
            <radialGradient id="godlyGrad" cx="50%" cy="50%" r="95%">
              <stop offset="0%" stopColor="#000080" />
              <stop offset="25%" stopColor="#330066" />
              <stop offset="50%" stopColor="#660022" />
              <stop offset="75%" stopColor="#88002b" />
              <stop offset="100%" stopColor="#220011" />
            </radialGradient>
          </defs>

          {/* 大円 */}
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="url(#godlyGrad)"
            className={styles.godlyCircle1}
          />

          {/* リング1 */}
          <circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="#330066"
            strokeWidth="12"
            style={{ mixBlendMode: 'screen' }}
            className={styles.godlyCircle2}
          />
          {/* リング2 */}
          <circle
            cx="250"
            cy="250"
            r="90"
            fill="none"
            stroke="#88002b"
            strokeWidth="8"
            style={{ mixBlendMode: 'screen' }}
            className={styles.godlyCircle3}
          />

          {/* path1 */}
          <path
            d="M250,50 C320,80 420,160 390,240 350,320 180,360 150,230
               130,140 180,80 250,60Z"
            fill="#000080"
            fillOpacity="0.8"
            className={styles.godlyPath1}
          />

          {/* path2 */}
          <path
            d="M420,250 C440,230 490,170 470,120 430,40 310,30 250,90
               190,30 70,40 40,120 20,170 70,230 90,250
               110,270 150,330 250,390 350,330 390,270 420,250Z"
            fill="#88002b"
            fillOpacity="0.6"
            className={styles.godlyPath2}
          />

          {/* ドットたち */}
          <circle cx="420" cy="120" r="14" fill="#330066" fillOpacity="0.85" className={styles.godlyDot1}/>
          <circle cx="80" cy="400" r="16" fill="#88002b" fillOpacity="0.8" className={styles.godlyDot2}/>
          <circle cx="320" cy="80" r="12" fill="#000080" fillOpacity="0.9" className={styles.godlyDot3}/>
        </svg>
      </div>

      {/* 前景UI */}
      <div className={styles.godlyContainer}>
        <h1 className={styles.godlyTitle}>史上最大・超越アニメーション</h1>
        <p className={styles.godlySubtitle}>
          これが人類史を変える青・紫・ラズベリーの狂宴。
        </p>
        <a href="/chat" className={styles.godlyBackButton}>
          ChatGPTへ戻る
        </a>
      </div>
    </div>
  );
}
