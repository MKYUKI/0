// =======================================
// File: pages/index.tsx
// =======================================
import Head from 'next/head'
import React from 'react'
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面 - 上部 & 下部アニメ</title>
        <meta
          name="description"
          content="上部: cosmic-canvas, 下部: galaxyArtSimなど4つを画面最下部まで表示。"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ★ 上部ヒーロー: cosmicSim (cosmic-canvas)
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/*
        ★ 下部(1ページ分以上) => 4つのアニメを背景 => 
           .lower-animations-section { min-height: 100vh }
           中に .animation-bg-wrapper(absolute) + foreground
      */}
      <section className="lower-animations-section">
        {/* 背景4canvasを絶対配置 */}
        <div className="animation-bg-wrapper">
          <canvas id="galaxy-art-canvas"></canvas>
          <canvas id="rotating-galaxies-canvas"></canvas>
          <canvas id="art-stars-canvas"></canvas>
          <canvas id="art-nebula-canvas"></canvas>
        </div>

        {/* 前面コンテンツ */}
        <div className="lower-content-foreground">
          {/* 履歴書・職務経歴書 => 4つのリンクをアニメ付きボタン + download属性 */}
          <div className="resume-links-container">
            <h3 className="section-title">履歴書・職務経歴書</h3>
            <div className="resume-links">
              <a
                href="/docs/MasakiKusaka_Resume.docx"
                download
                className="futuristic-button resume-btn"
              >
                MasakiKusaka_Resume.docx
              </a>
              <a
                href="/docs/MasakiKusaka_Resume.pdf"
                download
                className="futuristic-button resume-btn"
              >
                MasakiKusaka_Resume.pdf
              </a>
              <a
                href="/docs/MasakiKusaka_CareerHistory.docx"
                download
                className="futuristic-button resume-btn"
              >
                MasakiKusaka_CareerHistory.docx
              </a>
              <a
                href="/docs/MasakiKusaka_CareerHistory.pdf"
                download
                className="futuristic-button resume-btn"
              >
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
                  style={{ color: '#fff', textDecoration: 'underline' }}
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
                  style={{ color: '#fff', textDecoration: 'underline' }}
                >
                  Masaki Kusakaの作品をAmazonで見る
                </a>
              </li>
            </ul>
          </div>

          {/* 本3冊 */}
          <div className="books-container">
            <div className="book-item">
              <a
                href="https://www.amazon.com/-/es/Masaki-Kusaka-ebook/dp/B0DK1JZ2T7/ref=sr_1_19?dib=eyJ2IjoiMSJ9.6wiGivCzYJhqrNL3rIETlMOXhQeJiOIQhQPnqWQkpr60WJTf-7Z4_FcwGltxb0S_6zOmJ6GvPugw7ajvz-x08EfyyYgZ54YqjmyiEhxHlBYfIUJsXfs6Ca6Uu0Elo-FzU4zDNMY3dyKetEajNa7SZG73jIRtfL3zI-cWOMIWI79DwvYPVqftXz81d0O2tKoBsOQFUw4wi1RfLJ8btG4xLbvAZ6zoVnJ-6q6x8yt_lik.kurd0_HdR7C2OyL5dJJEOIUMrVYbLPtt2YCjKPGI71E&dib_tag=se&qid=1737330503&refinements=p_27%3AMasaki+Kusaka&s=digital-text&sr=1-19&xpid=W32gpt8Wbq1OW"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book1.jpg" alt="無限への挑戦" />
              </a>
              <p>
                「The Challenge to Infinity: A Journey of Universal Happiness and Self-Transcendence」
              </p>
            </div>
            <div className="book-item">
              <a
                href="https://www.amazon.co.jp/dp/B0CW1HM6JQ"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book2.jpg" alt="AI AGI LLM" />
              </a>
              <p>
                「AI AGI LLM：数学・科学・人類知性の超克と宇宙的調和の実現」
              </p>
            </div>
            <div className="book-item">
              <a
                href="https://www.amazon.co.jp/dp/B0D9DWYNMG"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/book3.jpg" alt="2027年AGIに向けて" />
              </a>
              <p>
                「2027年AGIに向けて：知能の限界と共通的目的の欠如からAGIの必要性」
              </p>
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

          {/* 余白 => 下端まで表示確認 */}
          <div style={{ height: '300px' }} />
        </div>
      </section>

      {/* ▼ 新アニメ4本読み込み => Home限定 */}
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
      {/*
        上部 cosmicSim.js etc. => pages/_app.tsx or
        separate. If needed for cosmic-canvas
      */}
      <Script
        src="/js/cosmicSim.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'startCosmicSim' in window) {
            // @ts-ignore
            window.startCosmicSim()
          }
        }}
      />
    </>
  )
}
