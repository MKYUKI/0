// pages/_app.tsx
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

// グローバルCSS
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

// ChatUI
import ChatGPTInterface from '../components/ChatGPTInterface'

// シンプルナビバー
function NavBar() {
  return (
    <nav style={{ textAlign: 'center', padding: '0.6rem', background: '#222' }}>
      <Link href="/">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page1</span>
      </Link>
      <Link href="/page2">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page2</span>
      </Link>
      <Link href="/page3">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page3</span>
      </Link>
      <Link href="/page4">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page4</span>
      </Link>
      <Link href="/page5">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page5</span>
      </Link>
      <Link href="/page6">
        <span style={{ color: '#fff', margin: '0 8px' }}>Page6</span>
      </Link>
    </nav>
  )
}

// Attention Transformer可視化ポップアップ（オプション例）
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ position: 'fixed', top: '60px', right: '1rem', zIndex: 999 }}>
      <button
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer'
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
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
        >
          <h4>Attention Is All You Need (2017)</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
            Visualize multi-head attention or watch how Q-K-V
            are computed in real-time.<br />
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
  return (
    <>
      <Head>
        <title>0 - The Ultimate Quantum GPT Clone</title>
        <meta
          name="description"
          content="0: A GPT-4 based ChatGPT-like site with black quantum lines, advanced synergy, unstoppable illusions."
        />
      </Head>

      {/* Next.js Script で public/js/*.js を読み込み */}
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
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <NavBar />
        <AttentionPopup />
        <Component {...pageProps} />
      </div>

      {/* フッター固定のChatUI */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#111',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.5)',
          zIndex: 10
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ChatGPTInterface />
        </div>
      </footer>
    </>
  )
}
