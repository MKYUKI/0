# Dockerfile for Next.js + TypeScript + Prisma + pnpm
# using node:18-alpine as an example

###########################
# 1) Build Stage
###########################
FROM node:18-alpine AS builder

# 例: ロケール等設定したい場合
# RUN apk add --no-cache libc6-compat

WORKDIR /app

# 1-1. グローバルに pnpm をインストール
RUN npm install -g pnpm

# 1-2. package.json & lockファイルをコピーして依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 1-3. 残りのソースをコピー
COPY . .

# 1-4. Prisma schema (optional step)
RUN npx prisma generate
RUN npx prisma db push

# 1-5. Next.js build
RUN pnpm run build

###########################
# 2) Production Stage
###########################
FROM node:18-alpine AS runner

WORKDIR /app

# 2-1. 再度 pnpm を入れる
RUN npm install -g pnpm

# 2-2. node_modules, .next, package.json をコピー
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma  # Prisma migrationなどに応じて

# .envなど必要に応じてコピー
# COPY --from=builder /app/.env ./  (もし本番環境で使うなら)

# 2-3. ポートExpose
EXPOSE 3000

# 2-4. 実行コマンド
CMD ["pnpm", "start"]
