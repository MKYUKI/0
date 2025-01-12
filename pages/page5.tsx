// pages/page5.tsx
import Head from 'next/head'

export default function Page5(){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page5 | DeepBlue Diffusion</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido5.css"/>
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <canvas id="starCanvas" className="starCanvas"></canvas>
        <section className="frontContent5">
          <h2>DeepBlue Starfield + Diffusion Models</h2>
          <p>
            Page5: Leveraging 
            <a href="https://github.com/CompVis/latent-diffusion" target="_blank" rel="noreferrer">
              latent diffusion
            </a> for cosmic star generation in real-time.
          </p>
          <nav>
            <a href="/page6">⇒ Page6 (Final)</a>
          </nav>
        </section>
      </main>
    </>
  )
}
