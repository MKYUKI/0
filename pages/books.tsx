// File: pages/books.tsx

import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export interface Book {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

// 書籍データの配列（必要に応じて追加・編集してください）
const books: Book[] = [
  { id: '1', title: '無限への挑戦', imageUrl: '/images/book1.jpg', link: '/books/1' },
  { id: '2', title: 'AI AGI LLM', imageUrl: '/images/book2.jpg', link: '/books/2' },
  { id: '3', title: '2027年AGIに向けて', imageUrl: '/images/book3.jpg', link: '/books/3' },
  // 追加項目... 24冊分（例として以下をダミーで記載）
  { id: '4', title: 'Book 4', imageUrl: '/images/book1.jpg', link: '/books/4' },
  { id: '5', title: 'Book 5', imageUrl: '/images/book2.jpg', link: '/books/5' },
  { id: '6', title: 'Book 6', imageUrl: '/images/book3.jpg', link: '/books/6' },
  { id: '7', title: 'Book 7', imageUrl: '/images/book1.jpg', link: '/books/7' },
  { id: '8', title: 'Book 8', imageUrl: '/images/book2.jpg', link: '/books/8' },
  { id: '9', title: 'Book 9', imageUrl: '/images/book3.jpg', link: '/books/9' },
  { id: '10', title: 'Book 10', imageUrl: '/images/book1.jpg', link: '/books/10' },
  { id: '11', title: 'Book 11', imageUrl: '/images/book2.jpg', link: '/books/11' },
  { id: '12', title: 'Book 12', imageUrl: '/images/book3.jpg', link: '/books/12' },
  { id: '13', title: 'Book 13', imageUrl: '/images/book1.jpg', link: '/books/13' },
  { id: '14', title: 'Book 14', imageUrl: '/images/book2.jpg', link: '/books/14' },
  { id: '15', title: 'Book 15', imageUrl: '/images/book3.jpg', link: '/books/15' },
  { id: '16', title: 'Book 16', imageUrl: '/images/book1.jpg', link: '/books/16' },
  { id: '17', title: 'Book 17', imageUrl: '/images/book2.jpg', link: '/books/17' },
  { id: '18', title: 'Book 18', imageUrl: '/images/book3.jpg', link: '/books/18' },
  { id: '19', title: 'Book 19', imageUrl: '/images/book1.jpg', link: '/books/19' },
  { id: '20', title: 'Book 20', imageUrl: '/images/book2.jpg', link: '/books/20' },
  { id: '21', title: 'Book 21', imageUrl: '/images/book3.jpg', link: '/books/21' },
  { id: '22', title: 'Book 22', imageUrl: '/images/book1.jpg', link: '/books/22' },
  { id: '23', title: 'Book 23', imageUrl: '/images/book2.jpg', link: '/books/23' },
  { id: '24', title: 'Book 24', imageUrl: '/images/book3.jpg', link: '/books/24' },
];

export default function BooksPage() {
  return (
    <>
      <Head>
        <title>MKのAmazonKindle作品一覧</title>
        <meta
          name="description"
          content="Masaki Kusakaの書籍一覧ページ。各書籍のサムネイルを横4列×縦6行のグリッドで表示。"
        />
        <meta charSet="UTF-8" />
      </Head>

      <main className="books-page">
        <h1 className="page-title">MKのAmazonKindle作品一覧</h1>
        <div className="thumbnail-grid">
          {books.map((book) => (
            <Link key={book.id} href={book.link} className="thumbnail-card">
              <img src={book.imageUrl} alt={book.title} />
              <div className="thumbnail-title">{book.title}</div>
            </Link>
          ))}
        </div>
      </main>

      <style jsx>{`
        .books-page {
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
          grid-template-columns: repeat(4, 1fr);
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
        }
        .thumbnail-card:hover {
          transform: scale(1.03);
        }
        /* 16:9 アスペクト比維持 */
        .thumbnail-card::before {
          content: "";
          display: block;
          padding-top: 56.25%;
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
          margin-top: 4px;
          font-size: 0.9rem;
          color: #fff;
          padding: 4px;
          background: rgba(0, 0, 0, 0.6);
        }
        /* レスポンシブ */
        @media (max-width: 1024px) {
          .thumbnail-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .thumbnail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
