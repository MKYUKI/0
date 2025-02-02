import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

// ダミーデータ：1から36までの無料で読める本（6列×6行のグリッド用）
const freeBooks: Book[] = Array.from({ length: 36 }, (_, i) => ({
  id: `${i + 1}`,
  title: `無料本 ${i + 1}`,
  imageUrl: '/images/placeholder-book.jpg', // ※実際の画像に置き換えてください
  link: `/free-book/${i + 1}`
}));

export default function FreeBook() {
  return (
    <>
      <Head>
        <title>無料で読む本 - MasakiKusaka</title>
        <meta
          name="description"
          content="無料で読める本の一覧ページ。横6列×縦6行のグリッドで公式YouTube Subscriptions風のレイアウトを採用。"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ★ ヒーローセクション（同様に400pxの高さのキャンバス）
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/*
        ★ 無料本一覧セクション
           横6列×縦6行のグリッド表示
      */}
      <section className="lower-animations-section">
        <div className="animation-bg-wrapper">
          <canvas id="galaxy-art-canvas"></canvas>
          <canvas id="rotating-galaxies-canvas"></canvas>
          <canvas id="art-stars-canvas"></canvas>
          <canvas id="art-nebula-canvas"></canvas>
        </div>
        <div className="lower-content-foreground">
          <h2 className="section-title" style={{ marginTop: '40px' }}>
            無料で読める本一覧
          </h2>
          <div className="thumbnail-grid">
            {freeBooks.map((book) => (
              <Link key={book.id} href={book.link}>
                <div className="thumbnail-card">
                  <img src={book.imageUrl} alt={book.title} />
                  <div className="thumbnail-title">{book.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ height: '100px' }} />
        </div>
      </section>

      {/*
        ★ 背景アニメーション用Script読み込み
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
          if (typeof window !== 'undefined' && 'startRotatingGalaxies' in window) {
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
        /* ヒーローセクション */
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
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #fff;
        }
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        /* 無料本一覧グリッド：横6×縦6 */
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
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
