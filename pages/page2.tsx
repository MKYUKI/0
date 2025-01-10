import Head from 'next/head';

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page2 - Quantum Water</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido2.css" />
        <script src="/js/page2Logic.js" defer></script>
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap2">
          <svg viewBox="0 0 200 200" className="kaleido2Svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0ffff" />
                <stop offset="100%" stopColor="#aafaff" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#grad2)" className="circSpinA" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#66e" strokeWidth="3" className="circSpinB" />
            <path
              d="M70,130 Q100,100 130,130 T70,130"
              fill="#ddffff"
              fillOpacity="0.4"
              className="pathSpin2"
            />
          </svg>
        </div>

        <section className="frontContent2">
          <h2>静かな水色空間</h2>
          <p>穏やかな波紋 + 量子的黒線</p>
          <nav>
            <a href="/page3">⇒ 3ページ目へ</a>
          </nav>
        </section>
      </main>
    </>
  );
}
