// File: pages/0tube.tsx

import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

// サンプル用の動画・コンテンツデータ（後日、実際のコンテンツに差し替え可能）
const dummyContents = Array.from({ length: 21 }).map((_, index) => ({
  id: (index + 1).toString(),
  title: `サンプルコンテンツ ${index + 1}`,
  thumbnail: `/images/thumbnail${(index % 5) + 1}.jpg`
}))

export default function OTube() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // 検索バーの送信処理（例：検索結果ページへ遷移）
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`)
  }

  // サムネイルクリック時：コンテンツ詳細ページへ遷移（仮実装）
  const handleThumbnailClick = (id: string) => {
    router.push(`/content/${id}`)
  }

  return (
    <>
      <Head>
        <title>0Tube - 完璧なYouTubeクローン</title>
        <meta
          name="description"
          content="このページは、公式 YouTube (https://www.youtube.com/) を参考に、動画、Webゲーム、Webアニメーション、Webシミュレーションなど多様なコンテンツを挿入・閲覧できる究極のプラットフォームの基盤を実現しています。"
        />
      </Head>

      <div className="container">
        {/* ヘッダー：ロゴと検索バー */}
        <header className="header">
          <div className="header-content">
            <div className="logo">
              {/* 
                ここで <Link> 内に <a> を使わない形式に修正済み（前回と同じ修正ポイント）
              */}
              <Link href="/0tube">
                <img src="/images/0tube_logo.png" alt="0Tube Logo" />
              </Link>
            </div>

            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">検索</button>
            </form>
          </div>
        </header>

        {/* メインコンテンツ：全画面を使ったサムネイルグリッド */}
        <main className="main-grid">
          {dummyContents.map(content => (
            <div
              key={content.id}
              className="thumbnail-card"
              onClick={() => handleThumbnailClick(content.id)}
            >
              <img
                src={content.thumbnail}
                alt={content.title}
                className="thumbnail-image"
              />
              <div className="thumbnail-info">
                <h3>{content.title}</h3>
                <p>チャンネル名 • 再生回数 • 投稿日</p>
              </div>
            </div>
          ))}
        </main>

        {/* フッター：参考文献の明記 */}
        <footer className="footer">
          <p>
            このサイトのデザイン・機能は、公式 YouTube (
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              https://www.youtube.com/
            </a>
            ) を参考にして制作されています。
          </p>
        </footer>
      </div>

      <style jsx>{`
        /* コンテナ全体 */
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #181818;
          color: #fff;
          font-family: Arial, sans-serif;
        }
        /* ヘッダー */
        .header {
          padding: 10px 20px;
          background-color: #202020;
          display: flex;
          justify-content: center;
        }
        .header-content {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .logo img {
          height: 40px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        /* 検索フォーム */
        .search-form {
          width: 100%;
          max-width: 600px;
          display: flex;
        }
        .search-form input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 2px 0 0 2px;
        }
        .search-form button {
          padding: 10px 16px;
          font-size: 16px;
          border: none;
          background-color: #303030;
          color: #fff;
          border-radius: 0 2px 2px 0;
          cursor: pointer;
        }
        /* メイングリッド */
        .main-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        /* サムネイルカード */
        .thumbnail-card {
          background-color: #202020;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .thumbnail-card:hover {
          transform: scale(1.03);
        }
        .thumbnail-image {
          width: 100%;
          display: block;
        }
        .thumbnail-info {
          padding: 10px;
        }
        .thumbnail-info h3 {
          font-size: 16px;
          margin: 0 0 5px;
        }
        .thumbnail-info p {
          font-size: 14px;
          margin: 0;
          color: #aaa;
        }
        /* フッター */
        .footer {
          padding: 20px;
          background-color: #202020;
          text-align: center;
          font-size: 14px;
          color: #aaa;
        }
        .footer a {
          color: #aaa;
          text-decoration: underline;
        }
        /* レスポンシブ対応 */
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
          .search-form {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}
