import Head from 'next/head';

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
          <h2>Latent Diffusion in Starry Depths</h2>
          <p>
            Our random starfield draws on <a href="https://github.com/CompVis/latent-diffusion" 
            target="_blank" rel="noreferrer">latent diffusion</a> ideas, swirling cosmic points
            in a quantum-inspired sea.
          </p>
          <nav>
            <a href="/page6">&raquo; Final Page6</a>
          </nav>
        </section>
      </main>
    </>
  );
}
