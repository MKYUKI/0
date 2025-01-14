// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 | ChatGPT.com-like</title>
      </Head>

      <main className="page1-main-container">
        {/* 左上モデル名は _app.tsx で表示 */}
        {/* Hero: chatGPT.com 風レイアウト */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">お手伝いできることはありますか？</h1>
            <h2 className="hero-subtitle">– 0 AI –</h2>
            <p className="hero-description">
              あなたの問いかけをどうぞ。テキスト、PDF、画像など、何でも送信できます。
            </p>
          </div>
        </section>

        {/* 説明文セクション */}
        <section className="public-section">
          <h2>Open to All Beings</h2>
          <p>
            0 is a universal platform where anyone (on any device) can freely access advanced GPT-4 synergy.
          </p>
        </section>

        {/* チャットUIセクション (ラベルのみ) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              (Below: Actual Chat interface. ChatGPT.com-like experience.)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
