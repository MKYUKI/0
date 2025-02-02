// File: pages/books/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

export interface Book {
  id: string
  title: string
  imageUrl: string
  link: string
}

// 同じ本データ(抜粋)
const books: Book[] = [
  { id: '1', title: '無限への挑戦',     imageUrl: '/images/book1.jpg', link: '/books/1' },
  { id: '2', title: 'AI AGI LLM',       imageUrl: '/images/book2.jpg', link: '/books/2' },
  { id: '3', title: '2027年AGIに向けて', imageUrl: '/images/book3.jpg', link: '/books/3' },
  { id: '4', title: 'Book 4',          imageUrl: '/images/book1.jpg', link: '/books/4' },
  // ...
  { id: '24', title: 'Book 24',        imageUrl: '/images/book3.jpg', link: '/books/24' },
]

// 静的パスを生成
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = books.map((b) => ({ params: { id: b.id } }))
  return { paths, fallback: false }
}

// 指定のidに合致する本を取得
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!
  const book = books.find((b) => b.id === id) || null
  return { props: { book } }
}

interface BookPageProps {
  book: Book
}

export default function BookPage({ book }: BookPageProps) {
  if (!book) return <p>書籍が見つかりませんでした。</p>

  return (
    <>
      <Head>
        <title>{book.title} - 書籍詳細</title>
        <meta
          name="description"
          content={`${book.title}の詳細ページです。`}
        />
        <meta charSet="UTF-8" />
      </Head>

      <main className="book-detail-page">
        <h1>{book.title}</h1>
        <img src={book.imageUrl} alt={book.title} className="book-image" />
        <p>ここに書籍の詳細情報などを自由に記載できます。</p>

        <Link legacyBehavior href="/books">
          <a className="back-button">← 書籍一覧に戻る</a>
        </Link>
      </main>

      <style jsx>{`
        .book-detail-page {
          padding: 20px;
          background: #000;
          color: #fff;
          min-height: 100vh;
          text-align: center;
        }
        .book-image {
          max-width: 400px;
          width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 4px;
        }
        .back-button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #2187ff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .back-button:hover {
          background: #1a6fcc;
        }
      `}</style>
    </>
  )
}
