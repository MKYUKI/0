// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'

// グローバルCSS
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

// シンプルなナビ + 2017Transformer可視化
import Link from 'next/link'
function NavBar() {
  return (
    <nav style={{ textAlign: 'center', padding: '0.8rem', background: '#eee', fontFamily:'Helvetica' }}>
      <Link href="/">[Page1]</Link> |{' '}
      <Link href="/page2">[Page2]</Link> |{' '}
      <Link href="/page3">[Page3]</Link> |{' '}
      <Link href="/page4">[Page4]</Link> |{' '}
      <Link href="/page5">[Page5]</Link> |{' '}
      <Link href="/page6">[Page6]</Link>
    </nav>
  )
}

// Attention Transformerポップアップ例
function AttentionPopup() {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ position:'fixed', top:'60px', right:'1rem', zIndex:999 }}>
      <button
        style={{
          background:'#444', color:'#fff', border:'none',
          borderRadius:'4px', padding:'0.5rem 1rem', cursor:'pointer'
        }}
        onClick={()=>setOpen(!open)}
      >
        { open ? 'Hide Transformer' : 'Show Transformer' }
      </button>
      {open && (
        <div style={{
          marginTop:'0.5rem', background:'rgba(0,0,0,0.85)', color:'#fff',
          padding:'1rem', borderRadius:'8px', width:'280px',
          boxShadow:'0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h4>Attention Is All You Need (2017)</h4>
          <p style={{ fontSize:'0.9rem', lineHeight:'1.4' }}>
            Visualize multi-head attention or show how Q-K-V
            are computed in real-time.<br/>
            <a
              href="https://arxiv.org/abs/1706.03762"
              target="_blank" rel="noreferrer"
              style={{ color:'#66ffcc', textDecoration:'underline' }}
            >
              [arXiv:1706.03762]
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

// ChatGPT風チャットUI (Footerで固定)
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // クライアントサイドのみ: 3D量子パーティクル、黒星、黒波アニメを取り込み
    import('../public/js/quantum3D.js')
    import('../public/js/starsAnim.js')
    import('../public/js/waveAnim.js')
  }, [])

  return (
    <>
      <Head>
        <title>Quantum GPT Clone: Apex Edition</title>
        <meta
          name="description"
          content="GPT-4.0 based super synergy with black quantum lines, unstoppable illusions, 2017 Transformer integration, 3D animations."
        />
      </Head>

      {/* Scriptタグで3D/星/波jsを読み込み */}
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />

      {/* 背景Canvas */}
      <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ページ内容 */}
      <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
        <NavBar />
        <AttentionPopup />
        <Component {...pageProps} />
      </div>

      {/* 下部固定のChatUI */}
      <footer
        style={{
          position:'fixed', bottom:0, left:0, width:'100%',
          background:'#fafafa',
          boxShadow:'0 -2px 5px rgba(0,0,0,0.1)',
          zIndex:10
        }}
      >
        <div style={{ maxWidth:'800px', margin:'0 auto' }}>
          <ChatGPTInterface />
        </div>
      </footer>
    </>
  )
}
