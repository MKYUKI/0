// pages/page6.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page6 (Cosmic Vision Finale)</title>
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="page6-container">
        <div className="cosmic-overlay"></div>

        <section className="page6-content">
          <h2>Finale: Galactic Expansion & Unified Future</h2>
          <p>
            Merge civilizations into a single cosmic tapestry, forging
            the next era of synergy among the stars.
          </p>
          <div className="final-links">
            <a href="/">Return Home</a>
            <a href="https://arxiv.org/abs/2106.01345" target="_blank" rel="noreferrer">
              Scaling Laws
            </a>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
