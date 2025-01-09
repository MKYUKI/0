// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* ここで "public/js/" に移したアニメ用JSを読み込み */}
        <script src="/js/waveAnim.js" defer />
        <script src="/js/starsAnim.js" defer />
        <script src="/js/page4Logic.js" defer />
        <script src="/js/page5Logic.js" defer />
        {/* もともとあった page2.html / page3.html / page6.html の中で使われている JSがあれば同様に */}
      </Head>

      <nav style={{ padding: '1rem', background: '#eee' }}>
        <a href="/">Home (Page1)</a> |{" "}
        <a href="/page2">Page2</a> |{" "}
        <a href="/page3">Page3</a> |{" "}
        <a href="/page4">Page4</a> |{" "}
        <a href="/page5">Page5</a> |{" "}
        <a href="/page6">Page6</a>
      </nav>

      <Component {...pageProps} />
    </>
  );
}
