// pages/page6.tsx
import Head from 'next/head';

export default function Page6() {
  return (
    <>
      <Head>
        <title>Page6</title>
        {/* 1) CSSを読み込む: /css/kaleido6.css (publicディレクトリに配置) */}
        <link rel="stylesheet" href="/css/kaleido6.css" />
        {/* 2) JSを読み込む: /js/page6Logic.js (publicディレクトリに配置) */}
        <script src="/js/page6Logic.js" defer />
      </Head>
      <main>
        <h1>Page6 Title</h1>
        <p>
          ここに旧 <code>page6.html</code> の本体HTMLを移植してください。<br />
          例えば <code>&lt;div id="banner"&gt;...&lt;/div&gt;</code> とかあれば入れましょう。
        </p>
      </main>
    </>
  );
}
