// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css' // Tailwind/Reset

import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 最先端の量子幾何背景CSS */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/*
        Three.js + quantum3D + waveAnim + starsAnim
        => 画面上部にアニメを敷き詰めたいので先行読み込み
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      {/* 全画面背景 */}
      <div className="quantumGeometryBG" style={{ position: 'relative', minHeight: '100vh' }}>
        {/** 
         * 1) アニメーション要素を"絶対配置" => 背景を完全覆う 
         */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          {/* Three.js Container */}
          <div id="quantum3DContainer" style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
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

        {/**
         * 2) ページ内容を"相対配置" => 背景アニメの上にテキストなどを重ねる
         */}
        <div style={{
          position: 'relative',
          zIndex: 1, // 背景より上
          padding: '0.5rem',
          minHeight: 'calc(100vh - 200px)' // 下部のチャット分を確保
        }}>
          {/* 上部ナビゲーション */}
          <nav style={{
            padding: '0.5rem',
            background: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}>
            <a href="/">Home</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* ページ固有のコンポーネント */}
          <Component {...pageProps} />
        </div>

        {/**
         * 3) 下部に ChatGPT Search
         *    画面下部に固定 or 通常フローかはお好み
         */}
        <footer style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.9)',
          padding: '1rem',
          borderTop: '1px solid #ccc',
          marginTop: '1rem',
        }}>
          <h2 style={{ textAlign: 'center' }}>Next-Quantum ChatGPT Search (Transformer-based)</h2>
          <ChatGPTInterface />
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            ©2025 Quantum Apex. Built with Three.js, Transformers, MoE, and Diffusion. 
            (参考: <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">Attention Is All You Need</a>)
          </p>
        </footer>
      </div>
    </>
  )
}
