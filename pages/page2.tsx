// pages/page2.tsx
import Head from 'next/head'

export default function Page2() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page2 | AquaFlow + MoE</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido2.css" />
        {/* If we have page2Logic.js */}
        <script src="/js/page2Logic.js" defer />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap2">
          <svg
            className="kaleido2Svg"
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#88ffff" />
                <stop offset="100%" stopColor="#33eeff" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#grad2)" className="circSpinA" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#33bbcc" strokeWidth="3" className="circSpinB" />
            <path
              d="M70,130 Q100,100 130,130 T70,130"
              fill="#ddffff"
              fillOpacity="0.4"
              className="pathSpin2"
            />
          </svg>
        </div>

        <section className="frontContent2">
          <h2>AquaFlow & Mixture-of-Experts</h2>
          <p>
            Page2: Achieving fluid transformations via 
            <a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noreferrer">
              Mixture-of-Experts
            </a> gating. Real-time synergy with attention.
          </p>
          <nav>
            <a href="/page3">Next: Page3 ⇒</a>
          </nav>
        </section>
      </main>
    </>
  )
}
