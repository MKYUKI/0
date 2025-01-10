// pages/page4.tsx
import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page4 - Beige Radiance Field</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />
        <script src="/js/page4Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>Beige Radiance Field</h2>
          <p>
            Leveraging{' '}
            <a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">
              NeRF
            </a>{' '}
            concepts, we unify neural volumetric rendering with Transformer-based wave illusions. 
            Dive into calm beige synergy.
          </p>
          <nav>
            <a href="/page5">⇒ Page5</a>
          </nav>
        </section>
      </main>
    </>
  );
}
