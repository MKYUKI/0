// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'


export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page3 | Global Quantum Network</title>
        <link rel="stylesheet" href="/css/page3.css" />
      </Head>

      <main className="page3-container">
        <section className="quantum-geodesic-hero">
          <h1>Global Quantum Network</h1>
          <p>
            Connect minds globally, weaving a knowledge tapestry that
            transcends boundaries.
          </p>
        </section>

        <section className="qnet-section">
          <h2>Participate in the QNET Forum</h2>
          <p>
            Share breakthroughs, propose quantum research, or gather collaborators
            for advanced civilization projects.
          </p>
          <button>Join Forum</button>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
