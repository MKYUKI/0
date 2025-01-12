// pages/page6.tsx
import Head from 'next/head'

export default function Page6(){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page6 | Rainbow Finale & Ultra-Transformer</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido6.css"/>
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>Finale: Rainbow Blessing & Ultra-Transformer</h2>
          <p>
            Page6: Melding quantum fractals with advanced 
            <a href="https://arxiv.org/abs/2106.01345" target="_blank" rel="noreferrer">
              Transformer scaling
            </a>. A historical apex of civilization.
          </p>
          <nav>
            <a href="/">Return to Home</a>
          </nav>
        </section>
      </main>
    </>
  )
}
