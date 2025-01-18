import Head from 'next/head'
import React from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面 | Masaki Kusaka</title>
        <meta
          name="description"
          content="歴史に残るレベルの大規模宇宙シミュレーションと究極のデザインを備えたホーム画面"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ───────────────────────────────────
         Hero Section
        ───────────────────────────────────
        - 背景に cosmic-canvas を重ね、タイトルやキャッチコピーをオーバーレイ
      */}
      <section className="hero-container">
        <canvas id="cosmic-canvas" className="hero-bg-canvas" />
        <div className="hero-overlay">
          <h1 className="hero-title">Masaki Kusaka</h1>
          <p className="hero-subtitle">
            Beyond Infinity &amp; Intelligence – 最先端を超えて
          </p>
          <p className="hero-desc">
            宇宙規模のビジョンとAI時代を牽引する超越的なアイデアをここから。
          </p>
        </div>
      </section>

      {/*
        ───────────────────────────────────
         Resume / Career Download Section
        ───────────────────────────────────
      */}
      <section className="resume-section">
        <h2 className="section-title">Resume &amp; Career History</h2>
        <p className="section-subtitle">
          ダウンロードしてご覧いただけます
        </p>
        <div className="resume-links-grid">
          <a
            href="/docs/MasakiKusaka_Resume.docx"
            target="_blank"
            rel="noreferrer"
            className="resume-link-card"
          >
            <h3>MasakiKusaka_Resume.docx</h3>
            <p>Word形式</p>
          </a>
          <a
            href="/docs/MasakiKusaka_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-link-card"
          >
            <h3>MasakiKusaka_Resume.pdf</h3>
            <p>PDF形式</p>
          </a>
          <a
            href="/docs/MasakiKusaka_CareerHistory.docx"
            target="_blank"
            rel="noreferrer"
            className="resume-link-card"
          >
            <h3>MasakiKusaka_CareerHistory.docx</h3>
            <p>Word形式</p>
          </a>
          <a
            href="/docs/MasakiKusaka_CareerHistory.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-link-card"
          >
            <h3>MasakiKusaka_CareerHistory.pdf</h3>
            <p>PDF形式</p>
          </a>
        </div>
      </section>

      {/*
        ───────────────────────────────────
         Amazon Kindle Works Section
        ───────────────────────────────────
      */}
      <section className="kindle-works-section">
        <h2 className="section-title">MKのAmazon Kindle作品一覧</h2>
        <p className="section-subtitle">AI・無限への探究・AGIなど</p>

        <div className="amazon-links">
          <div className="amazon-link-card">
            <span className="link-label">[JP]</span>
            <a
              href="https://amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
              target="_blank"
              rel="noreferrer"
            >
              日下真旗の作品をAmazonで見る
            </a>
          </div>
          <div className="amazon-link-card">
            <span className="link-label">[US]</span>
            <a
              href="https://amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
              target="_blank"
              rel="noreferrer"
            >
              Masaki Kusakaの作品をAmazonで見る
            </a>
          </div>
        </div>

        {/*
          書籍3冊を横並びカード風に
        */}
        <div className="books-grid">
          <div className="book-card">
            <a
              href="https://www.amazon.co.jp/dp/B0DK1HV92G"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/book1.jpg"
                alt="無限への挑戦"
                className="book-cover"
              />
            </a>
            <p className="book-title">
              「無限への挑戦：全存在の幸福と自己超越の旅路」
            </p>
          </div>

          <div className="book-card">
            <a
              href="https://www.amazon.co.jp/dp/B0CW1HM6JQ"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/book2.jpg"
                alt="AI AGI LLM"
                className="book-cover"
              />
            </a>
            <p className="book-title">
              「AI AGI LLM：数学・科学・人類知性の超克と宇宙的調和の実現」
            </p>
          </div>

          <div className="book-card">
            <a
              href="https://www.amazon.co.jp/dp/B0D9DWYNMG"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/book3.jpg"
                alt="2027年AGIに向けて"
                className="book-cover"
              />
            </a>
            <p className="book-title">
              「2027年AGIに向けて：知能の限界と共通的目的の欠如からAGIの必要性」
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
