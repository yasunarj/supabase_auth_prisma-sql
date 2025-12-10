Supabase 復元コマンド

# restore_supabase.sh
# --- Supabase: .backup を新プロジェクトへ復元する最小スクリプト ---
# 使い方:
#   1) 下の「設定エリア」を自分の値に書き換える
#   2) chmod +x restore_supabase.sh
#   3) ./restore_supabase.sh
# ---------------------------------------------------------------

set -euo pipefail

### === 設定エリア（Supabase Studioの「Connect → Connection String → Pooler」からコピペ） ===
# ※ 直ホスト(db.<ref>.supabase.co)が引けない場合は Pooler を使うのが安定
POOLER_HOST='aws-1-ap-northeast-1.pooler.supabase.com'  # ← View parameters の Host
POOLER_PORT='5432'                                      # ← View parameters の Port（例: 6543/5432など）
POOLER_USER='postgres.<project-ref>'                    # ← View parameters の User（例: postgres.abcdef123456）
DB_PASSWORD='****************'                          # ← Database password
BACKUP_PATH="$HOME/Downloads/db_cluster.backup"         # ← ダウンロードした .backup のフルパス（スペース/()はOK）
# --------------------------------------------------------------------------------------------

# psql/pg_restore の場所（Homebrew か EnterpriseDB どちらでも動くように）
PSQL_BIN="$(command -v psql || true)"
[ -z "$PSQL_BIN" ] && PSQL_BIN="/Library/PostgreSQL/16/bin/psql"

PG_RESTORE_BIN="$(command -v pg_restore || true)"
[ -z "$PG_RESTORE_BIN" ] && PG_RESTORE_BIN="/Library/PostgreSQL/16/bin/pg_restore"

# 接続パラメータ組み立て（libpq パラメータ形式）
CONN_PARAMS=( "host=$POOLER_HOST" "port=$POOLER_PORT" "user=$POOLER_USER" "dbname=postgres" "sslmode=require" )

# パスワードは環境変数で渡す（プロンプト回避）
export PGPASSWORD="$DB_PASSWORD"

echo "==> バックアップ存在確認: $BACKUP_PATH"
ls -lh "$BACKUP_PATH" >/dev/null

# 形式判定: custom/tar なら pg_restore、text(SQL) なら psql -f
echo "==> バックアップ形式を判定中..."
if "$PG_RESTORE_BIN" -l "$BACKUP_PATH" >/dev/null 2>&1; then
  DUMP_KIND="custom_or_tar"
else
  DUMP_KIND="text"
fi
echo "    判定: $DUMP_KIND"

# 復元実行
if [ "$DUMP_KIND" = "text" ]; then
  echo "==> psql で SQL を流し込みます（ロール衝突は無視して続行されます）"
  # 厳密に止めたい場合は -v ON_ERROR_STOP=1 を付ける。ただし role anon 等が既存で止まりやすい
  "$PSQL_BIN" "${CONN_PARAMS[@]}" -f "$BACKUP_PATH"
else
  echo "==> pg_restore で復元します"
  # Pooler 宛でも復元できるが、可能なら Session pooler or 直結を推奨
  RESTORE_URI="postgresql://$POOLER_USER:$DB_PASSWORD@$POOLER_HOST:$POOLER_PORT/postgres?sslmode=require"
  "$PG_RESTORE_BIN" --verbose --clean --no-acl --no-owner -d "$RESTORE_URI" "$BACKUP_PATH"
fi

echo "==> 復元後の確認（スキーマ/テーブル 一覧）"
"$PSQL_BIN" "${CONN_PARAMS[@]}" -c '\dn' || true
"$PSQL_BIN" "${CONN_PARAMS[@]}" -c '\dt public.*' || true
"$PSQL_BIN" "${CONN_PARAMS[@]}" -c '\dt auth.*' || true
"$PSQL_BIN" "${CONN_PARAMS[@]}" -c '\dt storage.*' || true

echo "==> 完了！Supabase Studio の Table Editor でも確認してみてください。"

# 後片付け（任意）
# unset PGPASSWORD


chatGpt_URL="https://chatgpt.com/c/68df8f06-836c-8321-9079-b1c3fc4ffadc"411