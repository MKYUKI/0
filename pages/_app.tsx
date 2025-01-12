// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'   // e.g., Tailwind or basic reset
// IMPORTANT: remove direct import of globalQuantum.css from here!
// We'll load it via <link> below

import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Load globalQuantum.css from /public/css/ */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/* Preload advanced 3D + wave + star scripts */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      <div className="quantumGeometryBG" style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Fullscreen 3D + wave + stars */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <div
            id="quantum3DContainer"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
            }}
          />
          <canvas
            id="waveCanvas"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
            }}
          />
          <canvas
            id="starsCanvas"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
            }}
          />
        </div>

        {/* Page content above the animations */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: 'calc(100vh - 300px)',
            padding: '1rem',
          }}
        >
          {/* Simple nav */}
          <nav
            style={{
              background: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              padding: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <a href="/">Home</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* Render the actual page */}
          <Component {...pageProps} />
        </div>

        {/* ChatGPT footer */}
        <footer
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderTop: '1px solid #ccc',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>
            Next-Quantum ChatGPT (Transformer-based)
          </h2>
          <ChatGPTInterface />
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            ©2025 Quantum Apex. Built with Three.js, Transformers, MoE, Diffusion. <br />
            (Self-evolving unstoppable unstoppable code.)
          </p>
        </footer>
      </div>
    </>
  )
}
