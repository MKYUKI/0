// pages/_app.tsx
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

import ChatGPTInterface from '../components/ChatGPTInterface'

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

      {/* ScriptタグでグローバルJSを読み込む */}
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

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* ページコンテンツ */}
        <Component {...pageProps} />
      </div>

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
