// pages/_document.tsx

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          {/* 必要に応じて<meta>タグ等を追加 */}
          <meta charSet="UTF-8" />
          <meta name="description" content="Cosmic Portal - A journey through the cosmos" />
          <link rel="icon" href="/favicon.ico" />
          {/* タイトルは各ページ側で指定 */}
        </Head>
        <body>
          <Main />{/* 各ページコンポーネントが挿入される */}
          <NextScript />{/* Next.jsのスクリプト挿入 */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
