import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【6】フィナーレ：虹色のフィルター</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido6.css" />
        {/* 6ページ目JS → public/js/page6Logic.js */}
        <script src="/js/page6Logic.js" defer />
      </Head>

      <header className="globalHeader">
        <h1>第6ページ：虹色シャワーのフィナーレ</h1>
      </header>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>フィナーレ：虹色の祝福</h2>
          <p>全ての存在が調和し、最高峰に到達した瞬間です。</p>
          <nav>
            <a href="/">最初に戻る</a>
          </nav>
        </section>
      </main>

      <footer className="globalFooter">
        <p>
          <a href="/page5">← 戻る</a>
        </p>
        <p>©2023 Legendary Website</p>
      </footer>
    </>
  );
}
