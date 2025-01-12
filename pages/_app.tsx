// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

/** グローバルCSS */
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

/** チャットUI */
import ChatGPTInterface from '../components/ChatGPTInterface'

/** 
 * シンプルなナビバー: 
 * Next.jsの<Link>でページ遷移を行う
 */
function NavBar() {
  return (
    <nav style={{ textAlign: 'center', padding: '0.5rem', background: '#eee' }}>
      <Link href="/">Page1</Link> |{' '}
      <Link href="/page2">Page2</Link> |{' '}
      <Link href="/page3">Page3</Link> |{' '}
      <Link href="/page4">Page4</Link> |{' '}
      <Link href="/page5">Page5</Link> |{' '}
      <Link href="/page6">Page6</Link>
    </nav>
  )
}

/** Attention Transformer可視化用の簡易ポップアップ例 */
function AttentionPopup() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', top: '60px', right: '1rem', zIndex: 999 }}>
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
            width: '280px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <h4>Attention Is All You Need (2017)</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
            Visualize multi-head attention or show how Q-K-V 
            are computed in real-time. <br />
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
        <title>Quantum GPT Clone: World’s Most Advanced Transformer</title>
        <meta
          name="description"
          content="A GPT-4.0 based ChatGPT clone with advanced 3D animations + Attention synergy."
        />
      </Head>

      {/* Scriptタグで3D/星/波jsを読み込む */}
      <Script
        src="/js/quantum3D.js"
        strategy="beforeInteractive"
        onError={(e) => console.error('Failed to load quantum3D.js', e)}
      />
      <Script
        src="/js/starsAnim.js"
        strategy="beforeInteractive"
        onError={(e) => console.error('Failed to load starsAnim.js', e)}
      />
      <Script
        src="/js/waveAnim.js"
        strategy="beforeInteractive"
        onError={(e) => console.error('Failed to load waveAnim.js', e)}
      />

      {/* 背景Canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0
        }}
      >
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* 上部のナビ + 本文 + Attention可視化 */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <NavBar />
        <AttentionPopup />

        {/* ページコンテンツ */}
        <Component {...pageProps} />
      </div>

      {/* 画面下部に固定されるChatUI */}
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ChatGPTInterface />
        </div>
      </footer>
    </>
  )
}
