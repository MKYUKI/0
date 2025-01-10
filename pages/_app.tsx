// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';

// If using Tailwind or a custom reset, import here:
import '../styles/globals.css';
import '../styles/globalQuantum.css'; // Our black quantum lines background

import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/*
          3D + quantum lines. We assume you have these JS files in /public/js.
          1) Three.js from a CDN or local,
          2) quantum3D.js for the spinning TorusKnot,
          3) waveAnim.js & starsAnim.js for optional background waves/stars if needed.
        */}
        <script src="https://unpkg.com/three@0.153.0/build/three.min.js" defer></script>
        <script src="/js/quantum3D.js" defer></script>
        <script src="/js/waveAnim.js" defer></script>
        <script src="/js/starsAnim.js" defer></script>
      </Head>

      {/* The entire site wrapped in a quantum geometry BG */}
      <div className="quantumGeometryBG">
        <div className="globalContainerWrap">
          {/* 3D canvas container at top */}
          <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Our simple top navigation */}
          <nav style={{ padding: '0.5rem', background: '#eee', textAlign: 'center' }}>
            <a href="/">Home(Page1)</a> |{" "}
            <a href="/page2">Page2</a> |{" "}
            <a href="/page3">Page3</a> |{" "}
            <a href="/page4">Page4</a> |{" "}
            <a href="/page5">Page5</a> |{" "}
            <a href="/page6">Page6</a>
          </nav>

          {/* Render page-specific content */}
          <Component {...pageProps} />

          {/* ChatGPT Interface at bottom for all pages */}
          <section style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.8)',
            marginTop: '2rem',
            borderTop: '1px solid #ccc',
          }}>
            <h2 style={{ textAlign: 'center' }}>
              Next-Quantum ChatGPT Search (Transformer-based)
            </h2>
            <ChatGPTInterface />
            {/*
              *Att.: 2017 Transformer / "Attention Is All You Need"
              Paper: https://arxiv.org/abs/1706.03762
              Also see e.g. https://paperswithcode.com/paper/attention-is-all-you-need
            */}
          </section>

          {/* Footer */}
          <footer style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.85)' }}>
            <p>©2024 Legendary Next-Quantum Website. Built with Three.js + Transformers.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
