// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Clone, Large Chat for All)</title>
      </Head>

      <main className="page1-main-container">
        {/* Hero */}
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to 0</h1>
            <h2 className="hero-subtitle">Universal Public GPT Access</h2>
            <p className="hero-description">
              Providing unstoppable synergy, illusions, quantum lines — for all beings
              across the cosmos.
            </p>
          </div>
        </section>

        {/* Public Info */}
        <section className="public-section">
          <h2>Open to Everyone</h2>
          <p>
            Experience GPT-4, advanced illusions, and synergy with no barriers. 
            This platform is dedicated to universal freedom and equality.
          </p>
        </section>

        {/* Chat UI */}
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
