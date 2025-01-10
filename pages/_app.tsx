// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import '../styles/globals.css'     // TailwindやReset用
import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/*
          Next.js では public/css/ 以下は /css/xxx.css で読み込める
        */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/*
        Script で three.js 等を先読み
        (Docker/CIなどで "Module not found" 回避のためにpublicディレクトリ/パスを確実に合わす)
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      <div className="quantumGeometryBG">
        <div className="globalContainerWrap" style={{ position: 'relative', minHeight: '100vh' }}>
          
          {/* 3D領域 (TorusKnot) */}
          <div style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Wave & Stars Canvas (背景として） */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <canvas id="waveCanvas" style={{ width: '100%', height: '100%' }} />
            <canvas id="starsCanvas" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* ナビゲーション (zIndex: 1 で前面) */}
          <nav style={{ padding: '1rem', background: '#eee', textAlign: 'center', zIndex: 1 }}>
            <a href="/">Home(Page1)</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* ページ固有の中身 */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Component {...pageProps} />
          </div>

          {/* ChatGPT UI (全ページ共通) */}
          <section
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.8)',
              marginTop: '2rem',
              borderTop: '1px solid #ccc',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <h2 style={{ textAlign: 'center' }}>
              Next-Quantum ChatGPT Search (Transformer-based)
            </h2>
            <ChatGPTInterface />
          </section>

          {/* Footer */}
          <footer
            style={{
              padding: '1rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.85)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p>©2024 Legendary Next-Quantum Website. Built with Three.js + Transformers.</p>
          </footer>
        </div>
      </div>
    </>
  )
}
