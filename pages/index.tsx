// pages/index.tsx
import React, { useEffect } from 'react';
import ChatGPTInterface from '../components/ChatGPTInterface';

// グローバルCSSをインポート
import '../public/css/globalQuantum.css';
import '../public/css/kaleidoBase.css';
import '../public/css/kaleido1.css';

export default function Home() {
  // 3Dアニメーションやその他アニメをロードする
  useEffect(() => {
    // quantum3D.js の初期化を呼ぶ
    import('../public/js/quantum3D.js');
    // starsAnim.js の初期化を呼ぶ
    import('../public/js/starsAnim.js');
    // waveAnim.js の初期化を呼ぶ
    import('../public/js/waveAnim.js');
  }, []);

  return (
    <div className="root-container">
      <head>
        <title>My ChatGPT Clone - GPT-4.0 Powered</title>
        <meta
          name="description"
          content="A GPT-4.0 powered chat interface, inspired by ChatGPT"
        />
      </head>

      {/* 背景用のキャンバスを複数配置し、3Dや星空、波形アニメを重ね合わせ */}
      <canvas id="bg-canvas" className="bg-canvas-layer"></canvas>
      <canvas id="stars-canvas" className="bg-canvas-layer"></canvas>
      <canvas id="wave-canvas" className="bg-canvas-layer"></canvas>

      <main>
        {/* ChatGPTと同じようなインターフェース */}
        <ChatGPTInterface />
      </main>
    </div>
  );
}
