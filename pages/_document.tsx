// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* 例えば Google Fonts や 各種メタタグをここに追加できる */}
        <meta name="description" content="神を超越した世界最高峰のウェブサイト" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
