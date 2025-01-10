// pages/page4.tsx
import Head from 'next/head'

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page4 | Beige Neural Fields</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />
        <script src="/js/page4Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>Neural Radiance Fields (NeRF) + Beige Harmony</h2>
          <p>
            Page4: Rendering volumetric illusions 
            (<a href="https://arxiv.org/abs/2003.08934" target="_blank" rel="noreferrer">NeRF</a>)
            on a subtle beige background.
          </p>
          <nav>
            <a href="/page5">Next: Page5 &raquo;</a>
          </nav>
        </section>
      </main>
    </>
  )
}
