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
            Brainstorm solutions for humanity’s greatest challenges,
            powered by unstoppable synergy from 0.
          </p>
        </section>

        <section className="collab-section">
          <h2>Submit Your Ideas</h2>
          <div className="collab-form">
            <input type="text" placeholder="Your Name" />
            <textarea placeholder="Describe your proposal..." />
            <button>Submit</button>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
