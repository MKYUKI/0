// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Perfect Clone)</title>
      </Head>

      <main className="page1-main-container">
        {/* Hero: chatgpt.com そっくり */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">お手伝いできることはありますか？</h1>
            <h2 className="hero-subtitle">
              参考文献: <strong><a href="https://chatgpt.com" target="_blank" rel="noreferrer">chatgpt.com</a></strong>
            </h2>
            <p className="hero-description">
              この画面では、上部メニューやページスクロール、右上ユーザ発言・左下GPT回答など
              <strong>chatgpt.com</strong>と同等の機能を再現しています。<br/>
              テキストやWord/PDF/画像などをアップロードすれば、リアルタイムにGPT-4回答が得られます。
            </p>
          </div>
        </section>

        {/* Info */}
        <section className="public-section">
          <h2>世界最高峰のGPT-4を無料開放</h2>
          <p>
            PC/スマホ両対応。長いスクロールでも履歴を保持し、
            <strong>chatgpt.com</strong>同様に多数の回答を連続表示できます。
          </p>
        </section>

        {/* チャットUI placeholder(実際はフッター固定) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              下部の固定チャット欄を利用して、何でも入力して下さい。
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
