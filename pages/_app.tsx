// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'   // Tailwind or Reset CSS

import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 世界最先端の量子幾何学ライン背景 (CSS) */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/*
        Three.js + quantum3D.js + waveAnim + starsAnim を先に読み込む
        => 画面上部に3Dアニメ、Canvasアニメが表示される
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      {/* 大枠: Flexboxで縦配置 => 上部(アニメ/ページ) + 下部(Chat) */}
      <div className="quantumGeometryBG" style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* 上部 (可変領域) */}
        <div style={{ position: 'relative', flex: '1 0 auto', overflow: 'hidden' }}>
          {/* 3D Torus + waveCanvas + starsCanvas */}
          <div style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* wave & stars Canvas => 背景 */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <canvas id="waveCanvas" style={{ width: '100%', height: '100%' }} />
            <canvas id="starsCanvas" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* ナビゲーション */}
          <nav style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <a href="/">Home</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* ページ固有のコンポーネント (上部) */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Component {...pageProps} />
          </div>
        </div>

        {/* 下部: ChatGPT Search */}
        <footer style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.8)',
          padding: '1rem',
          borderTop: '1px solid #ccc',
          flexShrink: 0
        }}>
          <h2 style={{ textAlign: 'center' }}>
            Next-Quantum ChatGPT Search (Transformer-based)
          </h2>
          <ChatGPTInterface />
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            ©2025 Next-Quantum Platform. Built with Three.js, Transformers, and cutting-edge MoE.
          </p>
        </footer>
      </div>
    </>
  )
}
