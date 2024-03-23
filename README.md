### パッケージのインストール

1. pnpm install
2. npx prisma generate

### パッケージの更新

0. npm install -g npm-check-updates (初回のみ)
1. ncu コマンドの実行 （アップデート情報の確認）
2. ncu -u コマンドの実行（package.json の更新）
3. pnpm install コマンドの実行（更新された package.json をもとにパッケージをインストール）

### DB のマイグレーション

1. prisma/schema.prisma を編集する

2. コマンドを実行する

`npx prisma migrate dev --name [マイグレーションする任意の名前]`

3. Prisma Client を再生成する

`npx prisma generate`

### GraphQLの編集(サーバー側)

1. スキーマの編集

`server\graphql\schema.graphql`

2. コードジェネレーターの実行

`pnpm run codegen`

3. リゾルバの定義

以下のフォルダを参照

`server\graphql\resolvers`
