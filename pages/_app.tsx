// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

// This is your Tailwind or basic reset
import '../styles/globals.css'

import ChatGPTInterface from '../components/ChatGPTInterface'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* LOAD globalQuantum.css FROM public/css/ */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/* Three.js + quantum3D.js + waveAnim + starsAnim => load in <Script> */}
      <Script
        src="https://unpkg.com/three@0.153.0/build/three.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      {/* Outer container with quantum BG */}
      <div className="quantumGeometryBG" style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Fullscreen 3D BG + wave + stars */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          {/* Three.js 3D container */}
          <div
            id="quantum3DContainer"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          {/* wave & stars canvases */}
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

        {/* Main content (relative) */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: 'calc(100vh - 250px)',
            padding: '0.5rem',
          }}
        >
          {/* Simple nav bar */}
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

          {/* Render page */}
          <Component {...pageProps} />
        </div>

        {/* Footer with ChatGPT */}
        <footer
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderTop: '1px solid #ccc',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Next-Quantum ChatGPT (Transformer-based)</h2>
          <ChatGPTInterface />
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            ©2025 Quantum Apex. Built with Three.js, Transformers, MoE, Diffusion.
          </p>
        </footer>
      </div>
    </>
  )
}
