// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';

// TailwindやGlobal CSS
import '../styles/globals.css';
// 量子的な黒線背景CSS (public/css/globalQuantum.css なら link rel= で読み込む)
import '../styles/globalQuantum.css'; // もし styles/ 下に置いたならこう読む

import ChatGPTInterface from '../components/ChatGPTInterface';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/*
          3Dアニメ + waveAnim, starsAnim
          Three.jsをCDNから defer で読み込み、
          quantum3D.js で実際のシーン初期化、回転オブジェクト
        */}
        <script src="https://unpkg.com/three@0.153.0/build/three.min.js" defer></script>
        <script src="/js/quantum3D.js" defer></script>
        <script src="/js/waveAnim.js" defer></script>
        <script src="/js/starsAnim.js" defer></script>
        {/* もしglobalQuantum.cssを public/css/ に置くなら↓にlinkを書く
           <link rel="stylesheet" href="/css/globalQuantum.css" />
        */}
      </Head>

      {/* 黒線背景ラップ */}
      <div className="quantumGeometryBG">
        <div className="globalContainerWrap">
          {/* 3D canvas (top area) */}
          <div style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
            <div id="quantum3DContainer" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* ナビゲーション */}
          <nav style={{ padding: '0.5rem', background: '#eee', textAlign: 'center' }}>
            <a href="/">Home(Page1)</a> |{' '}
            <a href="/page2">Page2</a> |{' '}
            <a href="/page3">Page3</a> |{' '}
            <a href="/page4">Page4</a> |{' '}
            <a href="/page5">Page5</a> |{' '}
            <a href="/page6">Page6</a>
          </nav>

          {/* ページ内容 */}
          <Component {...pageProps} />

          {/* 全ページ共通のChatGPTインターフェース */}
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
              * 2017 Attention論文:
              * https://arxiv.org/abs/1706.03762
            */}
          </section>

          <footer style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.85)' }}>
            <p>©2024 Legendary Next-Quantum Website. Built with Three.js + Transformers.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
