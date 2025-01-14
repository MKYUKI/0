// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ★ グローバルCSS一括 import
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'

import ChatGPTInterface from '../components/ChatGPTInterface'

/** 上部ナビバー: 固定高さ60px想定 */
function NavBar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '60px', // ヘッダー固定高さ
        width: '100%',
        zIndex: 9999,
        background: '#222',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        color: '#fff',
      }}
    >
      {/* 左上に GPT-4 Model の明記 */}
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

/** Attention可視化(オプション) */
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
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

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // もしクライアントサイドで動的インポートしたいJSがあればここ
  }, [])

  return (
    <>
      <Head>
        <title>0 - The Ultimate GPT-4 Quantum Clone</title>
        <meta
          name="description"
          content="0: GPT-4 based ChatGPT-like site with quantum illusions, synergy, unstoppable expansions."
        />
        {/* PC/スマホ完全対応 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* スクリプト: 幻想的量子線アニメ */}
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />

      {/* 背景Canvas (黒い量子線 + 星 + 波) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ページ本体: ヘッダー60px + フッター80px を除いた領域を丸ごと使う */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          // 上部60px分だけ余白あけて、ヘッダーが被らないように
          paddingTop: '60px',
          // 下部に80px分だけ空けてフッターとの被り回避
          paddingBottom: '80px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <NavBar />
        <AttentionPopup />

        {/* メインコンテンツ */}
        <Component {...pageProps} />
      </div>

      {/* 固定フッター (ChatUI) */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: '80px', // フッターの固定高さ
          width: '100%',
          background: '#f0f0f0',
          boxShadow: '0 -2px 6px rgba(0,0,0,0.2)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* 1ページ目だけチャット欄を極端に大きくする → isPage1Override */}
        <ChatGPTInterface isPage1Override={router.pathname === '/'} />
      </footer>
    </>
  )
}
