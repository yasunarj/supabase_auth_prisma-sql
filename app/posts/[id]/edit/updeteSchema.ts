import { z } from "zod";

export const updateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "タイトルを入力してください"),
  content: z.string().optional(),
});