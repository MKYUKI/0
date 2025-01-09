import Head from 'next/head';

export default function Page3() {
  return (
    <>
      <Head>
        <title>Page3</title>
        <link rel="stylesheet" href="/css/kaleido3.css" />
        {/* JSもしあれば */}
        {/* <script src="/js/page3Logic.js" defer /> */}
      </Head>
      <main>
        <h1>Page3 Title</h1>
        <div>Content from old page3.html here</div>
      </main>
    </>
  );
}
