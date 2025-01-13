// pages/page5.tsx
import React from 'react'
import Head from 'next/head'
import '../public/css/kaleido5.css'

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page5 | DeepBlue Starfield? White + BlackStars</title>
        <link rel="stylesheet" href="/css/kaleido5.css"/>
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="kaleidoMain5">
        <canvas id="starCanvas5" className="starCanvas5"></canvas>

        <section className="frontContent5">
          <h2>Latent Diffusion meets BlackStar Universe</h2>
          <p>
            3D starfield illusions drifting in black-white synergy,
            referencing <strong>Latent Diffusion Models</strong>.
          </p>
        </section>
      </main>
    </>
  )
}
