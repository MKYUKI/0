import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css'; 
import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Three.js & quantum scripts */}
        <script src="https://unpkg.com/three@0.153.0/build/three.min.js" defer></script>
        <script src="/js/quantum3D.js" defer></script>
        <script src="/js/waveAnim.js" defer></script>
        <script src="/js/starsAnim.js" defer></script>

        {/* quantum geometry background CSS from public/css/ */}
        <link rel="stylesheet" href="/css/globalQuantum.css" />
      </Head>

      <div className="quantumGeometryBG">
        <div className="globalContainerWrap">
          <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          <nav style={{ padding: '0.5rem', background: '#eee', textAlign: 'center' }}>
            <a href="/">Home(Page1)</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          <Component {...pageProps} />

          <section
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.8)',
              marginTop: '2rem',
              borderTop: '1px solid #ccc',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>
              Next-Quantum ChatGPT Search (Transformer-based)
            </h2>
            <ChatGPTInterface />
          </section>

          <footer
            style={{
              padding: '1rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.85)',
            }}
          >
            <p>©2024 Legendary Next-Quantum Website. Built with Three.js + Transformers.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
