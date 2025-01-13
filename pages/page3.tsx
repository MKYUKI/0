// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import ReferencesDropdown from '../components/ReferencesDropdown'
import '../public/css/page3.css'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | 2017 Transformer + PurpleLightning</title>
        <link rel="stylesheet" href="/css/page3.css"/>
      </Head>

      <main className="page3-container">
        <div className="attention-ring-bg"></div>

        <section className="page3-content">
          <h2>PurpleLightning + 2017 Transformer</h2>
          <p>
            Real-time synergy with Q-K-V arcs, referencing
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              [Attention Is All You Need, 2017]
            </a>
          </p>
        </section>

        <ReferencesDropdown />
      </main>
    </>
  )
}
