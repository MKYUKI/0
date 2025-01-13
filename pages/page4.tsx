// pages/page4.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido4.css'

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page4 | NeRF illusions + 3D synergy</title>
        <link rel="stylesheet" href="/css/kaleido4.css"/>
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="kaleidoMain4">
        <canvas id="canvas4" className="nerfCanvas4"></canvas>

        <section className="frontContent4">
          <h2>Beige + BlackWire NeRF illusions</h2>
          <p>
            A swirling torus wireframe with unstoppable synergy,
            referencing <strong>NeRF-based illusions</strong> + 2017 Transformer.
          </p>
        </section>
      </main>
    </>
  )
}
