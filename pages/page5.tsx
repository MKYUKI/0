// pages/page5.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page5.css'

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page5 (Global Impact & Philanthropy)</title>
        <link rel="stylesheet" href="/css/page5.css" />
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="page5-container">
        <canvas id="deepblue-star-canvas" className="page5-canvas"></canvas>
        <section className="page5-content">
          <h2>Empower the World Through Action</h2>
          <p>
            Contribute to global solutions, from UN SDGs to local grassroots
            initiatives. Let 0 guide you in maximizing your social impact.
          </p>
          <button className="donate-button">Discover Donation Opportunities</button>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
