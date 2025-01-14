// pages/page5.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page5 (Social Impact & Charity)</title>
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="page5-container">
        <canvas id="deepblue-star-canvas" className="page5-canvas"></canvas>

        <section className="page5-content">
          <h2>Empower the World Through Action</h2>
          <p>
            Connect with global or local initiatives. Let 0 guide you to maximize
            your contributions and transform lives.
          </p>
          <button className="donate-button">Explore Donation Opportunities</button>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
