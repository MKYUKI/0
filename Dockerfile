# Dockerfile

FROM node:18-alpine

# optional: next-auth / prisma などでSSL通信するなら openssl があると便利
RUN apk update && apk add --no-cache openssl

WORKDIR /app

# lockファイルが無い想定なら package.json のみコピー
COPY package.json ./

# pnpmをグローバル導入
RUN npm install -g pnpm

# ここで hoisted or shamefully-hoist を使うことも可能
RUN pnpm install

# 残りのソース一式をコピー
COPY . .

# prisma コマンドが使えるようになっている想定
RUN pnpm prisma db push
RUN pnpm prisma generate

# Next.js + サーバサイドのビルド
RUN pnpm run build:custom

# 3000: Next.js, 3006: get-portで空きがあれば
EXPOSE 3000
EXPOSE 3006

CMD ["pnpm", "run", "start:custom"]
