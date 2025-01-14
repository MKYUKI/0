// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
// ★ （グローバルCSSは _app.tsx で import しているのでここではimportしない）

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Clone, 90% Chat)</title>
      </Head>

      <main className="page1-main-container">
        {/* Hero */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to 0</h1>
            <h2 className="hero-subtitle">Universal Public GPT Access</h2>
            <p className="hero-description">
              Providing unstoppable synergy, illusions, quantum lines — for all beings
              across the cosmos. <br />
              <strong>Ref: chatgpt.com</strong> (参考文献としてこのUIを使用しています)
            </p>
          </div>
        </section>

        {/* Public Info */}
        <section className="public-section">
          <h2>Open to Everyone</h2>
          <p>
            Experience GPT-4 with no barriers. This platform is dedicated to universal 
            freedom and equality, across Earth and beyond.
          </p>
        </section>

        {/* Chat UI (フッター固定になる想定だが一応区切りセクションだけ) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              (Below is an actual AI chat interface powered by 0)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
