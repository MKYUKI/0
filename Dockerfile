# -----------------------------------------------------------------------------
# Dockerfile
#   - node:18-alpine をベース
#   - builderステージでビルドして、runnerステージで実行
#   - openssl をインストールする箇所は apk update 付きで実行
# -----------------------------------------------------------------------------

# =========== ビルドステージ ===========
FROM node:18-alpine AS builder

# 作業ディレクトリ
WORKDIR /app

# openssl インストール（Prismaクライアント生成などTLSが必要な場合に備える）
RUN apk update && apk add --no-cache openssl

# .env や Prisma スキーマをコピー
COPY .env .env
COPY prisma ./prisma

# package.json & lockファイルをコピーし、依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# ソースコードをすべてコピー
COPY . .

# Prisma データベース初期化 (MongoDB 接続URLが .env の MONGODB_URI にある想定)
RUN pnpm prisma db push
RUN pnpm prisma generate

# Next.js ビルド
RUN pnpm build


# =========== 実行ステージ ===========
FROM node:18-alpine AS runner

WORKDIR /app
# 必要なら runnerステージでも openssl インストール
RUN apk update && apk add --no-cache openssl

# runnerステージで pnpm を使う予定ならインストール
RUN npm install -g pnpm

# builderステージから成果物をコピー
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env

# ポート公開
EXPOSE 3000

# コンテナ起動時のコマンド
CMD ["pnpm", "start"]
