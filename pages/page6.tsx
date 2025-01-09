// pages/page6.tsx
import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <title>Page6</title>
        {/* 6ページ目用のCSS */}
        <link rel="stylesheet" href="/css/kaleido6.css" />
        {/* 6ページ目用のJS (アニメーション等) */}
        <script src="/js/page6Logic.js" defer />
      </Head>
      <main>
        <h1>Page6 Title</h1>
        <p>Content from old page6.html goes here. You can include any HTML that was in page6.html.</p>
        {/* もし page6.html に <div id="heroBanner"> などがあればここに埋め込む */}
      </main>
    </>
  );
}
