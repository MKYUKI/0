import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【4】ベージュの穏やかAnimation</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido4.css" />

        {/* 4ページ目JS → public/js/page4Logic.js */}
        <script src="/js/page4Logic.js" defer />
      </Head>

      <header className="globalHeader">
        <h1>第4ページ：ベージュ背景、柔らかな動き</h1>
      </header>

      <main className="kaleidoMain">
        <canvas id="canvas4" className="canvas4"></canvas>
        <section className="frontContent4">
          <h2>Canvasで描く単純なうねり</h2>
          <p>HTML5 Canvas + JSで少しうねります</p>
          <nav>
            <a href="/page5">⇒ 5ページ目へ</a>
          </nav>
        </section>
      </main>

      <footer className="globalFooter">
        <p>
          <a href="/page3">← 戻る</a>
        </p>
        <p>©2023 Legendary Website</p>
      </footer>
    </>
  );
}
