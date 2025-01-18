# =========== ビルドステージ ===========
FROM node:18-alpine AS builder
WORKDIR /app

# 必要に応じてopenssl
RUN apk update && apk add --no-cache openssl

# prismaフォルダ, package.json, lockファイルをコピー
COPY prisma ./prisma
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

# ソースコードをコピー
COPY . .

# Prisma db push & generate (環境変数は「ビルド時」に必須なら build-arg などで渡す)
RUN pnpm prisma db push
RUN pnpm prisma generate

# Next.js ビルド
RUN pnpm build


# =========== 実行ステージ ===========
FROM node:18-alpine AS runner
WORKDIR /app
RUN apk update && apk add --no-cache openssl

# runnerでもpnpmコマンドを使いたいなら:
RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# EXPOSE 3000 など
EXPOSE 3000

CMD ["pnpm", "start"]
