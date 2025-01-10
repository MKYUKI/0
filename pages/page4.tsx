import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【4】ベージュの柔動 × Quantum Canvas</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />

        {/* 旧 page4Logic.js */}
        <script src="/js/page4Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>Canvasで描くうねり + 量子幾何背景</h2>
          <p>HTML5 Canvas + JSで波が動くベージュ世界</p>
          <nav>
            <a href="/page5">⇒ 5ページ目へ</a>
          </nav>
        </section>
      </main>
    </>
  );
}
