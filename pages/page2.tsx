// pages/page2.tsx
import Head from 'next/head';

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page2 - Quantum Water Layers</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido2.css" />
        <script src="/js/page2Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap2">
          <svg viewBox="0 0 200 200" className="kaleido2Svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#cceeff" />
                <stop offset="100%" stopColor="#aaf4ff" />
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
          <h2>Quantum Water Layers</h2>
          <p>
            Intertwining <em>multi-head attention</em> with fluid wave simulations from{' '}
            <a href="https://arxiv.org/abs/2006.10729" target="_blank" rel="noreferrer">
              advanced hydrodynamics
            </a>
            . Observe layered transforms in real-time.
          </p>
          <nav>
            <a href="/page3">⇒ Page3</a>
          </nav>
        </section>
      </main>
    </>
  );
}
