import Head from 'next/head';

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【2】淡い水色万華鏡</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido2.css" />

        {/* JS: page2Logic.js を読み込む */}
        <script src="/js/page2Logic.js" defer />
      </Head>

      <header className="globalHeader">
        <h1>第2ページ：水色の静寂な万華鏡</h1>
      </header>

      <main className="kaleidoMain">
        <div className="svgWrap2">
          <svg
            viewBox="0 0 200 200"
            className="kaleido2Svg"
            preserveAspectRatio="xMidYMid slice"
          >
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
          <p>穏やかな波紋を感じてください</p>
          <nav>
            <a href="/page3">⇒ 3ページ目へ</a>
          </nav>
        </section>
      </main>

      <footer className="globalFooter">
        <p>
          <a href="/">← 戻る</a>
        </p>
        <p>©2023 Legendary Website</p>
      </footer>
    </>
  );
}
