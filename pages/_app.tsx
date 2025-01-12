// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Head from 'next/head'

/** 
 * グローバルCSSをまとめてインポート
 * 全ページで共通適用する
 */
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

/**
 * ここでは Footer 付近に ChatGPT同等のチャットUIを常駐させる
 * -> 1〜6ページのメインコンテンツの下部に「本物っぽい」チャット欄を置く
 */
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // クライアントサイドでのみ動かすアニメJS (SSR時にエラーを防ぐ)
    import('../public/js/quantum3D.js')
    import('../public/js/starsAnim.js')
    import('../public/js/waveAnim.js')
  }, [])

  return (
    <>
      <Head>
        <title>Quantum GPT Clone</title>
        <meta name="description" content="A GPT-4.0 based ChatGPT clone with advanced 3D animations." />
      </Head>

      {/* 背景Canvasたち(量子的ライン/星/波)。全ページ共通で上部〜下部に融合させる */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <canvas id="bg-canvas" className="bg-canvas-layer" />
        <canvas id="stars-canvas" className="bg-canvas-layer" />
        <canvas id="wave-canvas" className="bg-canvas-layer" />
      </div>

      {/* ページごとのコンテンツ */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>

      {/* 下部にChatUIを固定して、ChatGPTっぽい操作感を再現 */}
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
