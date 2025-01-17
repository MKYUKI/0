# Dockerfile for Next.js + TS + Prisma + MongoDB
# Using node:18-alpine as minimal base
# ==============================================

# 1) ビルド用ステージ
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
# (または yarn.lock / package-lock.json)

# Install pnpm & dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy rest of the source
COPY . .

# Build
RUN pnpm run build

# 2) 本番用ステージ
FROM node:18-alpine AS runner
WORKDIR /app

# Copy node_modules & dist from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Production ENV
ENV NODE_ENV production
# もし .env.production 等を利用する場合 COPY or ENV指定する

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
