// ===========================================
// File: pages/index.tsx  (Homeページ)
// ===========================================
import Head from 'next/head'
import React from 'react'
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面 - 宇宙史上最大・最先端のシミュレーション</title>
        <meta
          name="description"
          content="上部は既存アニメ、下部は新アニメで壮大な銀河背景を実現。"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/* ★ 上部ヒーローセクション(既存アニメ) ★ */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/*
        ★ 中部～下部:
          新アニメ4種を背景にする => .home-mid-lower-animations
          内に 4つのcanvasを絶対配置 + 履歴書/Kindle/本/Followなどを前面に配置
      */}
      <div className="home-mid-lower-animations">
        {/* ========== 背景4つのcanvas ========== */}
        <canvas id="galaxy-art-canvas"></canvas>
        <canvas id="rotating-galaxies-canvas"></canvas>
        <canvas id="art-stars-canvas"></canvas>
        <canvas id="art-nebula-canvas"></canvas>

        {/* ========== 前面コンテンツ ========== */}
        <div className="home-mid-lower-content">
          {/* 履歴書・職務経歴書ダウンロードリンク */}
          <div className="resume-links-container">
            <h3 className="section-title">履歴書・職務経歴書</h3>
            <div className="resume-links">
              <a href="/docs/MasakiKusaka_Resume.docx" target="_blank" rel="noreferrer">
                MasakiKusaka_Resume.docx
              </a>
              <a href="/docs/MasakiKusaka_Resume.pdf" target="_blank" rel="noreferrer">
                MasakiKusaka_Resume.pdf
              </a>
              <a href="/docs/MasakiKusaka_CareerHistory.docx" target="_blank" rel="noreferrer">
                MasakiKusaka_CareerHistory.docx
              </a>
              <a href="/docs/MasakiKusaka_CareerHistory.pdf" target="_blank" rel="noreferrer">
                MasakiKusaka_CareerHistory.pdf
              </a>
            </div>
          </div>

          {/* Kindle作品一覧 */}
          <div className="kindle-section">
            <h3 className="section-title">▼ MKのAmazonKindle作品一覧</h3>
            <ul className="kindle-list">
              <li>
                [JP]{' '}
                <a
                  href="https://amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
                  target="_blank"
                  rel="noreferrer"
                >
                  日下真旗の作品をAmazonで見る
                </a>
              </li>
              <li>
                [US]{' '}
                <a
                  href="https://amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
                  target="_blank"
                  rel="noreferrer"
                >
                  Masaki Kusakaの作品をAmazonで見る
                </a>
              </li>
            </ul>
          </div>

          {/* 本を3冊並べるセクション */}
          <div className="books-container">
            <div className="book-item">
              <a
                href="https://www.amazon.co.jp/dp/B0DK1HV92G"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book1.jpg" alt="無限への挑戦" />
              </a>
              <p>「無限への挑戦：全存在の幸福と自己超越の旅路」</p>
            </div>
            <div className="book-item">
              <a
                href="https://www.amazon.co.jp/dp/B0CW1HM6JQ"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book2.jpg" alt="AI AGI LLM" />
              </a>
              <p>「AI AGI LLM：数学・科学・人類知性の超克と宇宙的調和の実現」</p>
            </div>
            <div className="book-item">
              <a
                href="https://www.amazon.co.jp/dp/B0D9DWYNMG"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book3.jpg" alt="2027年AGIに向けて" />
              </a>
              <p>「2027年AGIに向けて：知能の限界と共通的目的の欠如からAGIの必要性」</p>
            </div>
          </div>

          {/* Follow / Contact */}
          <div className="social-buttons-container">
            <h3 className="section-title">Follow / Contact</h3>
            <div className="social-buttons">
              <a
                href="https://x.com/MK_ASI1"
                target="_blank"
                rel="noreferrer"
                className="futuristic-button x-button"
              >
                <span>X (旧Twitter)</span>
              </a>
              <a
                href="https://github.com/MKYUKI"
                target="_blank"
                rel="noreferrer"
                className="futuristic-button github-button"
              >
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ▼ 新アニメ4本のスクリプトをHomeページ限定で読み込み */}
      <Script
        src="/js/galaxyArtSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startGalaxyArtSim' in window) {
            // @ts-ignore
            window.startGalaxyArtSim()
          }
        }}
      />
      <Script
        src="/js/rotatingGalaxies.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startRotatingGalaxies' in window) {
            // @ts-ignore
            window.startRotatingGalaxies()
          }
        }}
      />
      <Script
        src="/js/artStars.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtStars' in window) {
            // @ts-ignore
            window.startArtStars()
          }
        }}
      />
      <Script
        src="/js/artNeula.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startArtNebula' in window) {
            // @ts-ignore
            window.startArtNebula()
          }
        }}
      />
    </>
  )
}
