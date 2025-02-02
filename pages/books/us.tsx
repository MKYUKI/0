// File: pages/books-us.tsx
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// アメリカ向け書籍一覧: 6×6=36冊
// 画像クリック -> amazon.com Kindleページ
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Head from 'next/head';
import React from 'react';

export default function BooksUS() {
  const US_BOOKS = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    title: `US Book #${i + 1}`,
    imageUrl: '/images/book2.jpg',
    amazonUrl: 'https://www.amazon.com/kindle-dbs/hz/bookshelf'
  }));

  return (
    <>
      <Head>
        <title>Kindle US向け (6×6)</title>
        <meta
          name="description"
          content="US向け書籍一覧(36冊)。画像クリックでamazon.comへ"
        />
        <meta charSet="UTF-8" />
      </Head>

      <main style={{
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          US向けKindle一覧 (6×6=36)
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '10px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {US_BOOKS.map((b) => (
            <div
              key={b.id}
              style={{
                position: 'relative',
                background: '#111',
                borderRadius: '6px',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onClick={() => {
                window.open(b.amazonUrl, '_blank');
              }}
            >
              {/* 16:9 */}
              <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <p style={{ padding: '5px', fontSize: '0.9rem' }}>{b.title}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
