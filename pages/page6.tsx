// pages/page6.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido6.css'

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page6 | Rainbow Finale + Ultra-Transformer</title>
        <link rel="stylesheet" href="/css/kaleido6.css" />
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="kaleidoMain6">
        <div className="blackRainbowOverlay"></div>
        <section className="frontContent6">
          <h2>Finale: Rainbow Blessing on Black Lines</h2>
          <p>
            The ultimate synergy, 2017 Transformer fully integrated with
            multi-dimensional fractal illusions.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="/">Return Home</a>
          </div>
        </section>
      </main>
    </>
  )
}
