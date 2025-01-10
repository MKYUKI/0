// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import '../styles/globals.css';
import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* quantum lines CSS */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      {/*
        Using Next.js <Script> with strategy="beforeInteractive"
        ensures that THREE is loaded before quantum3D.js uses it.
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      <div className="quantumGeometryBG">
        <div className="globalContainerWrap" style={{ position: 'relative', minHeight: '100vh' }}>
          {/* 
            3D Torus 
            We'll place an absolutely positioned div at top, or
            you can keep it any style you want.
          */}
          <div style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          {/*
            Wave & Stars Canvas as background:
            pointerEvents: 'none' so user can still click links, etc
          */}
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

          {/* Navigation */}
          <nav style={{ padding: '0.5rem', background: '#eee', textAlign: 'center', zIndex: 1 }}>
            <a href="/">Home(Page1)</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* Page-specific content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Component {...pageProps} />
          </div>

          {/* ChatGPT Interface at bottom */}
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
            <h2 style={{ textAlign: 'center' }}>Next-Quantum ChatGPT Search (Transformer-based)</h2>
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
  );
}
