// pages/index.tsx
import Head from 'next/head'
import React from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面 - 宇宙史上最大・最先端のシミュレーション</title>
        <meta
          name="description"
          content="最初は無数の銀河で始まり、最後も終わらず巨大ブラックホールへ…超スローで上部だけに展開"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        .hero-section: height 600px (or 80vh).
        cosmicSim.js / quantum3D.js / starsAnim.js / waveAnim.js
        はこの上部領域内にだけ描画される想定
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/* 履歴書など */}
      <div className="resume-links" style={{ marginTop: '40px' }}>
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" target="_blank" rel="noreferrer">
            MasakiKusaka_Resume.docx
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_Resume.pdf" target="_blank" rel="noreferrer">
            MasakiKusaka_Resume.pdf
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.docx" target="_blank" rel="noreferrer">
            MasakiKusaka_CareerHistory.docx
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.pdf" target="_blank" rel="noreferrer">
            MasakiKusaka_CareerHistory.pdf
          </a>
        </p>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>▼ MKのAmazonKindle作品一覧</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            [JP]{' '}
            <a
              href="https://amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0066cc', textDecoration: 'underline' }}
            >
              日下真旗の作品をAmazonで見る
            </a>
          </li>
          <li style={{ margin: '10px 0' }}>
            [US]{' '}
            <a
              href="https://amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0066cc', textDecoration: 'underline' }}
            >
              Masaki Kusakaの作品をAmazonで見る
            </a>
          </li>
        </ul>
      </div>

      {/* 本を3冊 - 横並び同じ高さ */}
      <div className="books-container" style={{ marginTop: '40px' }}>
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
    </>
  )
}
