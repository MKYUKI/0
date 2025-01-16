// pages/page2.tsx

import React, { useEffect } from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function Page2() {

  // 2ページ目で #chat-footer (Appの固定チャット) を消す
  // → 代わりにページ内 ChatGPTInterface を使う
  useEffect(() => {
    const globalFooter = document.getElementById('chat-footer')
    if (globalFooter) {
      globalFooter.style.display = 'none'
    }
    return () => {
      if (globalFooter) {
        globalFooter.style.display = ''
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>0 - Page2 (Unified Page - Full Anim + Chat)</title>
        <meta charSet="UTF-8" />
      </Head>

      {/**
       * ◆ 2ページ目の完全統合:
       *   1) 背景アニメ (quantum3D / starsAnim / waveAnim) → /public/js/ の修正版を使う
       *   2) (MasakiKusaka Official Home - by 0) in Hero Section
       *   3) Resume & References (白背景)
       *   4) 下部に (ローカル) <ChatGPTInterface /> (スクロールに合わせて下へ)
       */}

      <div className="page2-unified-wrapper">
        {/* ----- Hero Section (背面アニメが透ける) ----- */}
        <section className="hero-section">
          <div className="black-quantum-overlay">
            <div className="hero-text">
              <h1>MasakiKusaka Official Home - by 0</h1>
              <p className="intro">
                (Restored) Majestic synergy with black quantum lines.
                Enough vertical space to enjoy the original animation.
              </p>
            </div>
          </div>
        </section>

        {/* ----- 白背景セクション ----- */}
        <section className="white-section">
          <div className="resume-section">
            <h3>Resume &amp; Career History</h3>
            <p>
              <a href="/docs/MasakiKusaka_Resume.docx" download>Resume (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_Resume.pdf" download>Resume (PDF)</a>
            </p>
            <p>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" download>Career (Word)</a> |{' '}
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" download>Career (PDF)</a>
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ReferencesDropdown />
          </div>
        </section>

        {/* ----- ローカル ChatGPT Interface ----- */}
        <section className="local-chat-section">
          <ChatGPTInterface />
        </section>
      </div>

      {/* 
        ◆ 2ページ目専用のCSS
        - 背景: 透明 → 背面アニメを見せる
        - Hero: 黒半透明 + 量子ライン
        - 下部: 白背景セクション
        - 最下部: ローカルチャット
      */}
      <style jsx>{`
        .page2-unified-wrapper {
          position: relative;
          min-height: calc(100vh - 60px);
          overflow-x: hidden;
          /* 下部にローカルチャットを置くので余白確保 */
          padding-bottom: 300px;
          background: transparent; /* 背面Canvasが透ける */
        }

        /* ----- Hero Section ----- */
        .hero-section {
          position: relative;
          width: 100%;
          height: 600px; /* アニメをしっかり見せる余裕 */
          background: transparent;
          z-index: 1;
        }
        .black-quantum-overlay {
          pointer-events: none;
          position: absolute;
          top:0; left:0; right:0; bottom:0;
          background-color: rgba(0,0,0,0.35);
          /* Base64 量子ライン + 呼吸アニメ */
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAACd0lEQVR4nO2aMUrDQBSGr+81VmAC8uJ89YuUqKaRxY8aLtZy9Dv0BhZaDYGk64tfc5oZLtJ7GUMkaDKIvtxfX7jSw7OfcwOGBwIFRBkLXv0zkKnRcMQ9BIHUsxArdJBIdSxECY22RWe9nUV7KiHy6iBzKQgeJny5tHrvK5CIGlZqNIFK4qEgoEJ2mdPhIenD2r3fWeFBRbf1XWz3l3vIjjU1m2x1WxnDOX0y+zToHOMc1YsR4+GzEGSTxa+OLffZb+CtHDScIF6fnCIG3AUViD9IA81CYR9g7qMAg7X3CJHh7/nD2JVIB3L8QPQGlNsE/KWSnAnLHZBkO2rdIZvKQXDx1DRLPeOJpDKzr+pJexuJpDuxU6Q64pMZgClf8KncAxO4MQhLd4bqwa/c44Ay36cH6wfjnAyULtY2EPlG74GmGuZOz3pS72fAaa/hh4xD+cjf9Z/6AH3Ap7XzoZ6lR43gnB7Qp3zAE3Abe9/wqFTL5eHuAwcXeVSkslyYnEhQzNIJAgHi48Q5/23OmNTZ0M2f4b6z06nR1E/8KqIhpKluI1a8HWwUDl1w6fobqE39Fv2u3CST2JvwAAAABJRU5ErkJggg==');
          background-repeat: repeat;
          background-position: center;
          background-size: cover;
          animation: quantumPulse 12s infinite alternate ease-in-out;
        }
        @keyframes quantumPulse {
          0% { transform: scale(1);   opacity:0.35; }
          50%{ transform: scale(1.05);opacity:0.7;  }
          100%{transform: scale(1.1); opacity:0.35; }
        }
        .hero-text {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          width: 90%;
          padding: 3rem;
          text-align: center;
          color: #fff;
          font-family: sans-serif;
          text-shadow: 0 3px 8px rgba(0,0,0,0.5);
        }
        .hero-text h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .intro {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.4;
        }

        /* ----- 白背景セクション (Resume & References) ----- */
        .white-section {
          position: relative;
          z-index: 2;
          background: #fff;
          color: #000;
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          text-align: center;
          font-family: sans-serif;
        }
        .white-section h3 {
          margin-bottom: 1.5rem;
        }
        .resume-section a {
          color: #006060;
          font-weight: bold;
          margin: 0 0.5rem;
          text-decoration: none;
        }
        .resume-section a:hover {
          text-decoration: underline;
        }

        /* ----- ページ内ローカルチャット ----- */
        .local-chat-section {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 2rem auto 0;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          padding: 1rem;
        }
      `}</style>

      {/** 
        ◆ Tailwind等が body を白くしていても
        ◆ 2ページ目だけ強制的に透過
      */}
      <style jsx global>{`
        body, html {
          background: transparent !important;
        }
      `}</style>
    </>
  )
}
