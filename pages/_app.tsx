// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 全ページ共通のJS (例: waveAnim.js と starsAnim.js) */}
        {/* public/js/waveAnim.js や starsAnim.js がある前提 */}
        <script src="/js/waveAnim.js" defer />
        <script src="/js/starsAnim.js" defer />
      </Head>

      <nav style={{ padding: '1rem', background: '#eee' }}>
        <a href="/">Home(Page1)</a> |{' '}
        <a href="/page2">Page2</a> |{' '}
        <a href="/page3">Page3</a> |{' '}
        <a href="/page4">Page4</a> |{' '}
        <a href="/page5">Page5</a> |{' '}
        <a href="/page6">Page6</a>
      </nav>

      <Component {...pageProps} />
    </>
  );
}
