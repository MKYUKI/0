// pages/page6.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
//import '../public/css/page6.css'

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page6 (Cosmic Vision Finale)</title>
        <link rel="stylesheet" href="/css/page6.css" />
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="page6-container">
        <div className="cosmic-overlay"></div>
        <section className="page6-content">
          <h2>Finale: Galactic Evolution & Beyond</h2>
          <p>
            Enter the cosmic horizon where 0 unites all life forms, forging
            a shared future among the stars. A new era of civilization dawns.
          </p>
          <div className="final-links">
            <a href="/">Return Home</a>
            <a
              href="https://arxiv.org/abs/2106.01345"
              target="_blank"
              rel="noreferrer"
            >
              Scaling Laws
            </a>
          </div>
        </section>
        <ReferencesDropdown />
      </main>
    </>
  )
}
