// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page4.css'

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page4 | Advanced NeRF illusions + 3D synergy</title>
        <link rel="stylesheet" href="/css/page4.css"/>
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="page4-container">
        <canvas id="page4-canvas" className="page4-canvas"></canvas>

        <section className="page4-content">
          <h2>3D NeRF illusions + 2017 Attention</h2>
          <p>
            A swirling 2D canvas mimicking NeRF illusions, combined with 2017 attention-based synergy.<br/>
            <a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">
              NeRF (2020)
            </a>
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
