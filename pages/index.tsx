// pages/index.tsx

import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面</title>
        <meta
          name="description"
          content="宇宙のシミュレーションで歴史に残るホーム画面"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        ヒーローセクション: cosmicSim.js が #cosmic-canvas を操作して
        黒い宇宙をアニメ表示(星・惑星など)
      */}
      <section className="hero-section">
        <canvas id="cosmic-canvas"></canvas>
      </section>

      {/* 履歴書・職務経歴書ダウンロードリンク */}
      <div className="resume-links">
        <p>
          <a href="/docs/MasakiKusaka_Resume.docx" target="_blank" rel="noreferrer">
            public/docs/MasakiKusaka_Resume.docx
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_Resume.pdf" target="_blank" rel="noreferrer">
            public/docs/MasakiKusaka_Resume.pdf
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.docx" target="_blank" rel="noreferrer">
            public/docs/MasakiKusaka_CareerHistory.docx
          </a>
        </p>
        <p>
          <a href="/docs/MasakiKusaka_CareerHistory.pdf" target="_blank" rel="noreferrer">
            public/docs/MasakiKusaka_CareerHistory.pdf
          </a>
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>▼ MKのAmazonKindle作品一覧</h3>
        <ul>
          <li>
            [JP]{' '}
            <a
              href="https://amazon.co.jp/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
              target="_blank"
              rel="noreferrer"
            >
              日下真旗の作品をAmazonで見る
            </a>
          </li>
          <li>
            [US]{' '}
            <a
              href="https://amazon.com/s?i=digital-text&rh=p_27%3AMasaki+Kusaka&s=relevancerank&text=Masaki+Kusaka&ref=dp_byline_sr_ebooks_1"
              target="_blank"
              rel="noreferrer"
            >
              Masaki Kusakaの作品をAmazonで見る
            </a>
          </li>
        </ul>
      </div>

      {/* 本を3冊並べるセクション (例) */}
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
    </>
  )
}
