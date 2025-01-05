# ---- Dockerfile ----
    FROM node:18-alpine AS base

    # システム更新 & pnpm install
    RUN apk update && apk add --no-cache openssl
    RUN npm install -g pnpm
    
    WORKDIR /app
    
    # 1) package.json だけ先にコピー
    COPY package.json ./
    
    # 2) pnpm install (lockfileなしの場合)
    RUN pnpm install
    
    # 3) ソースコードコピー
    COPY . ./
    
    # 4) prisma db push & prisma generate (本番でDBを同期させたい場合)
    #    ただしMongoが外部なら事前に接続可能にする or skip
    RUN pnpm prisma:db:push
    RUN pnpm prisma:generate
    
    # 5) Next.js build & tsc server build
    RUN pnpm build:custom
    
    # 6) Expose + Start
    EXPOSE 3000
    EXPOSE 3006
    
    CMD ["pnpm", "start:custom"]
    