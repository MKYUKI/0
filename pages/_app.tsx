// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

// ★ すべてのグローバルCSSを一括インポート（Next.js要件）
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'

// ChatUI
import ChatGPTInterface from '../components/ChatGPTInterface'

// シンプルナビバー
function NavBar() {
  return (
    <nav
      style={{
        textAlign: 'center',
        padding: '0.6rem',
        background: '#222',
        color: '#fff',
        fontSize: '1rem',
      }}
    >
      {/* 左上に「GPT-4」などモデル名を明確に示す例 */}
      <span style={{ marginRight: '2rem', fontWeight: 'bold' }}>
        GPT-4 Model
      </span>

      <Link href="/">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page1</span>
      </Link>
      <Link href="/page2">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page2</span>
      </Link>
      <Link href="/page3">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page3</span>
      </Link>
      <Link href="/page4">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page4</span>
      </Link>
      <Link href="/page5">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page5</span>
      </Link>
      <Link href="/page6">
        <span style={{ margin: '0 8px', cursor: 'pointer' }}>Page6</span>
      </Link>
    </nav>
  )
}

// Attention Transformer可視化ポップアップ (オプション例)
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        right: '1rem',
        zIndex: 999,
        fontSize: '0.85rem',
      }}
    >
      <button
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Transformer' : 'Show Transformer'}
      </button>
      {open && (
        <div
          style={{
            marginTop: '0.5rem',
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <h4 style={{ marginBottom: '0.5rem' }}>
            Attention Is All You Need (2017)
          </h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
            Visualize multi-head attention or see how Q-K-V are computed in
            real-time.
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
  useEffect(() => {
    // 例: クライアントサイドでJSを動的インポート
    // import('../public/js/starsAnim.js')
    // import('../public/js/waveAnim.js')
    // import('../public/js/quantum3D.js')
  }, [])

  return (
    <>
      <Head>
        <title>0 - Ultimate GPT Clone</title>
        <meta
          name="description"
          content="0: GPT-4 site with unstoppable illusions, quantum lines, advanced synergy."
        />
        {/* Responsive Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 背景アニメ用JS */}
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />

      {/* 背景Canvas */}
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

        {/* メイン表示 */}
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
      </div>

      {/* フッター固定のChatUI */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#f0f0f0',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          zIndex: 10,
        }}
      >
        {/* 
          1ページ目 (index.tsx) は画面の 90% の大きさにする 
          2〜6ページ目は 70% にする 
          → ChatGPTInterface に isHomePage (or isPage1) を渡す 
        */}
        {/* 
          ここでページ判定: たとえば pageProps から route 情報を取り、"/"ならisHome=true 
          or もっと簡単に contextで読み取るなど 
        */}
        {/*
          今回は簡易的に: 
          if (typeof window !== 'undefined' && window.location.pathname === '/') ...
          ただしSSRの場合は要工夫
        */}
        <ChatGPTInterface />
      </footer>
    </>
  )
}
