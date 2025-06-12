"use server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { updateSchema } from "./updeteSchema";

export const updatePost = async (formData: z.infer<typeof updateSchema>) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return { success: false, message: "ログインしていません" };
  }

  const authId = data.user.id;

  const user = await prisma.user.findUnique({
    where: { authId },
  });
  const post = await prisma.post.findUnique({
    where: { id: formData.id },
  });

  if (!user || !post || user.id !== post.userId) {
    return { success: false, message: "更新できませんでした" };
  }

  try {
    await prisma.post.update({
      where: {
        id: formData.id,
      },
      data: {
        title: formData.title,
        content: formData.content || "",
      },
    });
  } catch (e) {
    console.error(e);
    return { success: false, message: "更新できませんでした" };
  }

  return { success: true };
};
