// pages/page5.tsx
import Head from 'next/head'

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page5 | DeepBlue Starfield + Latent Diffusion</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido5.css" />
        <script src="/js/page5Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="starCanvas" className="starCanvas"></canvas>
        <section className="frontContent5">
          <h2>Latent Diffusion in a Starry Depth</h2>
          <p>Random starfields swirl, referencing advanced diffusion architectures.</p>
          <nav>
            <a href="/page6">Final Page &raquo;</a>
          </nav>
        </section>
      </main>
    </>
  )
}
