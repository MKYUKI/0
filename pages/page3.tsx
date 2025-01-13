// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page3.css'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page3 (Global Collaboration)</title>
        <link rel="stylesheet" href="/css/page3.css" />
      </Head>

      <main className="page3-container">
        <section className="global-collab-hero">
          <div className="collab-overlay"></div>
          <h1>Global Collaboration Arena</h1>
          <p>
            Join forces with the entire planet. Brainstorm solutions for
            humanity’s greatest challenges, backed by 0’s unstoppable AI synergy.
          </p>
        </section>

        <section className="collab-section">
          <h2>Submit Your Ideas</h2>
          <div className="collab-form">
            <input type="text" placeholder="Your Name or Group" />
            <textarea placeholder="Describe your proposal or challenge..."></textarea>
            <button>Submit</button>
          </div>
          <p className="collab-note">
            All submissions will be analyzed by 0 to find potential collaborators and solutions worldwide.
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
