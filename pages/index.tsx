// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (Public ChatGPT.com Clone)</title>
      </Head>

      <main className="page1-main-container">
        {/* ヒーローセクション */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to 0</h1>
            <h2 className="hero-subtitle">Universal Public GPT Access</h2>
            <p className="hero-description">
              Enjoy unstoppable synergy with GPT-4, advanced illusions,
              and black quantum lines.
            </p>
          </div>
        </section>

        {/* Public Info */}
        <section className="public-section">
          <h2>Open to All Beings</h2>
          <p>
            0 is a universal platform where anyone, from any corner of the cosmos,
            can freely access AI assistance and knowledge.
          </p>
        </section>

        {/* Chat UIセクション (と注釈) */}
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
