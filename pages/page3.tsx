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
          <h1>Global Collaboration for the Highest Experience</h1>
          <p>
            Unite all of humanity to share ideas, solve challenges, and reach the next stage
            of civilization, with synergy from 0.
          </p>
        </section>

        <section className="collab-section">
          <h2>Submit Your Global Proposals</h2>
          <div className="collab-form">
            <input type="text" placeholder="Your Name or Group" />
            <textarea placeholder="Describe your challenge or idea..." />
            <button>Submit</button>
          </div>
          <p className="collab-note">
            0 will match you with potential collaborators worldwide.
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
