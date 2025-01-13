// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

/** グローバルCSS */
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

import ChatGPTInterface from '../components/ChatGPTInterface'


/**
 * シンプルなページ間ナビ
 * Next.js の <Link> で 1～6ページへ自由に遷移
 */
function NavBar() {
  return (
    <nav style={{ textAlign: 'center', padding: '0.5rem', background: '#111', color: '#fff' }}>
      <Link href="/" style={{ margin: '0 1rem' }}>Page1</Link>
      <Link href="/page2" style={{ margin: '0 1rem' }}>Page2</Link>
      <Link href="/page3" style={{ margin: '0 1rem' }}>Page3</Link>
      <Link href="/page4" style={{ margin: '0 1rem' }}>Page4</Link>
      <Link href="/page5" style={{ margin: '0 1rem' }}>Page5</Link>
      <Link href="/page6" style={{ margin: '0 1rem' }}>Page6</Link>
    </nav>
  )
}


/**
 * Attention Transformer 可視化用ポップアップ (簡易例)
 */
function AttentionPopup() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', top: '64px', right: '1rem', zIndex: 999 }}>
      <button
        style={{
          background: '#222',
          color: '#66ffcc',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
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
          <h4>Attention Is All You Need (2017)</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Real-time multi-head attention visualization could go here.<br />
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
    // Next.js (CSR)でのみ動く
    import('../public/js/quantum3D.js')
    import('../public/js/starsAnim.js')
    import('../public/js/waveAnim.js')
  }, [])

  return (
    <>
      <Head>
        <title>Quantum GPT Clone - Ultimate Transformer</title>
        <meta
          name="description"
          content="A GPT-4.0 ChatGPT clone with advanced 3D animations & professional unstoppable synergy."
        />
      </Head>

      {/* 3D/星/波 Canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ナビバー + Attentionポップアップ */}
      <NavBar />
      <AttentionPopup />

      {/* 各ページの中身 */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>

      {/* フッターにチャットUI */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#f0f0f0',
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ChatGPTInterface />
        </div>
      </footer>
    </>
  )
}
