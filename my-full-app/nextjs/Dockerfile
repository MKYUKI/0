FROM node:18-alpine AS base
WORKDIR /app

# package.json / lockファイル があるならコピー
COPY package*.json ./
RUN npm install

# ソースコードコピー (pages, components, stylesなど)
COPY . .

# ビルド
RUN npm run build

# 本番実行
EXPOSE 3000
CMD ["npm", "start"]
