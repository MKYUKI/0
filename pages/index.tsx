// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Clone, Extra Large Chat)</title>
      </Head>

      <main className="page1-main-container">
        {/* ヒーロー */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">お手伝いできることはありますか？</h1>
            <h2 className="hero-subtitle">
              (Reference: <strong>chatgpt.com</strong>)
            </h2>
            <p className="hero-description">
              ユーザのコメントは画面右上、アシスタント回答は左下から表示されます。
              ファイル(Word, PDF, 画像 etc.)もアップロード可能です。
            </p>
          </div>
        </section>

        {/* Info */}
        <section className="public-section">
          <h2>Universal GPT-4 Access</h2>
          <p>
            We offer unstoppable synergy with GPT-4 to all cosmic beings. Free, open, and
            harnessing illusions of quantum lines.
          </p>
        </section>

        {/* UI placeholder */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              (The real chat bar is pinned at the bottom - just like chatgpt.com!)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
