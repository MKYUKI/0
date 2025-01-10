// pages/page6.tsx
import Head from 'next/head'

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
          <h2>Finale: Rainbow Blessing + Ultra-Transformer</h2>
          <p>All breakthroughs converge: Attentional leaps, MoE, NeRF, Diffusion—historical apex.</p>
          <nav>
            <a href="/">Return Home</a>
          </nav>
        </section>
      </main>
    </>
  )
}
