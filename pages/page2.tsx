import Head from 'next/head';

export default function Page2() {
  return (
    <>
      <Head>
        <title>Page2</title>
        <link rel="stylesheet" href="/css/kaleido2.css" />
        <script src="/js/page2Logic.js" defer />
      </Head>
      <main>
        <h1>Page2 Title</h1>
        <p>Content from old HTML, now in TSX.</p>
      </main>
    </>
  );
}
