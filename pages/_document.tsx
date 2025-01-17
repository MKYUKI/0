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
          {/* <meta>タグなどの追加はここで行う */}
          <meta charSet="UTF-8" />
          <meta name="description" content="宇宙のシミュレーションで歴史に残るホーム画面" />
          <link rel="icon" href="/favicon.ico" />
          {/* ここに <title> を書かずに、index.tsx で <Head> 使う方法もOK */}
        </Head>
        <body>
          <Main />     {/* Next.jsのページコンポーネントがここに注入される */}
          <NextScript /> 
        </body>
      </Html>
    );
  }
}

export default MyDocument;
