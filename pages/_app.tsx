// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

// グローバルCSS
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


// シンプルナビバー（上部に 1～6ページへのリンク + 左上にモデル名表記）
function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.6rem 1rem',
        background: '#222',
        color: '#fff'
      }}
    >
      {/* 左上： ChatGPT4モデル名など */}
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        [ GPT-4 : <span style={{ color: '#66ffcc' }}>0 AI</span> ]
      </div>

      {/* 右側：ページ遷移リンク */}
      <div>
        <Link href="/">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page1</span>
        </Link>
        <Link href="/page2">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page2</span>
        </Link>
        <Link href="/page3">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page3</span>
        </Link>
        <Link href="/page4">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page4</span>
        </Link>
        <Link href="/page5">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page5</span>
        </Link>
        <Link href="/page6">
          <span style={{ color: '#fff', margin: '0 8px', cursor: 'pointer' }}>Page6</span>
        </Link>
      </div>
    </nav>
  )
}

// Attention Transformer可視化ポップアップ
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
  useEffect(() => {
    // ここでクライアントサイドJS読み込みも可能
    // import('../public/js/starsAnim.js')
    // import('../public/js/waveAnim.js')
    // import('../public/js/quantum3D.js')
  }, [])

  return (
    <>
      <Head>
        <title>0 - The Ultimate GPT Clone</title>
        <meta name="description" content="0: Next-gen ChatGPT-like site." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 参考文献: ChatGPT.com 的なUIを参考に開発 (openai.com / chat.openai.com) */}
      </Head>

      {/* 背景アニメのJS */}
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
          position: 'fixed', bottom: 0, left: 0, width: '100%',
          background: '#f0f0f0',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          zIndex: 10
        }}
      >
        {/* 1ページ目は大きめチャット欄, 2-6ページは標準 → ChatGPTInterface に isPage1Override を渡す */}
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* URLが "/" の場合に isPage1Override = true とする例：
              ここでは固定trueとしてますが、router.pathname などで条件分岐してもOK */}
          <ChatGPTInterface isPage1Override />
        </div>
      </footer>
    </>
  )
}
