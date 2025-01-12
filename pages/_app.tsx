// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'

// グローバルCSSを一括インポート
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

// ChatGPT風インターフェース
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // クライアントサイドでのみ3Dアニメを読み込む
    import('../public/js/quantum3D.js')
    import('../public/js/starsAnim.js')
    import('../public/js/waveAnim.js')
  }, [])

  return (
    <>
      <Head>
        <title>Quantum ChatGPT Clone</title>
        <meta name="description" content="GPT-4.0 based ChatGPT-like interface with advanced 3D animations" />
      </Head>

      {/* 背景Canvas（黒い量子ライン/星/波） 全ページ共通 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ページのメイン内容 */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>

      {/* フッターにChatGPTインターフェースを常駐（画面下部に固定） */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#f0f0f0',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          zIndex: 10,
          padding: '0.5rem 0',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ChatGPTInterface />
        </div>
      </footer>
    </>
  )
}
