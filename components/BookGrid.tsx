// File: components/BookGrid.tsx
import Link from 'next/link';
import React from 'react';

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

export default function BookGrid() {
  // ダミーデータ：1から36までの書籍
  const books: Book[] = Array.from({ length: 36 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `書籍 ${i + 1}`,
    imageUrl: '/images/placeholder-book.jpg', // ここを実際の画像URLに差し替え
    link: `/books/${i + 1}`
  }));

  return (
    <div className="book-grid">
      <h2 className="grid-title">書籍一覧</h2>
      <div className="grid-container">
        {books.map((book) => (
          <Link key={book.id} href={book.link}>
            <a className="grid-item">
              <img src={book.imageUrl} alt={book.title} className="grid-image" />
              <div className="grid-title-text">{book.title}</div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .book-grid {
          margin-top: 40px;
        }
        .grid-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .grid-item {
          position: relative;
          background: #000;
          border-radius: 4px;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          transition: transform 0.3s;
        }
        .grid-item:hover {
          transform: scale(1.03);
        }
        .grid-item::before {
          content: "";
          display: block;
          padding-top: 56.25%; /* 16:9 アスペクト比 */
        }
        .grid-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .grid-title-text {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.6);
          padding: 4px;
          font-size: 0.9rem;
          box-sizing: border-box;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .grid-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
