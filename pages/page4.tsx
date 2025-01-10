import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page4 - Quantum Beige Calm</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />
        <script src="/js/page4Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>柔らかベージュ + Canvasうねり</h2>
          <p>HTML5 Canvas + JSで波が動くベージュ世界</p>
          <nav>
            <a href="/page5">⇒ 5ページ目へ</a>
          </nav>
        </section>
      </main>
    </>
  );
}
