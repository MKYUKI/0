// File: pages/index.tsx

import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function Home() {
  // ダミーデータ：1から50までのコンテンツ（5列×10行用）
  // 各コンテンツの設定は以下の通り：
  // - コンテンツ1: タイトル「GitHub」、画像は '/images/github-thumbnail.jpg'、リンク先は外部の GitHub (https://github.com/MKYUKI/0)
  // - コンテンツ2: 画像は '/images/content2-thumbnail.jpg'、リンク先は '/book-market'
  // - コンテンツ3: タイトル「AmazonKindle books 本」、画像は '/images/amazonkindle-thumbnail.jpg'、リンク先は '/free-book'
  // - その他はプレースホルダー画像 ('/images/placeholder.jpg') と内部リンク (/content/○)
  const thumbnails = Array.from({ length: 50 }, (_, i) => {
    const contentNumber = i + 1;
    let title = `コンテンツ ${contentNumber}`;
    let imageUrl = '/images/placeholder.jpg';
    let link = `/content/${contentNumber}`;

    if (contentNumber === 1) {
      // コンテンツ1: GitHubへの外部リンク
      title = 'GitHub';
      imageUrl = '/images/github-thumbnail.jpg'; // public/images に配置
      link = 'https://github.com/MKYUKI/0';
    } else if (contentNumber === 2) {
      // コンテンツ2: 完成済みのサムネイル画像を使用し、リンク先は /book-market
      imageUrl = '/images/content2-thumbnail.jpg'; // public/images に配置
      link = '/book-market';
    } else if (contentNumber === 3) {
      // コンテンツ3: タイトルと画像を変更
      title = 'AmazonKindle books 本';
      imageUrl = '/images/amazonkindle-thumbnail.jpg'; // public/images に配置
      link = '/free-book';
    }
    return { id: contentNumber, title, imageUrl, link };
  });

  return (
    <>
      <Head>
        <title>ホーム画面 - 宇宙史上最大・最先端のシミュレーション</title>
        <meta
          name="description"
          content="最上部にアニメーション、履歴書ダウンロード、コンテンツ一覧。最下層にNASA風フッターを配置し、日下真旗(Masaki Kusaka)の情報を掲載。"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ★ ヒーローセクション
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/*
        ★ 下部アニメーションセクション
      */}
      <section className="lower-animations-section">
        <div className="animation-bg-wrapper">
          <canvas id="galaxy-art-canvas"></canvas>
          <canvas id="rotating-galaxies-canvas"></canvas>
          <canvas id="art-stars-canvas"></canvas>
          <canvas id="art-nebula-canvas"></canvas>
        </div>

        {/*
          前面コンテンツ
          履歴書・職務経歴書ダウンロードセクション＋コンテンツ一覧
        */}
        <div className="lower-content-foreground">
          {/*
            ★ 履歴書・職務経歴書ダウンロード
          */}
          <section className="documents-section">
            <h2 className="section-title">履歴書・職務経歴書ダウンロード</h2>
            <div className="resume-thumbnail-grid">
              <div className="resume-thumb-card">
                <button
                  className="blue-dynamic-button"
                  onClick={() =>
                    (window.location.href = '/docs/MasakiKusaka_Resume.docx')
                  }
                >
                  MasakiKusaka_Resume.docx
                </button>
              </div>
              <div className="resume-thumb-card">
                <button
                  className="blue-dynamic-button"
                  onClick={() =>
                    (window.location.href = '/docs/MasakiKusaka_Resume.pdf')
                  }
                >
                  MasakiKusaka_Resume.pdf
                </button>
              </div>
              <div className="resume-thumb-card">
                <button
                  className="blue-dynamic-button"
                  onClick={() =>
                    (window.location.href =
                      '/docs/MasakiKusaka_CareerHistory.docx')
                  }
                >
                  MasakiKusaka_CareerHistory.docx
                </button>
              </div>
              <div className="resume-thumb-card">
                <button
                  className="blue-dynamic-button"
                  onClick={() =>
                    (window.location.href =
                      '/docs/MasakiKusaka_CareerHistory.pdf')
                  }
                >
                  MasakiKusaka_CareerHistory.pdf
                </button>
              </div>
            </div>
          </section>

          {/*
            ★ コンテンツ一覧
          */}
          <section className="contents-section">
            <h2 className="section-title" style={{ marginTop: '40px' }}>
              コンテンツ一覧
            </h2>
            <div className="thumbnail-grid">
              {thumbnails.map((thumb) => {
                // 外部リンク（httpで始まる）の場合は <a> タグで target="_blank" を指定
                if (thumb.link.startsWith('http')) {
                  return (
                    <a
                      key={thumb.id}
                      href={thumb.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="thumbnail-card">
                        <img src={thumb.imageUrl} alt={thumb.title} />
                        <div className="thumbnail-title">{thumb.title}</div>
                      </div>
                    </a>
                  );
                } else {
                  return (
                    <Link key={thumb.id} href={thumb.link}>
                      <div className="thumbnail-card">
                        <img src={thumb.imageUrl} alt={thumb.title} />
                        <div className="thumbnail-title">{thumb.title}</div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
            <div style={{ height: '80px' }} />
          </section>
        </div>
      </section>

      {/*
        ★ NASA風フッター
        ここに日下真旗 (Masaki Kusaka) 様の個人情報や著作権等を明記
      */}
      <footer className="kusaka-nasa-style-footer">
        <div className="footer-inner">
          <h3 className="footer-title">Masaki Kusaka (日下 真旗)</h3>
          <p className="footer-subtitle">
            National Exploration of AI &amp; Space Simulations
          </p>
          <p className="footer-description">
            広島国際大学保健医療学部救急救命学科で人命救助の知識を学び、<br />
            その後、接客やコールセンターなど様々な業種で経験を積みました。<br />
            現在はIT業界への転身を目指し、Python等のプログラミング言語を学習中です。
          </p>
          <div className="footer-links-section">
            <ul className="footer-links-col">
              <li>
                <strong>Career / Works</strong>
              </li>
              <li>
                <a
                  href="https://oo-5qvtc.ondigitalocean.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio Site 1
                </a>
              </li>
              <li>
                <a
                  href="http://0xxxxxxxxxxxxx.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio Site 2
                </a>
              </li>
              <li>
                <a
                  href="https://youtube-newgit-mutrgtf3vd2jrsmc7urasv.streamlit.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Streamlit App
                </a>
              </li>
              <li>
                <a
                  href="https://www.dropbox.com/scl/fo/pc5302dj9fd9ktl3zkz6o/AOPeSS-FS11b7HNV-ynHvQA?rlkey=2l0eiwbeaqmty46o5cut8ss8n&st=7iegyr44&dl=0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dropbox
                </a>
              </li>
            </ul>
            <ul className="footer-links-col">
              <li>
                <strong>Tech &amp; Social</strong>
              </li>
              <li>
                <a
                  href="https://huggingface.co/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  HuggingFace
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MKYUKI"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@MK_AGI"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/MK_ASI0"
                  target="_blank"
                  rel="noreferrer"
                >
                  X (旧Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
            <ul className="footer-links-col">
              <li>
                <strong>Payments &amp; Shop</strong>
              </li>
              <li>
                <a
                  href="https://www.paypal.com/paypalme/MasakiKusaka"
                  target="_blank"
                  rel="noreferrer"
                >
                  PayPal
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amazon JP
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amazon US
                </a>
              </li>
            </ul>
            <ul className="footer-links-col">
              <li>
                <strong>Open Music / BGM</strong>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=jY1bGUaxv2Q&list=PLjbFG4Jyrt2-3ZVKb2Y31ud4iLXcVKE9B"
                  target="_blank"
                  rel="noreferrer"
                >
                  AI LLM BGM EDM
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=dh01eSOn9_E&list=PLjbFG4Jyrt2_R6RyHsEet-kuwhZtKhJTO"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Music
                </a>
              </li>
            </ul>
          </div>
          <hr className="footer-divider" />
          <div className="footer-links-bottom">
            <a href="#">For Media</a>
            <a href="#">Privacy Policy</a>
            <a href="#">No FEAR Act</a>
            <a href="#">Budget &amp; Annual Reports</a>
            <a href="#">Contact</a>
            <a href="#">Accessibility</a>
          </div>
          <p className="footer-update">
            Page Last Updated: Jan 31, 2025 &emsp;|&emsp; Page Editor: 日下真旗 (Masaki Kusaka) &emsp;|&emsp; Responsible Official: MKYUKI
          </p>
          <p className="footer-personal">
            146-0085 東京都大田区久が原2-28-25 シェアハウス203号室 &emsp;|&emsp; E-mail: <a href="mailto:masaki136928@gmail.com">masaki136928@gmail.com</a>
          </p>
          <p className="footer-disclaimer">
            本サイトの内容は「クリエイティブ・コモンズ1.0（CC0）」で完全公開しています。<br />
            誰でも自由に利用・改変・再配布が可能です。詳細は利用規約をご確認ください。
          </p>
        </div>
      </footer>

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
        /* 下部アニメーション */
        .lower-animations-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #000;
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
        .lower-content-foreground {
          position: relative;
          z-index: 2;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #fff;
        }
        .documents-section {
          padding: 40px 20px;
          text-align: center;
          background: transparent;
        }
        .resume-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          justify-items: center;
          margin-top: 20px;
        }
        .resume-thumb-card {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 20px;
          width: 100%;
          max-width: 300px;
        }
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
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        .contents-section {
          margin-top: 40px;
        }
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
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
        .kusaka-nasa-style-footer {
          background-color: #000;
          color: #fff;
          padding: 40px 20px;
          text-align: left;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-title {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .footer-subtitle {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 1rem;
        }
        .footer-description {
          font-size: 0.9rem;
          color: #ccc;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .footer-links-section {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 1.5rem;
        }
        .footer-links-col {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links-col li {
          margin-bottom: 0.5rem;
        }
        .footer-links-col a {
          color: #aaa;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .footer-links-col a:hover {
          text-decoration: underline;
        }
        .footer-divider {
          border: none;
          border-top: 1px solid #444;
          margin: 1.5rem 0;
        }
        .footer-links-bottom {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .footer-links-bottom a {
          color: #999;
          text-decoration: none;
        }
        .footer-links-bottom a:hover {
          text-decoration: underline;
        }
        .footer-update {
          font-size: 0.8rem;
          color: #999;
          margin-bottom: 0.5rem;
        }
        .footer-personal {
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 1rem;
        }
        .footer-personal a {
          text-decoration: underline;
          color: #bbb;
        }
        .footer-disclaimer {
          font-size: 0.8rem;
          color: #888;
          line-height: 1.4;
        }
      `}</style>
    </>
  );
}
