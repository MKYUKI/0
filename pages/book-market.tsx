// File: pages/book-market.tsx
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

export default function BookMarket() {
  // ダミーデータ：1から36までの書籍
  const books: Book[] = Array.from({ length: 36 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `書籍 ${i + 1}`,
    imageUrl: '/images/placeholder-book.jpg', // 実際の画像に差し替え
    link: `/books/${i + 1}`
  }));

  return (
    <>
      <Head>
        <title>書籍販売・購入ページ</title>
        <meta name="description" content="書籍の販売と購入ができるページです。" />
        <meta charSet="UTF-8" />
      </Head>
      <main className="book-market-page">
        <h1 className="page-title">書籍販売・購入ページ</h1>
        <div className="thumbnail-grid">
          {books.map((book) => (
            <Link key={book.id} href={book.link}>
              <a className="thumbnail-card">
                <img src={book.imageUrl} alt={book.title} />
                <div className="thumbnail-title">{book.title}</div>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <style jsx>{`
        .book-market-page {
          padding: 20px;
          background: #000;
          color: #fff;
          min-height: 100vh;
          text-align: center;
        }
        .page-title {
          margin-bottom: 20px;
          font-size: 2rem;
        }
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin: 0 auto;
          max-width: 1200px;
        }
        .thumbnail-card {
          position: relative;
          background: #000;
          border-radius: 4px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.3s;
          color: #fff;
        }
        .thumbnail-card:hover {
          transform: scale(1.03);
        }
        .thumbnail-card::before {
          content: "";
          display: block;
          padding-top: 56.25%; /* 16:9 */
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
          padding: 4px;
          font-size: 0.9rem;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .thumbnail-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .thumbnail-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
