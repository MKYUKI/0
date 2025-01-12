// pages/_app.tsx
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

// ★ グローバルCSSを読み込む (Tailwind等があればそちらも)
import '../styles/globals.css'

// ★ 必要に応じて、kaleidoBase.cssなども直接importしてOK (ただし衝突注意)
// import '../public/css/kaleidoBase.css'

// ChatGPT風インターフェース (Footerに設置)
import ChatGPTInterface from '../components/ChatGPTInterface'

/**
 * 神の統合: 
 *  - <Head> で globalQuantum.css を読み込む
 *  - <Script> で three.js + quantum3D, waveAnim, starsAnim を先行読込
 *  - 画面上部いっぱいに 3D + Wave + Stars を表示し、ページの中身 <Component/> を
 *    その上に重ね、さらにフッター部に ChatGPTInterface を設置する。
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Headタグ: 全ページ共通のメタ情報、CSSリンク */}
      <Head>
        {/* 量子的CSSファイル (globalQuantum.css) を /public/css/ 下からロード */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
        {/* 必要に応じて kaleidoBase.css も読み込み */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />

        <title>Quantum Transformer - Godlike Layout</title>
        <meta name="description" content="A next-level quantum GPT search interface." />
      </Head>

      {/* Scriptタグで three.js + カスタムスクリプトを先読み */}
      <Script
        src="https://unpkg.com/three@0.153.0/build/three.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      {/* 全画面を覆う3D & Wave & Stars (背景) */}
      <div
        className="quantumGeometryBG"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 3D/Stars/Wave のキャンバス or コンテナ類 */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            zIndex: 0
          }}
        >
          {/* Three.js で描画する場合、canvas ではなく <div> コンテナに appendChild するケースも有 */}
          <div
            id="quantum3DContainer"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
            }}
          />
          {/* Wave & Stars 用に <canvas> を用意 */}
          <canvas
            id="waveCanvas"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <canvas
            id="starsCanvas"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* ナビゲーションバー (ページ間移動) */}
        <nav
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255,255,255,0.85)',
            padding: '0.5rem',
            textAlign: 'center',
            borderBottom: '1px solid #ccc',
          }}
        >
          {/* 必要に応じてリンク先を調整 */}
          <a href="/" style={{ margin: '0 1rem' }}>Home</a>
          <a href="/page2" style={{ margin: '0 1rem' }}>Page2</a>
          <a href="/page3" style={{ margin: '0 1rem' }}>Page3</a>
          <a href="/page4" style={{ margin: '0 1rem' }}>Page4</a>
          <a href="/page5" style={{ margin: '0 1rem' }}>Page5</a>
          <a href="/page6" style={{ margin: '0 1rem' }}>Page6</a>
        </nav>

        {/* メインコンテンツ領域 */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: 'calc(100vh - 300px)',
            padding: '1rem',
          }}
        >
          <Component {...pageProps} />
        </div>

        {/* フッターに ChatGPTInterface (世界最先端の対話AI) を配置 */}
        <footer
          style={{
            position: 'relative',
            zIndex: 3,
            background: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderTop: '1px solid #ccc',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Next-Quantum ChatGPT (Transformer-based)
          </h2>

          <div style={{ margin: '0 auto', maxWidth: '800px' }}>
            <ChatGPTInterface />
          </div>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
            ©2025 Quantum Apex. Built with Three.js, Transformers, MoE, Diffusion. <br />
            (Self-evolving unstoppable unstoppable code.)
          </p>
        </footer>
      </div>
    </>
  )
}
