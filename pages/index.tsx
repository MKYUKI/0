import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Page1 (Home)</title>
        {/* CSS読み込み */}
        <link rel="stylesheet" href="/css/kaleido1.css" />
        {/* JS (必要なら)
        <script src="/js/page1Logic.js" defer /> */}
      </Head>
      <main>
        <h1>Page1 (Home)</h1>
        <p>This is the home page.</p>
      </main>
    </>
  );
}
