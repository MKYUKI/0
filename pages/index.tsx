import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Page1 | Neural-Quantum Platform</title>
        {/*
          * Apply kaleidoBase + kaleido1 for the swirling fractal effect.
          * The textual content references "Attention Is All You Need".
        */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
      </Head>

      <main className="kaleidoMain">
        <div className="svgWrap1">
          <svg
            viewBox="0 0 200 200"
            className="kaleido1Svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff0f0" />
                <stop offset="100%" stopColor="#ffddee" />
              </radialGradient>
            </defs>
            {/* Outer big circle */}
            <circle 
              cx="100"
              cy="100"
              r="80"
              fill="url(#grad1)"
              className="circleSpin1"
            />
            {/* Inner ring */}
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="none"
              stroke="#ffcccc"
              strokeWidth="4"
              className="circleSpin2"
            />
            {/* Some swirl path */}
            <path
              d="M100,20 L140,60 L100,100 L60,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h2 style={{ fontSize: '1.8rem' }}>Neural-Quantum: Transformer Evolution</h2>
          <p>
            This platform integrates cutting-edge Transformer architecture (“Attention Is All You Need,” 
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer"> arXiv:1706.03762</a>)
            with fractal-inspired 3D illusions. Experience the future.
          </p>
          <nav>
            <a href="/page2">Go to Page2 &raquo;</a>
          </nav>
        </section>
      </main>
    </>
  );
}
