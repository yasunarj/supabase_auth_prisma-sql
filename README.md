# Next.js + Supabase + Prisma を使用したアプリ

このプロジェクトはNext.jsとSupabase、Prismaを使用したフルスタックアプリケーションです。
CRUD機能、認証機能、SQLのRPC関数を使用した機能も実装されています。

## 使用技術
- Next.js (App Router)
- Supabase (認証 DB Storage)
- Prisma ORM
- PostgreSQL + SQL関数(rpc)
- Zod (バリデーション)
- Tailwind css
- Shadcn/ui

## 主な機能
- サインアップ / ログイン (Supabase Auth)
- 投稿のCRUD機能 (認証のユーザーのみ)
- SQL関数(rpc)を使用して、投稿の読み書きを効率化
- SupabaseのRLS(Row Level Security)設定によりデータアクセス制限

## セットアップ方法

```bash
git clone https://github.com/yasunarj/supabase_auth_prisma-sql.git
cd  supabase_auth_prisma_app
npm install
npm run dev
```

## CI/CDについて

このプロジェクトでは、以下の自動化を GitHub Actions を用いて実現しています:

- Lintチェック(`npm run lint`)
- ユニットテスト(Jestによる `npm test`)
- 本番ビルド検証(`npm run build`)

上記が全て成功した場合のみ、自動的に Vercel にデプロイされます。

CI/CD フローは `.github/workflows/ci.yml` に定義されています。