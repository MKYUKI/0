// pages/index.tsx
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Home.module.css";

/**
 * (1) ログイン前: SVGアニメ背景 + 中央にログインボタン
 *     ログイン後: 他ページ(2~5)へのリンク表示
 */
export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div style={{ padding: "2rem" }}>Loading session...</div>;
  }

  // ===========================
  // 未ログイン時
  // ===========================
  if (!session) {
    return (
      <div className={styles.main}>
        {/* SVGアニメ背景 */}
        <div className={styles.svgContainer}>
          <svg
            className={styles.kaleidoSvg}
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
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
              style={{ mixBlendMode: "screen" }}
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
              style={{ mixBlendMode: "screen" }}
              className={styles.ring2}
            />

            {/* path1 */}
            <path
              d="M100,10 C140,30 180,90 150,130
                 120,170 70,160 60,110
                 50,70 80,40 100,20Z"
              fill="#000080"
              fillOpacity="0.8"
              style={{ mixBlendMode: "screen" }}
              className={styles.path1}
            />
            {/* path2 */}
            <path
              d="M30,180 C70,130 160,130 190,90
                 200,70 160,50 120,30
                 90,20 60,30 30,60
                 10,90 10,140 20,160Z"
              fill="#88002b"
              fillOpacity="0.7"
              style={{ mixBlendMode: "screen" }}
              className={styles.path2}
            />

            {/* ドット */}
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

        {/* 中央UI */}
        <div className={styles.container}>
          <h1 className={styles.title}>0プラットフォーム (メイン)</h1>
          <p className={styles.subtitle}>ログインボタンが中央</p>
          <button className={styles.loginButton} onClick={() => signIn()}>
            ログイン
          </button>
        </div>
      </div>
    );
  }

  // ===========================
  // ログイン済み時
  // ===========================
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>ログイン済み: {session.user?.email}</h1>
        <p className={styles.subtitle}>ここから他ページへ移動</p>

        <button
          className={styles.logoutButton}
          onClick={() => signOut()}
          style={{ margin: "0.4rem" }}
        >
          ログアウト
        </button>

        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = "/chat")}
        >
          (2) ChatGPTページ
        </button>
        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = "/mega")}
        >
          (3) 世界最大アニメ
        </button>
        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = "/portfolio")}
        >
          (4) 日下真旗ポートフォリオ
        </button>
        <button
          className={styles.loginButton}
          onClick={() => (window.location.href = "/supermega")}
        >
          (5) 神アニメ
        </button>
      </div>
    </div>
  );
}
