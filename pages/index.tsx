// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Clone)</title>
      </Head>

      <main className="page1-main-container">
        {/* ヒーローセクション */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">お手伝いできることはありますか？</h1>
            <h2 className="hero-subtitle">
              (Reference: <strong>chatgpt.com</strong>)
            </h2>
            <p className="hero-description">
              このページは chatgpt.com を参考文献として実装されています。<br/>
              入力内容は右上に、GPT応答は左下から表示。ファイル送信もOKです。
            </p>
          </div>
        </section>

        {/* Public Info */}
        <section className="public-section">
          <h2>Universal GPT-4 Access</h2>
          <p>
            We bring unstoppable synergy of GPT-4 to all cosmic beings. Freed from illusions,
            with advanced quantum lines.
          </p>
        </section>

        {/* Chat placeholder (実際にはフッター固定) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              (Real chat bar is pinned at the bottom. Enjoy!)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
