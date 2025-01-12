// pages/_app.tsx
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script' // ← 追加: Next.js 公式推奨の Script

/**
 * グローバルCSSをまとめてインポート
 * 全ページで共通適用する (超越したアニメーションもここに含む)
 */
import '../public/css/globalQuantum.css'
import '../public/css/kaleidoBase.css'

/**
 * ChatGPTクローンのチャットUI
 */
import ChatGPTInterface from '../components/ChatGPTInterface'

/**
 * Attention Popupなどをサンプルで追加
 * "Attention Is All You Need" (2017) に基づく機能を画面上に載せる例
 */
function AttentionPopup() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', top: '60px', right: '1rem', zIndex: 999 }}>
      <button
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
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
            width: '280px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <h4>Attention Is All You Need (2017)</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
            This popup could visualize multi-head attention weights or show how
            the query-key-value is computed in real-time. 
            <br />
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
    // ここでは Script を使わずダイナミック import してもよいが、
    // TS的には「moduleじゃない」と怒られる可能性があるためコメントアウト
    // import('../public/js/quantum3D.js')
    // import('../public/js/starsAnim.js')
    // import('../public/js/waveAnim.js')
  }, [])

  return (
    <>
      <Head>
        <title>Quantum GPT Clone: World’s Most Advanced Transformer</title>
        <meta
          name="description"
          content="A GPT-4.0 based ChatGPT clone with advanced 3D animations + Attention synergy."
        />
      </Head>

      {/* -------- ScriptタグでJSファイルを読み込む例 -------- */}
      <Script
        src="/js/quantum3D.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error('Failed to load quantum3D.js', e)
        }}
      />
      <Script
        src="/js/starsAnim.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error('Failed to load starsAnim.js', e)
        }}
      />
      <Script
        src="/js/waveAnim.js"
        strategy="beforeInteractive"
        onError={(e) => {
          console.error('Failed to load waveAnim.js', e)
        }}
      />

      {/* 幻想的なキャンバスを背面に固定表示 */}
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

      {/* メイン領域 + Attention Popup + フッター固定 Chat */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <AttentionPopup /> {/* ← Attention Transformer視覚化の例 */}

        {/* 各ページ固有のコンテンツ */}
        <Component {...pageProps} />
      </div>

      {/* 画面下部に固定チャットUI */}
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
