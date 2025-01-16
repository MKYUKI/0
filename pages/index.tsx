// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (Supreme GPT-4 Portal)</title>
      </Head>

      <main className="page1-main-container">
        {/* ヒーローセクション */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">お手伝いできることはありますか？</h1>
            <h2 className="hero-subtitle">What can I help you with?</h2>
            
            <p className="hero-description">
              このページは <strong>chatgpt.com</strong> と同等の機能を目指し、<br/>
              GPT-4 の性能を最大限に引き出すために設計されています。<br/>
              ファイル送信を含むあらゆる質問に、右上の入力から応答可能です。<br/>
              Let us pioneer a new era of unstoppable synergy and quantum illusions 
              for all of civilization.
            </p>
          </div>
        </section>

        {/* 情報セクション */}
        <section className="public-section">
          <h2>Civilization's Most Advanced GPT-4 Portal</h2>
          <p>
            We are dedicated to creating a universal platform 
            that transcends boundaries and evolves with every interaction— 
            a platform that future generations will remember as 
            the apex of human technological synergy.
          </p>
        </section>

        {/* Chat placeholder (本来はフッター固定チャット) */}
        <section className="chat-ui-section">
          <div className="chat-ui-wrapper">
            <p className="chat-ui-note">
              (Our real chat bar is pinned at the bottom, always ready to assist!)
            </p>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
