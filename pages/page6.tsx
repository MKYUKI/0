import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page6 | Rainbow Finale & Ultra-Transformer</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido6.css" />
        <script src="/js/page6Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>Finale: Rainbow Blessing & Ultra-Transformer</h2>
          <p>
            Melding all breakthroughs—Attentional leaps, MoE, NeRF, and Diffusion—into a 
            <strong> historical apex platform</strong>. The future converges here.
          </p>
          <nav>
            <a href="/">Return Home</a>
          </nav>
        </section>
      </main>
    </>
  );
}
