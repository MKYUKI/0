// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

import ChatGPTInterface from '../components/ChatGPTInterface'

function NavBar() {
  const router = useRouter()
  const currentPath = router.pathname // 例: '/', '/page2', ...

  return (
    <header className="global-nav-bar">
      <span className="nav-bar-title">GPT-4 Model</span>
      <nav className="nav-bar-links">
        {/* if we're on '/', don't show "Page1" link */}
        {currentPath !== '/' && (
          <Link href="/">
            <span className="nav-link">Page1</span>
          </Link>
        )}

        {/* if on '/page2', don't show Page2 link, etc... */}
        {currentPath !== '/page2' && (
          <Link href="/page2">
            <span className="nav-link">Page2</span>
          </Link>
        )}

        {currentPath !== '/page3' && (
          <Link href="/page3">
            <span className="nav-link">Page3</span>
          </Link>
        )}

        {currentPath !== '/page4' && (
          <Link href="/page4">
            <span className="nav-link">Page4</span>
          </Link>
        )}

        {currentPath !== '/page5' && (
          <Link href="/page5">
            <span className="nav-link">Page5</span>
          </Link>
        )}

        {currentPath !== '/page6' && (
          <Link href="/page6">
            <span className="nav-link">Page6</span>
          </Link>
        )}
      </nav>
    </header>
  )
}

function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="attention-popup-container">
      <button className="attention-popup-btn" onClick={() => setOpen(!open)}>
        {open ? 'Hide Transformer' : 'Show Transformer'}
      </button>
      {open && (
        <div className="attention-popup-content">
          <h4 style={{ marginBottom: '0.3rem' }}>Attention Is All You Need (2017)</h4>
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
    console.log("MyApp mounted - client side.")
  }, [])

  return (
    <>
      <Head>
        <title>0 - GPT-4 Quantum Clone</title>
        <meta name="description" content="GPT-4 site with quantum illusions, synergy, unstoppable expansions." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ========== 3つのアニメ ========== */}
      <Script src="/js/quantum3D.js" strategy="afterInteractive" />
      <Script src="/js/starsAnim.js" strategy="afterInteractive" />
      <Script src="/js/waveAnim.js" strategy="afterInteractive" />

      {/* ========== 背景Canvas ========== */}
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

      {/* page2 だけ透過例 */}
      {router.pathname === '/page2' && (
        <style jsx global>{`
          body, html {
            background: transparent !important;
          }
          #app-wrapper {
            background: transparent !important;
          }
          #main-content {
            background: transparent !important;
            min-height: calc(100vh - 60px);
            padding: 0;
          }
        `}</style>
      )}
    </>
  )
}
