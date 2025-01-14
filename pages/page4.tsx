// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>0 - Page4 (Quantum & AI Research)</title>
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="page4-container">
        <canvas id="page4-canvas" className="page4-canvas"></canvas>

        <section className="page4-content">
          <h2>Quantum AI Research & Holographic Exploration</h2>
          <p>
            Dive into illusions (NeRF, Transformers, fractals) in real-time. 
            An unstoppable synergy for scientific breakthroughs.
          </p>
          <div className="link-list">
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              Transformer (2017)
            </a>
            <a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">
              NeRF (2020)
            </a>
          </div>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
