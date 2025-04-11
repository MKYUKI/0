// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Reactの厳格モード (開発モードでの追加チェック)
  swcMinify: true,      // ビルド時のJavaScript圧縮にSWCを使用 (高速化)

  // TypeScriptの設定 (通常はNext.jsが自動で処理)
  typescript: {
    // ビルド時に型エラーがあっても無視する (非推奨: 型エラーは解決すべき)
    // ignoreBuildErrors: false,
  },

  // 画像最適化の設定 (必要に応じて)
  // images: {
  //   domains: ['lh3.googleusercontent.com'], // Googleプロフィール画像など
  // },

  // 環境変数 ( .env ファイルが優先されるため、通常は不要)
  // env: {
  //   CUSTOM_ENV_VAR: process.env.CUSTOM_ENV_VAR,
  // },

  // Webpackの設定をカスタマイズする場合 (通常は不要)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // カスタマイズロジック
  //   return config
  // },

  // publicフォルダ内の静的ファイルへのパス設定 (通常は不要)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : undefined,
  // basePath: '/myapp', // アプリケーションがサブパスで提供される場合
};

module.exports = nextConfig;

// 注意: もしプロジェクトルートに next.config.ts が存在する場合は削除してください。