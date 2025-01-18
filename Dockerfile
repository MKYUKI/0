FROM node:18-alpine AS builder

WORKDIR /app

# 1) OpenSSL
RUN apk add --no-cache openssl

# 2) .envファイルをコピー(あるいは build-arg で設定)
COPY .env .env

# 3) MONGODB_URI が必要なら Dockerfile内でENV指定 or docker-composeで設定
# ENV MONGODB_URI="mongodb+srv://..."

# 4) 依存関係インストール
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# 5) 残りのソースコピー
COPY . .

# 6) Prisma
RUN pnpm prisma db push
RUN pnpm prisma generate

# 7) Next build
RUN pnpm build

FROM node:18-alpine as runner
WORKDIR /app

# repeat: install openssl if needed
RUN apk add --no-cache openssl

# copy build artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env .env

EXPOSE 3000
CMD ["pnpm", "start"]
