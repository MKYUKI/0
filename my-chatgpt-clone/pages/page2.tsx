// pages/page2.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import ChatGPTInterface from '../components/ChatGPTInterface';

// グローバルCSSなどをインポート
import '../public/css/globalQuantum.css';
import '../public/css/kaleidoBase.css';
import '../public/css/kaleido1.css';

export default function Page2() {
  // マウント時に 3D アニメーションなど読み込み
  useEffect(() => {
    import('../public/js/quantum3D.js');
    import('../public/js/starsAnim.js');
    import('../public/js/waveAnim.js');
  }, []);

  return (
    <>
      <Head>
        <title>Page2 | GPT Search-like Interface</title>
        <meta 
          name="description" 
          content="GPT-4.0 chat UI with a white background and quantum black lines" 
        />
      </Head>

      <div className="root-container">
        {/* 背景 3 層のキャンバス */}
        <canvas id="bg-canvas" className="bg-canvas-layer"></canvas>
        <canvas id="stars-canvas" className="bg-canvas-layer"></canvas>
        <canvas id="wave-canvas" className="bg-canvas-layer"></canvas>

        <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          <h1 
            style={{
              textAlign: 'center',
              margin: '1rem 0',
              fontSize: '1.8rem',
              color: '#000'
            }}
          >
            Page2: Next-Level GPT Search UI
          </h1>

          {/* 検索 UI or チャット UI */}
          <section style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
              This page simulates a <strong>ChatGPT Search-like</strong> interface
              with a white background and quantum black lines dancing in the back.
            </p>

            {/* ChatGPT 風チャットコンポーネント */}
            <ChatGPTInterface />
          </section>
        </main>
      </div>
    </>
  );
}