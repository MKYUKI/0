// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 
            Dev中の next.js で 'eval' 系が発生する場合があるため、
            'unsafe-eval' を許可して CSPエラーを回避。
            本番では非推奨。
          */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https:;
              connect-src 'self' https:;
              font-src 'self' https:;
              object-src 'none';
              base-uri 'none';
            "
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
