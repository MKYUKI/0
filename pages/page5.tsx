import Head from 'next/head';

export default function Page5() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【5】深青の星屑 × Quantum Starfield</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido5.css" />
        <script src="/js/page5Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <canvas id="starCanvas" className="starCanvas"></canvas>
        <section className="frontContent5">
          <h2>星屑が舞う深い青 + 量子線</h2>
          <p>ランダムな星が漂う神秘世界</p>
          <nav>
            <a href="/page6">⇒ 最後のページへ</a>
          </nav>
        </section>
      </main>
    </>
  );
}
