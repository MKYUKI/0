// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

/* グローバルCSS */
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'

import ChatGPTInterface from '../components/ChatGPTInterface'

// ---------------------------------
// ナビバー
// ---------------------------------
function NavBar() {
  return (
    <header className="global-nav-bar">
      <span className="nav-bar-title">GPT-4 Model</span>
      <nav className="nav-bar-links">
        <Link href="/">
          <span className="nav-link">Page1</span>
        </Link>
        <Link href="/page2">
          <span className="nav-link">Page2</span>
        </Link>
        <Link href="/page3">
          <span className="nav-link">Page3</span>
        </Link>
        <Link href="/page4">
          <span className="nav-link">Page4</span>
        </Link>
        <Link href="/page5">
          <span className="nav-link">Page5</span>
        </Link>
        <Link href="/page6">
          <span className="nav-link">Page6</span>
        </Link>
      </nav>
    </header>
  )
}

// ---------------------------------
// Attention Popup
// ---------------------------------
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="attention-popup-container">
      <button className="attention-popup-btn" onClick={() => setOpen(!open)}>
        {open ? 'Hide Transformer' : 'Show Transformer'}
      </button>
      {open && (
        <div className="attention-popup-content">
          <h4 style={{ marginBottom: '0.3rem' }}>
            Attention Is All You Need (2017)
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>
            Visualize multi-head attention or see how Q-K-V are computed in real-time.
            <br />
            <a
              href="https://arxiv.org/abs/1706.03762"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#66ffcc', textDecoration: 'underline' }}
            >
              [arXiv:1706.03762]
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------
// メインアプリ
// ---------------------------------
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log("MyApp mounted - client side.")
  }, [])

  return (
    <>
      <Head>
        <title>0 - GPT-4 Quantum Clone</title>
        <meta
          name="description"
          content="GPT-4 site with quantum illusions, synergy, unstoppable expansions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ========== 3つのアニメscript ========== */}
      <Script src="/js/quantum3D.js" strategy="afterInteractive" />
      <Script src="/js/starsAnim.js" strategy="afterInteractive" />
      <Script src="/js/waveAnim.js" strategy="afterInteractive" />

      {/* ========== 背景Canvas (全ページ共通) ========== */}
      <div className="global-bg-canvas-container">
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ========== 全体ラップ ========== */}
      <div id="app-wrapper">
        <NavBar />
        <AttentionPopup />

        <main id="main-content">
          <Component {...pageProps} />
        </main>

        <footer id="chat-footer">
          <ChatGPTInterface isPage1Override={router.pathname === '/'} />
        </footer>
      </div>

      {/* 
        =========== ここから 2ページ目専用のスタイル上書き ===========
        router.pathname === '/page2' のときだけ適用し、
        他ページでは読み込まない → 他ページには影響しない
      */}
      {router.pathname === '/page2' && (
        <style jsx global>{`
          /* ★★★ Tailwindが body { background:#fff } を適用しても
             ここで !important を使い 2ページ目だけ強制透過にする ★★★ */
          body, html {
            background: transparent !important;
          }

          #app-wrapper {
            background: transparent !important;
          }
          #main-content {
            background: transparent !important;
            min-height: calc(100vh - 60px);
            padding: 0; /* 余計な余白をなくす */
          }

          /* ---------- ヒーローセクションの黒っぽい背景を薄く ---------- */
          .hero-section {
            position: relative;
            width: 100%;
            height: 500px; /* お好みで大きさ調整 */
            background: transparent !important;
          }

          /* 極薄の黒 + 量子ライン */
          .hero-section .black-quantum-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.2) !important;
            background-image: url('/img/quantum-line1.png');
            background-size: cover;
            background-position: center;
            background-repeat: repeat;
            pointer-events: none;
            animation: quantumPulse2 12s infinite alternate ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @keyframes quantumPulse2 {
            0%   { transform: scale(1);    opacity: 0.5; }
            50%  { transform: scale(1.05); opacity: 0.7; }
            100% { transform: scale(1.1);  opacity: 0.5; }
          }

          /* ヒーローテキスト: 背景無し + 白文字 */
          .hero-section .hero-text {
            position: relative;
            z-index: 2;
            color: #fff !important;
            text-align: center;
            font-family: sans-serif;
            max-width: 800px;
            width: 90%;
            margin: 0 auto;
            padding: 2rem;
            background: none !important;
          }
          .hero-section .hero-text h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .hero-section .hero-text .intro {
            font-size: 1.1rem;
            line-height: 1.5;
            margin: 0;
          }

          /* ---------- 白背景セクション ---------- */
          .white-section {
            position: relative;
            background: #fff !important; 
            color: #000 !important;
            font-family: sans-serif;
            padding: 2rem 1rem;
            max-width: 900px;
            margin: 0 auto;
          }
          .white-section h3 {
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
          }
          .white-section .resume-section p {
            margin: 1rem 0;
            text-align: center;
          }
          .white-section a {
            color: #006060 !important;
            font-weight: bold;
            margin: 0 0.5rem;
            text-decoration: none;
          }
          .white-section a:hover {
            text-decoration: underline;
          }
        `}</style>
      )}
    </>
  )
}
