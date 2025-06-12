"use server";

import { z } from "zod";
import { postSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "../lib/prisma";

export const createPost = async (formData: z.infer<typeof postSchema>) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return { success: false, message: "ログインしていません" };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      authId: data.user.id,
    },
  });

  if(!dbUser) {
    return { success: false, message: "ユーザーが存在しません" }
  }

  try {
    await prisma.post.create({
      data: {
        title: formData.title,
        content: formData.content || "",
        userId: dbUser.id,
      },
    });

    return { success: true }
  } catch (e) {
    console.error(e);
    return { success: false, message: "投稿できませんでした" };
  }
};
