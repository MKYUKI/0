// pages/index.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page1 (ChatGPT.com Clone, Large Chat)</title>
      </Head>

      <main className="page1-main-container">
        <section className="hero-section-clone">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to 0</h1>
            <h2 className="hero-subtitle">Universal Public GPT Access</h2>
            <p className="hero-description">
              Freed for all cosmic beings, unstoppable synergy, illusions, quantum lines.
            </p>
          </div>
        </section>

        <section className="public-section">
          <h2>Open for Everyone</h2>
          <p>
            No resume downloads here — just chat & synergy. Experience GPT-4
            with a huge chat interface on any device.
          </p>
        </section>

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
