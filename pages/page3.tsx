// pages/page3.tsx
import Head from 'next/head'

export default function Page3() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page3 | Purple Lightning + SparseMoE</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido3.css" />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap3">
          <svg viewBox="0 0 200 200" className="kaleido3Svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad3" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#cc00ff" />
                <stop offset="100%" stopColor="#550066" />
              </radialGradient>
            </defs>
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              fill="url(#grad3)"
              className="rectSpin1"
            />
            <circle
              cx="100"
              cy="100"
              r="35"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              className="circleSpark"
            />
          </svg>
        </div>

        <section className="frontContent3">
          <h2>Purple Lightning: Sparse Gated MoE</h2>
          <p>
            Page3: High-speed MoE lightning bridging quantum states 
            (<a href="https://arxiv.org/abs/1701.06538" target="_blank" rel="noreferrer">
              GShard
            </a>).
          </p>
          <nav>
            <a href="/page4">Go to Page4 &raquo;</a>
          </nav>
        </section>
      </main>
    </>
  )
}
