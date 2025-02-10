import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function Home() {
  // ダミーデータ：1から50までのコンテンツ（5列×10行用）
  // 各コンテンツの設定は以下の通り：
  // - コンテンツ1: タイトル「GitHub」、画像は '/images/github-thumbnail.jpg'、リンク先は外部の GitHub (https://github.com/MKYUKI/0)
  // - コンテンツ2: 画像は '/images/content2-thumbnail.jpg'、リンク先は「X の私のホームページ」に変更
  // - コンテンツ3: タイトル「AmazonKindle books 本」、画像は '/images/amazonkindle-thumbnail.jpg'、リンク先は '/free-book'
  // - コンテンツ4: タイトル「ChatGPTo3」、画像は '/images/chatgpt-thumbnail.jpg'、リンク先は https://chatgpt.com/
  // - コンテンツ5: タイトル「寄付Paypal」、画像は '/images/paypal-thumbnail.jpg'、リンク先は https://www.paypal.com/paypalme/MasakiKusaka
  // - コンテンツ6: タイトル「HuggingFace」、画像は '/images/huggingface-thumbnail.jpg'、リンク先は https://huggingface.co/MasakiYUKI
  // - コンテンツ7: タイトル「Facebook」、画像は '/images/facebook-thumbnail.jpg'、リンク先は https://www.facebook.com/
  // - コンテンツ8: タイトル「本販売JP」、画像は '/images/amazonjp-thumbnail.jpg'、リンク先は https://www.amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1
  // - コンテンツ11: タイトル「Dropbox」、画像は '/images/dropbox-thumbnail.jpg'、リンク先は Dropbox の指定URL
  // - コンテンツ12: タイトル「YouTube Home」、画像は '/images/youtube-thumbnail.jpg'、リンク先は https://www.youtube.com/@MK_ASI0
  // - コンテンツ13: タイトル「Book Sales US」、画像は '/images/amazonus-thumbnail.jpg'、リンク先は https://www.amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1
  // - コンテンツ17: タイトル「YouTube Open」、画像は '/images/youtube-thumbnail.jpg'、リンク先は https://www.youtube.com/watch?v=dh01eSOn9_E&list=PLjbFG4Jyrt2_R6RyHsEet-kuwhZtKhJTO
  // - その他はプレースホルダー画像 ('/images/placeholder.jpg') と内部リンク (/content/○)
  const thumbnails = Array.from({ length: 50 }, (_, i) => {
    const contentNumber = i + 1;
    let title = `コンテンツ ${contentNumber}`;
    let imageUrl = '/images/placeholder.jpg';
    let link = `/content/${contentNumber}`;

    if (contentNumber === 1) {
      // コンテンツ1: GitHubへの外部リンク
      title = 'GitHub';
      imageUrl = '/images/github-thumbnail.jpg';
      link = 'https://github.com/MKYUKI/0';
    } else if (contentNumber === 2) {
      // コンテンツ2: X のホームページへリンク
      title = 'X';
      imageUrl = '/images/content2-thumbnail.jpg';
      link = 'https://x.com/MK_ASI0';
    } else if (contentNumber === 3) {
      // コンテンツ3: AmazonKindle books 本
      title = 'AmazonKindle books 本';
      imageUrl = '/images/amazonkindle-thumbnail.jpg';
      link = '/free-book';
    } else if (contentNumber === 4) {
      // コンテンツ4: ChatGPTo3
      title = 'ChatGPTo3';
      imageUrl = '/images/chatgpt-thumbnail.jpg';
      link = 'https://chatgpt.com/';
    } else if (contentNumber === 5) {
      // コンテンツ5: 寄付Paypal
      title = '寄付Paypal';
      imageUrl = '/images/paypal-thumbnail.jpg';
      link = 'https://www.paypal.com/paypalme/MasakiKusaka';
    } else if (contentNumber === 6) {
      // コンテンツ6: HuggingFace
      title = 'HuggingFace';
      imageUrl = '/images/huggingface-thumbnail.jpg';
      link = 'https://huggingface.co/MasakiYUKI';
    } else if (contentNumber === 7) {
      // コンテンツ7: Facebook
      title = 'Facebook';
      imageUrl = '/images/facebook-thumbnail.jpg';
      link = 'https://www.facebook.com/';
    } else if (contentNumber === 8) {
      // コンテンツ8: 本販売JP
      title = '本販売JP';
      imageUrl = '/images/amazonjp-thumbnail.jpg';
      link =
        'https://www.amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1';
    } else if (contentNumber === 11) {
      // コンテンツ11: Dropbox
      title = 'Dropbox';
      imageUrl = '/images/dropbox-thumbnail.jpg';
      link =
        'https://www.dropbox.com/scl/fo/pc5302dj9fd9ktl3zkz6o/AOPeSS-FS11b7HNV-ynHvQA?rlkey=2l0eiwbeaqmty46o5cut8ss8n&st=7iegyr44&dl=0';
    } else if (contentNumber === 12) {
      // コンテンツ12: YouTube Home
      title = 'YouTube Home';
      imageUrl = '/images/youtube-thumbnail0.jpg';
      link = 'https://www.youtube.com/@MK_ASI0';
    } else if (contentNumber === 13) {
      // コンテンツ13: Book Sales US
      title = 'Book Sales US';
      imageUrl = '/images/amazonus-thumbnail.jpg';
      link =
        'https://www.amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1';
    } else if (contentNumber === 17) {
      // コンテンツ17: YouTube Open
      title = 'YouTube Open';
      imageUrl = '/images/youtube-thumbnail.jpg';
      link =
        'https://www.youtube.com/watch?v=dh01eSOn9_E&list=PLjbFG4Jyrt2_R6RyHsEet-kuwhZtKhJTO';
    } else if (contentNumber === 18) {
      title = '宇宙史上最高峰の魔法ゲーム';
      imageUrl = '/images/ultimate-magic-game-thumbnail.jpg';
      link = '/game';
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
          前面コンテンツ：履歴書・職務経歴書ダウンロード＋コンテンツ一覧
        */}
        <div className="lower-content-foreground">
          {/*
            ★ 履歴書・職務経歴書ダウンロードセクション
               下記4つのボタンは、深い青色を基調としたダイナミックなアニメーション付きボタンです。
          */}
          <section className="documents-section">
            <h2 className="section-title">履歴書・職務経歴書ダウンロード</h2>
            <div className="resume-thumbnail-grid">
              <button
                className="dynamic-blue-button"
                onClick={() =>
                  (window.location.href = '/docs/MasakiKusaka_Resume.docx')
                }
              >
                MasakiKusaka_Resume.docx
              </button>
              <button
                className="dynamic-blue-button"
                onClick={() =>
                  (window.location.href = '/docs/MasakiKusaka_Resume.pdf')
                }
              >
                MasakiKusaka_Resume.pdf
              </button>
              <button
                className="dynamic-blue-button"
                onClick={() =>
                  (window.location.href = '/docs/MasakiKusaka_CareerHistory.docx')
                }
              >
                MasakiKusaka_CareerHistory.docx
              </button>
              <button
                className="dynamic-blue-button"
                onClick={() =>
                  (window.location.href = '/docs/MasakiKusaka_CareerHistory.pdf')
                }
              >
                MasakiKusaka_CareerHistory.pdf
              </button>
            </div>
          </section>

          {/*
            ★ コンテンツ一覧セクション
          */}
          <section className="contents-section">
            <h2 className="section-title" style={{ marginTop: '40px' }}>
              コンテンツ一覧
            </h2>
            <div className="thumbnail-grid">
              {thumbnails.map((thumb) => {
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
           以下は、クリック可能なリンクがすべて含まれた、世界最高峰の動的フッターです。
           ※フッターの各セクションは、縦幅が均一かつコンパクトに表示されるように調整済みです。
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
            <div className="footer-column">
              <h4>Career / Works</h4>
              <ul>
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
            </div>
            <div className="footer-column">
              <h4>Tech &amp; Social</h4>
              <ul>
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
            </div>
            <div className="footer-column">
              <h4>Payments &amp; Shop</h4>
              <ul>
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
                    href="https://www.amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Amazon JP
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Amazon US
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Open Music / BGM</h4>
              <ul>
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
          </div>

          <div className="footer-extra-links">
            <a href="#">For Media</a>
            <a href="#">Privacy Policy</a>
            <a href="#">No FEAR Act</a>
            <a href="#">Budget &amp; Annual Reports</a>
            <a href="#">Contact</a>
            <a href="#">Accessibility</a>
          </div>

          <p className="footer-update">
            Page Last Updated: Jan 31, 2025 | Page Editor: 日下真旗 (Masaki Kusaka) | Responsible Official: MKYUKI
          </p>
          <p className="footer-personal">
            146-0085 東京都大田区久が原2-28-25 シェアハウス203号室 | E-mail: <a href="mailto:masaki136928@gmail.com">masaki136928@gmail.com</a>
          </p>
          <p className="footer-disclaimer">
            本サイトの内容は「クリエイティブ・コモンズ1.0（CC0）」で完全公開しています。<br />
            誰でも自由に利用・改変・再配布が可能です。詳細は利用規約をご確認ください.
          </p>
          <div className="footer-portfolio-links">
            <p>ポートフォリオ、世界でも屈指のwebサイト:</p>
            <ul>
              <li>
                <a href="https://oo-5qvtc.ondigitalocean.app/" target="_blank" rel="noreferrer">
                  https://oo-5qvtc.ondigitalocean.app/
                </a>
              </li>
              <li>
                <a href="http://0xxxxxxxxxxxxx.com/" target="_blank" rel="noreferrer">
                  http://0xxxxxxxxxxxxx.com/
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=jY1bGUaxv2Q&list=PLjbFG4Jyrt2-3ZVKb2Y31ud4iLXcVKE9B"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube (AI LLM BGM EDM)
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
              <li>
                <a href="https://huggingface.co/pricing" target="_blank" rel="noreferrer">
                  HuggingFace
                </a>
              </li>
              <li>
                <a href="https://github.com/MKYUKI" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@MK_AGI" target="_blank" rel="noreferrer">
                  YouTube (@MK_AGI)
                </a>
              </li>
              <li>
                <a href="https://x.com/MK_ASI0" target="_blank" rel="noreferrer">
                  X (旧Twitter)
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.paypal.com/paypalme/MasakiKusaka" target="_blank" rel="noreferrer">
                  PayPal
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amazon JP
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amazon US
                </a>
              </li>
            </ul>
          </div>
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
        /* 下部背景アニメーション */
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
        /* コンテンツサムネイルグリッド：横5×縦10 */
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
        /* Dynamic Blue Button for Documents Download */
        .dynamic-blue-button {
          background: linear-gradient(45deg, #0033cc, #3366ff);
          border: 2px solid #0033cc;
          color: #fff;
          padding: 12px 16px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
          margin: 10px;
          width: 100%;
          max-width: 250px;
        }
        .dynamic-blue-button:hover {
          transform: scale(1.05);
        }
        .dynamic-blue-button::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0,69,255,0.4) 0%, rgba(0,69,255,0) 70%);
          animation: pulseBlue 2s infinite;
        }
        @keyframes pulseBlue {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.8);
            opacity: 1;
          }
        }
        /* Footer Styles */
        .kusaka-nasa-style-footer {
          background-color: #000;
          color: #fff;
          padding: 20px 20px; /* reduced vertical padding for a compact look */
          text-align: left;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: flex-start;
          justify-content: space-between;
        }
        .footer-title {
          font-size: 1.4rem;
          margin: 0 0 5px 0;
        }
        .footer-subtitle {
          font-size: 0.95rem;
          color: #ccc;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        .footer-description {
          font-size: 0.85rem;
          color: #ccc;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }
        .footer-links-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 10px 0;
          flex: 1;
          min-width: 200px;
        }
        .footer-column {
          flex: 1;
          min-width: 150px;
        }
        .footer-column h4 {
          margin: 0 0 5px 0;
          font-size: 1rem;
          color: #fff;
        }
        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-column li {
          margin-bottom: 3px;
        }
        .footer-column a {
          color: #aaa;
          text-decoration: none;
          font-size: 0.85rem;
        }
        .footer-column a:hover {
          text-decoration: underline;
        }
        .footer-extra-links {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-extra-links a {
          color: #aaa;
          text-decoration: none;
          font-size: 0.8rem;
        }
        .footer-extra-links a:hover {
          text-decoration: underline;
        }
        .footer-update {
          font-size: 0.8rem;
          color: #999;
          margin: 5px 0;
        }
        .footer-personal {
          font-size: 0.85rem;
          color: #aaa;
          margin: 5px 0;
        }
        .footer-personal a {
          text-decoration: underline;
          color: #bbb;
        }
        .footer-disclaimer {
          font-size: 0.8rem;
          color: #888;
          line-height: 1.2;
          margin: 5px 0;
        }
        .footer-portfolio-links {
          margin-top: 10px;
        }
        .footer-portfolio-links p {
          margin: 0 0 5px 0;
          font-size: 0.85rem;
        }
        .footer-portfolio-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .footer-portfolio-links li {
          margin-bottom: 0;
        }
        .footer-portfolio-links a {
          color: #aaa;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .footer-portfolio-links a:hover {
          text-decoration: underline;
        }
        /* Responsive adjustments for the footer */
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .footer-links-section {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
