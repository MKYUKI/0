// pages/page6.tsx
import Head from 'next/head';

export default function Page6(){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page6 (Quantum Finale)</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido6.css"/>
        <script src="/js/page6Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <div className="rainbowOverlay"></div>
        <section className="frontContent6">
          <h2>フィナーレ：虹色の祝福 + 量子線</h2>
          <p>全てが融合し歴史的大作プラットフォームの頂点へ…</p>
          <nav>
            <a href="/">最初に戻る</a>
          </nav>
        </section>
      </main>
    </>
  );
}
