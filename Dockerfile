# Dockerfile
FROM node:18-alpine AS base

# 1) OSパッケージ
RUN apk update && apk add --no-cache openssl

# 2) pnpm
RUN npm install -g pnpm

# 3) 作業ディレクトリ
WORKDIR /app

# 4) package.json だけ先にコピー → install
COPY package.json ./
RUN pnpm install

# 5) 全ソースコピー
COPY . ./

# 6) Prisma generate
RUN pnpm prisma generate

# 7) Prisma db push (エラーで止めたくないなら || echo "Ignoring push errors")
RUN pnpm prisma db push || echo "Ignoring push errors"

# 8) Next build
RUN pnpm build

EXPOSE 3000
CMD ["pnpm","start"]
