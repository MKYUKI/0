// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page3 (Global Collaboration)</title>
      </Head>

      <main className="page3-container">
        <section className="global-collab-hero">
          <div className="collab-overlay"></div>
          <h1>Global Collaboration Arena</h1>
          <p>
            Unite the entire planet. Brainstorm solutions, 
            with unstoppable synergy from 0.
          </p>
        </section>

        <section className="collab-section">
          <h2>Submit Your Ideas</h2>
          <div className="collab-form">
            <input type="text" placeholder="Your Name or Group" />
            <textarea placeholder="Your proposal or challenge..." />
            <button>Submit</button>
          </div>
          <p className="collab-note">
            0 will analyze and suggest potential collaborators worldwide.
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
