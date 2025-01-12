// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'  // 例: Tailwind / Reset

import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 世界最先端の量子幾何背景CSS */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/*
        Three.js + quantum3D.js + waveAnim.js + starsAnim.js
        => 画面上部にフル画面アニメを敷き詰めたいので先に読み込み
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      {/* 全画面アニメ背景 */}
      <div className="quantumGeometryBG" style={{ position: 'relative', minHeight: '100vh' }}>
        
        {/** --- 1) フル画面アニメをabsolute配置 --- */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          {/* Three.js 3Dコンテナ */}
          <div id="quantum3DContainer" style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%'
          }} />

          {/* wave & stars Canvas */}
          <canvas id="waveCanvas" style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%'
          }} />
          <canvas id="starsCanvas" style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%'
          }} />
        </div>

        {/** --- 2) ページ内容をrelative配置でアニメ上に重ねる --- */}
        <div style={{
          position: 'relative',
          zIndex: 1, // 背景アニメより前面
          minHeight: 'calc(100vh - 250px)', // 下のChatGPT分を確保
          padding: '0.5rem',
        }}>
          {/* ナビゲーション */}
          <nav style={{
            background: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            padding: '0.5rem',
            marginBottom: '1rem',
          }}>
            <a href="/">Home</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* ページ固有コンポーネント */}
          <Component {...pageProps} />
        </div>

        {/** --- 3) 画面下部に ChatGPT Search フッターを配置 --- */}
        <footer style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.9)',
          padding: '1rem',
          borderTop: '1px solid #ccc',
        }}>
          <h2 style={{ textAlign: 'center' }}>
            Next-Quantum ChatGPT (Transformer-based)
          </h2>
          <ChatGPTInterface />
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            ©2025 Quantum Apex. Built with Three.js, Transformers, MoE, Diffusion. 
            (参考: <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              Attention Is All You Need
            </a>)
          </p>
        </footer>
      </div>
    </>
  )
}
