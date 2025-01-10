// pages/page6.tsx
import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page6 - Rainbow Finale & Hyper-Transformers</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido6.css" />
        <script src="/js/page6Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>Rainbow Finale & Hyper-Transformers</h2>
          <p>
            Uniting all breakthroughs—Attentional leaps, MoE, Radiance Fields, Diffusion—into a 
            <strong> singular apex platform</strong>. 
            The future converges now.
          </p>
          <nav>
            <a href="/">Return to Page1</a>
          </nav>
        </section>
      </main>
    </>
  );
}
