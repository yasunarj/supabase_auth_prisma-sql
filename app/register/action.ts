"use server";

import { registerSchema } from "./schema";
import { prisma } from "../lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { ZodFormattedError } from "zod/v4";
import { redirect } from "next/navigation";

type RegisterResult = {
  error?: string;
  success?: boolean;
  issues?: ZodFormattedError<
    {
      email: string;
      password: string;
      username: string;
    },
    string
  >;
};

export const registerAction = async (
  prevState: RegisterResult | null,
  formData: FormData
): Promise<RegisterResult> => {
  const parsed = registerSchema.safeParse({
    username: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success)
    return { error: "入力に誤りがあります", issues: parsed.error.format() };

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (!data.user || error) {
    return { error: "登録できませんでした" };
  }

  try {
    await prisma.user.create({
      data: {
        authId: data.user.id,
        username: parsed.data.username,
      },
    });
  } catch (e) {
    console.error(e);
    return { error: "ユーザー登録に失敗しました" };
  }

  redirect("/dashboard");
};
