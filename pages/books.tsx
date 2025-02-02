// File: pages/books.tsx

import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

// ダミーデータ (ジャンルごとに配置するなど)
interface BookCategory {
  title: string;
  items: {
    id: string;
    name: string;
    cover: string; // 画像URL
  }[];
}

const popularManga: BookCategory = {
  title: '人気マンガ特集',
  items: [
    { id: '1', name: '大人気マンガ その1', cover: '/images/book1.jpg' },
    { id: '2', name: '大人気マンガ その2', cover: '/images/book2.jpg' },
    { id: '3', name: '大人気マンガ その3', cover: '/images/book3.jpg' },
    // ...
  ],
};

const recommendedBooks: BookCategory = {
  title: '主婦の友社特集',
  items: [
    { id: '4', name: 'レシピ本', cover: '/images/book1.jpg' },
    { id: '5', name: 'エッセイ', cover: '/images/book2.jpg' },
    { id: '6', name: 'おうち時間 特集', cover: '/images/book3.jpg' },
    // ...
  ],
};

// ...適宜データを増やしていく...

export default function BooksPage() {
  return (
    <>
      <Head>
        <title>Amazon風 Kindleページ</title>
        <meta name="description" content="Amazon Kindleのスクリーンショットに似た、仮想のKindle書籍一覧ページ" />
        <meta charSet="UTF-8" />
      </Head>

      <main className="kindle-page">
        {/* 上部: Amazon風ヘッダー */}
        <header className="amazon-header">
          <div className="amazon-logo">Amazon.co.jp</div>
          <nav className="amazon-nav">
            <a href="/">ホーム</a>
            <a href="/">探す</a>
            <a href="/">書籍</a>
            <a href="/">マンガ</a>
            <a href="/">雑誌</a>
          </nav>
        </header>

        {/* メインビジュアル */}
        <section className="kindle-hero">
          <div className="hero-banner">
            <h2>人気マンガ特集</h2>
            <p>今すぐ読もう</p>
            {/* スライダー風 */}
          </div>
        </section>

        {/* カテゴリ1 */}
        <section className="category-section">
          <h3>{popularManga.title}</h3>
          <div className="books-row">
            {popularManga.items.map((item) => (
              <div key={item.id} className="book-card">
                <img src={item.cover} alt={item.name} />
                <div className="book-title">{item.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* カテゴリ2 */}
        <section className="category-section">
          <h3>{recommendedBooks.title}</h3>
          <div className="books-row">
            {recommendedBooks.items.map((item) => (
              <div key={item.id} className="book-card">
                <img src={item.cover} alt={item.name} />
                <div className="book-title">{item.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* さらにカテゴリー追加 */}
        <section className="category-section">
          <h3>Kindle Unlimited で続きが読める</h3>
          <div className="books-row">
            {/* ... */}
          </div>
        </section>

        {/* Footer */}
        <footer className="amazon-footer">
          <p>© 2023, Amazon風サイト（学習用デモ）</p>
        </footer>
      </main>

      <style jsx>{`
        .kindle-page {
          background-color: #fff;
          color: #000;
          min-height: 100vh;
          font-family: sans-serif;
        }
        .amazon-header {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          background-color: #131a22;
          color: #fff;
        }
        .amazon-logo {
          font-weight: bold;
          margin-right: 20px;
        }
        .amazon-nav a {
          color: #fff;
          margin: 0 10px;
          text-decoration: none;
        }

        .kindle-hero {
          background: #eef;
          padding: 20px;
          text-align: center;
        }
        .hero-banner {
          max-width: 800px;
          margin: 0 auto;
        }

        .category-section {
          padding: 20px;
          border-bottom: 1px solid #ddd;
        }
        .category-section h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .books-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 10px;
        }
        .book-card {
          flex: 0 0 auto;
          width: 120px;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          text-align: center;
        }
        .book-card img {
          width: 100%;
          display: block;
        }
        .book-title {
          padding: 4px;
          font-size: 0.9rem;
        }

        .amazon-footer {
          background: #f3f3f3;
          text-align: center;
          padding: 20px;
          margin-top: 20px;
          color: #666;
        }
      `}</style>
    </>
  );
}
