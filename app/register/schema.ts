import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
  username: z.string().min(2, { message: "ユーザー名を入力してください" }),
});
