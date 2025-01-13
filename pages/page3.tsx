// pages/page3.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido3.css'

import ReferencesDropdown from '../components/ReferencesDropdown'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 | 2017 Transformer + BlackRing</title>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <main className="kaleidoMain3">
        <div className="blackRingArea">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`ringArc arc${i}`} />
          ))}
        </div>

        <section className="frontContent3">
          <h2>2017 Attention Transformer Visualization</h2>
          <p>
            Black ring arcs spinning around the center, depicting Q-K-V synergy.  
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              [Attention Is All You Need]
            </a>
          </p>
          <ReferencesDropdown />
        </section>
      </main>
    </>
  )
}
