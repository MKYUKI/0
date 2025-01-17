// pages/index.tsx
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // cosmicSimThreeが読み込まれていればinit
    if (window.cosmicSimThree) {
      window.cosmicSimThree.init('cosmic-canvas');
    }
  }, []);

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

      {/* ヒーローセクション: Three.jsで巨大銀河を表示 */}
      <section className="hero-section">
        <canvas id="cosmic-canvas" className="hero-canvas"></canvas>
      </section>

      {/* 履歴書・職務経歴書ダウンロード */}
      <div className="resume-links">
        <h2>MasakiKusakaの履歴書・職務経歴書</h2>
        <a href="/files/resume.docx" download>履歴書（Word）</a>
        <a href="/files/resume.pdf" download>履歴書（PDF）</a>
        <a href="/files/career.docx" download>職務経歴書（Word）</a>
        <a href="/files/career.pdf" download>職務経歴書（PDF）</a>
      </div>

      {/* 本を3冊並べるセクション */}
      <div className="books-container">
        <div className="book-item">
          <a
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <div className="book-placeholder">Book 1</div>
          </a>
          <p>Book Title 1</p>
        </div>
        <div className="book-item">
          <a
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <div className="book-placeholder">Book 2</div>
          </a>
          <p>Book Title 2</p>
        </div>
        <div className="book-item">
          <a
            href="https://www.amazon.co.jp/dp/XXXXXXXX"
            target="_blank"
            rel="noreferrer"
          >
            <div className="book-placeholder">Book 3</div>
          </a>
          <p>Book Title 3</p>
        </div>
      </div>
    </>
  )
}
