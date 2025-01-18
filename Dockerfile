# Dockerfile

# =========== ビルドステージ ===========
FROM node:18-alpine AS builder
WORKDIR /app
RUN apk update && apk add --no-cache openssl

# prisma関連ファイル, package.json, lockファイルをコピー
COPY prisma ./prisma
COPY package.json pnpm-lock.yaml ./

# グローバルにpnpmインストール
RUN npm install -g pnpm

# 依存関係
RUN pnpm install

# ソースコード全体をコピー
COPY . .

# Prismaのクライアント生成 (db pushはしない)
RUN pnpm prisma generate

# Next.jsをビルド
RUN pnpm build

# =========== 実行ステージ ===========
FROM node:18-alpine AS runner
WORKDIR /app
RUN apk update && apk add --no-cache openssl

# runnerステージでpnpmコマンドを使うなら:
RUN npm install -g pnpm

# builderから成果物をコピー
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# ↑ .env はコピーしない (後述)

EXPOSE 3000

# (1) コンテナ起動時に db push したい場合
# CMD ["pnpm", "prisma", "db", "push", "--accept-data-loss", "&&", "pnpm", "start"]

# (2) あるいは db push を別途行うなら、ここでは普通にstartだけ
CMD ["pnpm", "start"]
