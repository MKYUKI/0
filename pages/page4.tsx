// pages/page4.tsx
import Head from 'next/head'

export default function Page4(){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page4 | Beige NeRF Canvas</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido4.css"/>
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>NeRF on Beige Canvas</h2>
          <p>
            Page4: Neural Radiance Fields (
            <a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">NeRF</a>)
            volumetric illusions in a calm beige domain.
          </p>
          <nav>
            <a href="/page5">Next: Page5 ⇒</a>
          </nav>
        </section>
      </main>
    </>
  )
}
