FROM node:18-alpine
WORKDIR /app

# パッケージ類をコピー
COPY package*.json ./

RUN npm install

# ソース全部をコピー (types/含む)
COPY . .

# ローカルと同じ型チェック・ビルドを実行
RUN npm run typecheck
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
