// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | Quantum-Transformer Apex</title>
        {/* kaleidoBase + kaleido1 => Overhauled pink swirl */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap1">
          <svg
            className="kaleido1Svg"
            viewBox="0 0 220 220"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff99ff" />
                <stop offset="100%" stopColor="#ff33cc" />
              </radialGradient>
            </defs>
            <circle
              cx="110" cy="110" r="80"
              fill="url(#grad1)"
              className="circleSpin1"
            />
            <circle
              cx="110" cy="110" r="50"
              fill="none"
              stroke="#ffccff"
              strokeWidth="4"
              className="circleSpin2"
            />
            <path
              d="M110,20 L150,60 L110,100 L70,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h2>Quantum-Transformer Apex</h2>
          <p>
            Page1: Merging fractal illusions with multi-head self-attention. 
            See <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
            “Attention Is All You Need”</a> for the foundation of Transformers.
          </p>
          <nav>
            <a href="/page2">⇒ Go to Page2</a>
          </nav>
        </section>
      </main>
    </>
  )
}
