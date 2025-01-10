// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import '../styles/globals.css';  // Tailwind or your global resets
import '../styles/globalQuantum.css'; // New quantum lines animation

import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* meta tags, favicons, etc. */}
      </Head>

      {/*
        - Using next/script to ensure Three.js and custom scripts 
          load in correct order. 
        - "beforeInteractive" allows quantum3D to find THREE.
      */}
      <Script src="https://unpkg.com/three@0.153.0/build/three.min.js" strategy="beforeInteractive" />
      <Script src="/js/quantum3D.js" strategy="beforeInteractive" />
      <Script src="/js/waveAnim.js" strategy="beforeInteractive" />
      <Script src="/js/starsAnim.js" strategy="beforeInteractive" />

      <div className="quantumGeometryBG">
        <div className="globalContainerWrap" style={{ minHeight: '100vh', position: 'relative' }}>
          
          {/* --- TOP BLOCK: 3D Torus + waveCanvas + starCanvas --- */}
          <header style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
            {/* 3D Container (quantum3D.js manipulates #quantum3DContainer) */}
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />

            {/* waveCanvas + starCanvas overlay (pointerEvents: none で操作を妨げない) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <canvas id="waveCanvas" style={{ width: '100%', height: '100%' }} />
              <canvas id="starsCanvas" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Navigation */}
            <nav
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.65)',
                textAlign: 'center',
              }}
            >
              <a href="/">Page1</a> | <a href="/page2">Page2</a> | <a href="/page3">Page3</a> |{' '}
              <a href="/page4">Page4</a> | <a href="/page5">Page5</a> | <a href="/page6">Page6</a>
            </nav>
          </header>

          {/* --- MIDDLE BLOCK: Page-specific content --- */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Component {...pageProps} />
          </div>

          {/* --- BOTTOM BLOCK: ChatGPT + Footer --- */}
          <section
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.85)',
              marginTop: '2rem',
              padding: '1rem',
            }}
          >
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Next-Quantum ChatGPT Search (Advanced Transformer)
            </h2>
            <ChatGPTInterface />
          </section>

          <footer
            style={{
              padding: '1rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.9)',
            }}
          >
            <p>
              ©2025 Future-Quantum | Integrated with{' '}
              <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
                Transformer(2017)
              </a>
              ,{' '}
              <a href="https://arxiv.org/abs/2210.06423" target="_blank" rel="noreferrer">
                Mistral
              </a>
              ,{' '}
              <a href="https://arxiv.org/abs/2302.04089" target="_blank" rel="noreferrer">
                LLaMA2
              </a>
              , etc. 
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
