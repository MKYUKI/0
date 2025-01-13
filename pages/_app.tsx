import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

// ▼ ここで全てのグローバルCSSをインポート ▼
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'
import '../public/css/page1.css'
import '../public/css/page2.css'
import '../public/css/page3.css'
import '../public/css/page4.css'
import '../public/css/page5.css'
import '../public/css/page6.css'

// もしPostCSSで何か設定があれば、postcss.config.jsで行う。 
// "content" など Next.js 非推奨のフィールドは削除してください。

import ChatGPTInterface from '../components/ChatGPTInterface'

// シンプルなNavBar例
function NavBar() {
  return (
    <nav style={{ textAlign: 'center', padding: '0.6rem', background: '#222' }}>
      <Link href="/"><span style={{ color: '#fff', margin: '0 8px' }}>Page1</span></Link>
      <Link href="/page2"><span style={{ color: '#fff', margin: '0 8px' }}>Page2</span></Link>
      <Link href="/page3"><span style={{ color: '#fff', margin: '0 8px' }}>Page3</span></Link>
      <Link href="/page4"><span style={{ color: '#fff', margin: '0 8px' }}>Page4</span></Link>
      <Link href="/page5"><span style={{ color: '#fff', margin: '0 8px' }}>Page5</span></Link>
      <Link href="/page6"><span style={{ color: '#fff', margin: '0 8px' }}>Page6</span></Link>
    </nav>
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

      {/* Next.js <Script>で /public/js/*.js を読み込み (ESモジュールとして扱わない) */}
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
        <Component {...pageProps} />
      </div>

      {/* フッターのChatUI */}
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
