// pages/index.tsx
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 - Holographic Transformer Portal</title>
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap1">
          <svg viewBox="0 0 200 200" className="kaleido1Svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fcf4ff" />
                <stop offset="100%" stopColor="#fde0f3" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#grad1)" className="circleSpin1" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#ff99cc" strokeWidth="5" className="circleSpin2" />
            <path
              d="M100,20 L140,60 L100,100 L60,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h2>Holographic Transformer Portal</h2>
          <p>
            Embark on a journey beyond space-time illusions, powered by cutting-edge{' '}
            <strong>Transformer</strong> research (
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">
              Vaswani et al. 2017
            </a>
            ).
          </p>
          <nav>
            <a href="/page2">⇒ Next: Page2</a>
          </nav>
        </section>
      </main>
    </>
  );
}
