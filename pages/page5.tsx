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
        <title>0 - Page5 | Philanthropy & Society</title>
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="page5-philanthropy-container">
        <canvas id="deepblue-star-canvas" className="page5-canvas"></canvas>

        <section className="philanthropy-content">
          <h2>Philanthropy Portal</h2>
          <p>
            Support global causes, donate to various campaigns.
            Real-time synergy ensures transparency & maximum impact.
          </p>
          <button className="donate-btn">Donate Now</button>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
