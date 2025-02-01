// File: pages/index.tsx

import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function Home() {
  // ダミーデータ：1から30までユニークなコンテンツ（重複なし）
  const thumbnails = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `コンテンツ ${i + 1}`,
    imageUrl: '/images/placeholder.jpg', // ※実際の画像URLに置き換えてください
    link: `/content/${i + 1}` // 各コンテンツの詳細ページ（例）
  }));

  return (
    <>
      <Head>
        <title>ホーム画面 - 宇宙史上最大・最先端のシミュレーション</title>
        <meta
          name="description"
          content="最上部に宇宙アニメーション（ヒーローセクション：400pxの高さ）を表示し、その下に背景アニメーション、続いて履歴書・職務経歴書のダウンロードボタンおよび、公式YouTube Subscriptionsページと同等のレイアウトでコンテンツサムネイルグリッド（横3列×縦10行＝30個）を配置しています。参考文献：公式 YouTube (https://www.youtube.com/feed/subscriptions)"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ★ ヒーローセクション (cosmicSim)
           → 高さを600pxから400pxに変更（横幅は画面端から端まで）
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/*
        ★ 下部セクション
          ・背景アニメーション（galaxyArtSim / rotatingGalaxies / artStars / artNeula）
          ・前面コンテンツ：
              ① 履歴書・職務経歴書のダウンロードボタン（横3列×縦1段）
              ② その下に公式 YouTube Subscriptions に似たサムネイルグリッド（横3列×縦10行＝30個）
      */}
      <section className="lower-animations-section">
        {/* 背景アニメーション */}
        <div className="animation-bg-wrapper">
          <canvas id="galaxy-art-canvas"></canvas>
          <canvas id="rotating-galaxies-canvas"></canvas>
          <canvas id="art-stars-canvas"></canvas>
          <canvas id="art-nebula-canvas"></canvas>
        </div>

        {/* 前面コンテンツ */}
        <div className="lower-content-foreground">
          {/* 履歴書・職務経歴書セクション */}
          <h2 className="section-title" style={{ marginTop: '40px' }}>
            履歴書・職務経歴書
          </h2>
          <div className="resume-thumbnail-grid">
            <div className="resume-thumb-card">
              <button
                className="blue-dynamic-button"
                onClick={() => {
                  window.location.href = '/docs/MasakiKusaka_Resume.docx';
                }}
              >
                MasakiKusaka_Resume.docx
              </button>
            </div>
            <div className="resume-thumb-card">
              <button
                className="blue-dynamic-button"
                onClick={() => {
                  window.location.href = '/docs/MasakiKusaka_Resume.pdf';
                }}
              >
                MasakiKusaka_Resume.pdf
              </button>
            </div>
            <div className="resume-thumb-card">
              <button
                className="blue-dynamic-button"
                onClick={() => {
                  window.location.href = '/docs/MasakiKusaka_CareerHistory.docx';
                }}
              >
                MasakiKusaka_CareerHistory.docx
              </button>
            </div>
          </div>
          <div className="resume-thumbnail-grid" style={{ marginTop: '10px' }}>
            <div className="resume-thumb-card">
              <button
                className="blue-dynamic-button"
                onClick={() => {
                  window.location.href = '/docs/MasakiKusaka_CareerHistory.pdf';
                }}
              >
                MasakiKusaka_CareerHistory.pdf
              </button>
            </div>
          </div>

          {/* 新規追加：コンテンツ一覧（YouTube公式 Subscriptions ページ風グリッド） */}
          <h2 className="section-title" style={{ marginTop: '40px' }}>
            コンテンツ一覧
          </h2>
          <div className="thumbnail-grid">
            {thumbnails.map((thumb) => (
              <Link key={thumb.id} href={thumb.link}>
                <div className="thumbnail-card">
                  <img src={thumb.imageUrl} alt={thumb.title} />
                  <div className="thumbnail-title">{thumb.title}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* 調整用スペース */}
          <div style={{ height: '100px' }} />
        </div>
      </section>

      {/*
        各種背景アニメーション用のScript読み込み
      */}
      <Script
        src="/js/cosmicSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startCosmicSim' in window) {
            // @ts-ignore
            window.startCosmicSim();
          }
        }}
      />
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startGalaxyArtSim' in window) {
            // @ts-ignore
            window.startGalaxyArtSim();
          }
        }}
      />
      <Script
        src="/js/rotatingGalaxies.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (
            typeof window !== 'undefined' &&
            'startRotatingGalaxies' in window
          ) {
            // @ts-ignore
            window.startRotatingGalaxies();
          }
        }}
      />
      <Script
        src="/js/artStars.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtStars' in window) {
            // @ts-ignore
            window.startArtStars();
          }
        }}
      />
      <Script
        src="/js/artNeula.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtNebula' in window) {
            // @ts-ignore
            window.startArtNebula();
          }
        }}
      />

      <style jsx>{`
        /* ヒーローセクション：高さを400pxに変更 */
        .hero-section {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        .hero-section canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* 下部背景アニメーション */
        .lower-animations-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }
        .animation-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        .animation-bg-wrapper canvas {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        /* 前面コンテンツ */
        .lower-content-foreground {
          position: relative;
          z-index: 2;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #fff;
        }
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        /* 履歴書・職務経歴書グリッド（変更なし） */
        .resume-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          justify-items: center;
        }
        .resume-thumb-card {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 20px;
          width: 100%;
          max-width: 300px;
        }

        /* 青系動的ボタン */
        .blue-dynamic-button {
          position: relative;
          display: inline-block;
          padding: 12px 16px;
          color: #e0f4ff;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid #2187ff;
          border-radius: 6px;
          background: transparent;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;
          width: 100%;
          max-width: 250px;
        }
        .blue-dynamic-button:hover {
          background: rgba(33, 135, 255, 0.15);
        }
        .blue-dynamic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -30%;
          width: 30%;
          height: 100%;
          background: rgba(33, 135, 255, 0.4);
          transform: skewX(-45deg);
          transition: 0.5s;
        }
        .blue-dynamic-button:hover::before {
          left: 130%;
        }

        /* コンテンツサムネイルグリッド：公式 YouTube Subscriptions ページ風 */
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 30px;
          width: 100%;
        }
        .thumbnail-card {
          position: relative;
          background: #000;
          cursor: pointer;
          transition: transform 0.3s;
          width: 100%;
          overflow: hidden;
        }
        .thumbnail-card:hover {
          transform: scale(1.03);
        }
        /* 16:9 アスペクト比を維持するためのトリック */
        .thumbnail-card::before {
          content: "";
          display: block;
          padding-top: 56.25%;
        }
        .thumbnail-card img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumbnail-title {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 4px;
          font-size: 0.9rem;
          box-sizing: border-box;
        }

        /* レスポンシブ設定 */
        @media (min-width: 1024px) {
          .thumbnail-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 1024px) {
          .thumbnail-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .thumbnail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
