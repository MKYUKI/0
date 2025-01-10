// pages/page5.tsx
import Head from 'next/head';

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page5 - DeepBlue Cosmos & Diffusion</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido5.css" />
        <script src="/js/page5Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="starCanvas" className="starCanvas"></canvas>
        <section className="frontContent5">
          <h2>DeepBlue Cosmos & Latent Diffusion</h2>
          <p>
            We fuse cosmic starfields with{' '}
            <a href="https://github.com/CompVis/latent-diffusion" target="_blank" rel="noreferrer">
              latent diffusion
            </a>
            . Explore emergent universes in real time.
          </p>
          <nav>
            <a href="/page6">⇒ Final Page6</a>
          </nav>
        </section>
      </main>
    </>
  );
}
