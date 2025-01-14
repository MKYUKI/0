// pages/page6.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page6.css'

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page6 | The Cosmic Finale</title>
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="page6-finale-container">
        <div className="cosmic-overlay"></div>

        <section className="finale-content">
          <h2>Cosmic Finale: The Apex of Civilization</h2>
          <p>
            Harness the synergy of all pages, forging an eternal platform
            that stands as water to all existence. 
          </p>
          <div className="links-row">
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
