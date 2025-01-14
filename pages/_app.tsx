// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ★ グローバルCSS 一括 import
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'   // Page1: chatgpt.com風
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'

// ChatUI
import ChatGPTInterface from '../components/ChatGPTInterface'

/** Stickyヘッダー + GPT-4 Model表記 + Page1~6リンク */
function NavBar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        background: '#222',
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1.2rem',
        color: '#fff',
      }}
    >
      {/* 左上に GPT-4 Model */}
      <span style={{ fontWeight: 'bold', marginRight: '2rem' }}>GPT-4 Model</span>

      <nav style={{ display: 'flex', gap: '1rem', fontSize: '1rem' }}>
        <Link href="/">
          <span style={{ cursor: 'pointer' }}>Page1</span>
        </Link>
        <Link href="/page2">
          <span style={{ cursor: 'pointer' }}>Page2</span>
        </Link>
        <Link href="/page3">
          <span style={{ cursor: 'pointer' }}>Page3</span>
        </Link>
        <Link href="/page4">
          <span style={{ cursor: 'pointer' }}>Page4</span>
        </Link>
        <Link href="/page5">
          <span style={{ cursor: 'pointer' }}>Page5</span>
        </Link>
        <Link href="/page6">
          <span style={{ cursor: 'pointer' }}>Page6</span>
        </Link>
      </nav>
    </header>
  )
}

/** (任意) Attention可視化ポップアップ */
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      style={{
        position: 'fixed',
        top: '70px',
        right: '1rem',
        zIndex: 9999,
        fontSize: '0.9rem',
      }}
    >
      <button
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.4rem 0.8rem',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Transformer' : 'Show Transformer'}
      </button>
      {open && (
        <div
          style={{
            marginTop: '0.3rem',
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            width: '280px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }}
        >
          <h4 style={{ marginBottom: '0.3rem' }}>
            Attention Is All You Need (2017)
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>
            Multi-head attention or Q-K-V visualizations in real-time.
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

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // dynamic import if needed
  }, [])

  return (
    <>
      <Head>
        <title>0 - Ultimate GPT-4 Clone</title>
        <meta
          name="description"
          content="0: GPT-4 based ChatGPT-like site with unstoppable illusions, quantum synergy, cosmic expansions."
        />
        {/* PC/スマホ完全対応 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* アニメスクリプト: 量子線, 星, 波 */}
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />

      {/* 幾何学的量子的 黒線 + 星 + 波 */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ページ本体 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavBar />
        <AttentionPopup />

        {/* メインコンテンツ */}
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
      </div>

      {/* フッター固定: 1ページ目のみチャット欄を超大サイズ */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#f0f0f0',
          boxShadow: '0 -2px 6px rgba(0,0,0,0.2)',
          zIndex: 10000,
        }}
      >
        <ChatGPTInterface
          // 1ページ目('/')のみ 特大
          isPage1Override={router.pathname === '/'}
        />
      </footer>
    </>
  )
}
