// pages/index.tsx
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>【1】幻想的な白背景トップ</title>
        {/* 全ページ共通のCSSでもいいが、旧 kaleidoBase.css と kaleido1.css を読み込む */}
        <link rel="stylesheet" href="/css/kaleidoBase.css" />
        <link rel="stylesheet" href="/css/kaleido1.css" />
        {/* 必要なら <script src="/js/page1Logic.js" defer /> */}
      </Head>

      <header className="globalHeader">
        <h1>世界最高峰のWebサイトへようこそ</h1>
      </header>

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
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="url(#grad1)"
              className="circleSpin1"
            />
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="none"
              stroke="#ffcccc"
              strokeWidth="4"
              className="circleSpin2"
            />
            <path
              d="M100,20 L140,60 L100,100 L60,60 Z"
              fill="#fff"
              fillOpacity="0.5"
              className="pathSpin1"
            />
          </svg>
        </div>

        <section className="frontContent1">
          <h2>第1ページ：白背景の優美な万華鏡</h2>
          <p>ゆったりと回転する淡いピンク色の世界です。</p>
          <nav>
            <a href="/page2">⇒ 次のページへ</a>
          </nav>
        </section>
      </main>

      <footer className="globalFooter">
        <p>©2023 Legendary Website</p>
      </footer>
    </>
  );
}
