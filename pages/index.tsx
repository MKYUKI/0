// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>ホーム画面</title>
        <meta
          name="description"
          content="幻想的な量子線アニメが広がる歴史的大規模ホーム画面"
        />
        <meta charSet="UTF-8" />
      </Head>

      {/*
        このヒーローセクションに cosmicSim.js (幾何学量子線) を表示
        背景: 白 → 黒線
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

      <div style={{ margin: '20px 0' }}>
        <h3>▼ MKのAmazonKindle作品一覧</h3>
        <ul>
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
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/book1.jpg" alt="Book 1" />
          </a>
          <p>Book Title 1</p>
        </div>
        <div className="book-item">
          <a
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/book2.jpg" alt="Book 2" />
          </a>
          <p>Book Title 2</p>
        </div>
        <div className="book-item">
          <a
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/book3.jpg" alt="Book 3" />
          </a>
          <p>Book Title 3</p>
        </div>
      </div>
    </>
  )
}
