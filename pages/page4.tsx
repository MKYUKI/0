import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page4 | Beige NeRF Calm</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />
        <script src="/js/page4Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>Neural Radiance Fields (NeRF) Canvas</h2>
          <p>
            Inspired by <a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">
            NeRF</a>, we integrate volumetric rendering with wave-based illusions for a soothing,
            yet high-tech, Beige environment.
          </p>
          <nav>
            <a href="/page5">Go to Page5 &raquo;</a>
          </nav>
        </section>
      </main>
    </>
  );
}
