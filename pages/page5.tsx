import Head from 'next/head';

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【5】深い青の星屑アニメ</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido5.css" />

        {/* 5ページ目JS → public/js/page5Logic.js */}
        <script src="/js/page5Logic.js" defer />
      </Head>

      <header className="globalHeader">
        <h1>第5ページ：ディープブルーに星が舞う</h1>
      </header>

      <main className="kaleidoMain">
        <canvas id="starCanvas" className="starCanvas"></canvas>
        <section className="frontContent5">
          <h2>星屑が舞い散る神秘</h2>
          <p>ランダムな星がしゅわしゅわ動き回る</p>
          <nav>
            <a href="/page6">⇒ 最後のページへ</a>
          </nav>
        </section>
      </main>

      <footer className="globalFooter">
        <p>
          <a href="/page4">← 戻る</a>
        </p>
        <p>©2023 Legendary Website</p>
      </footer>
    </>
  );
}
