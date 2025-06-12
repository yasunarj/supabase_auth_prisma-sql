import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(8, "パスワードは８文字以上にしてください"),
})