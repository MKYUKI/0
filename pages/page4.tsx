import Head from 'next/head';

export default function Page4() {
  return (
    <>
      <Head>
        <title>Page4</title>
        <link rel="stylesheet" href="/css/kaleido4.css" />
        <script src="/js/page4Logic.js" defer />
      </Head>
      <main>
        <h1>Page4 Title</h1>
        <p>Content from old page4.html, plus animations or logic in page4Logic.js</p>
      </main>
    </>
  );
}
