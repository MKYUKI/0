// pages/page3.tsx
import Head from 'next/head';

export default function Page3(){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <title>Page3 (Quantum Purple Storm)</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css"/>
        <link rel="stylesheet" href="/css/kaleido3.css"/>
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap3">
          <svg viewBox="0 0 200 200" className="kaleido3Svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad3" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#aa00ff"/>
                <stop offset="100%" stopColor="#330066"/>
              </radialGradient>
            </defs>
            <rect x="40" y="40" width="120" height="120" fill="url(#grad3)" className="rectSpin1"/>
            <circle cx="100" cy="100" r="35" fill="none" stroke="#fff" strokeWidth="2" className="circleSpark"/>
          </svg>
        </div>

        <section className="frontContent3">
          <h2>疾走する紫のエネルギー</h2>
          <p>量子嵐が闇を切り裂く!</p>
          <nav>
            <a href="/page4">⇒ 4ページ目へ</a>
          </nav>
        </section>
      </main>
    </>
  );
}
