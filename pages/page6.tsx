import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【6】虹色フィナーレ × Quantum Finale</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido6.css" />
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>フィナーレ：虹色の祝福と量子的黒線</h2>
          <p>全ての存在が調和し、最高峰へ到達する瞬間</p>
          <nav>
            <a href="/">最初に戻る</a>
          </nav>
        </section>
      </main>
    </>
  );
}
