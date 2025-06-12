"use server";

import { prisma } from "../lib/prisma";
import { createClient } from "@/lib/supabase/server";

type PrevState = {
  success: boolean;
  message: string;
};

export const deletePost = async (prevState: PrevState, formData: FormData) => {
  const postId = formData.get("postId") as string;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return { success: false, message: "ログインしてください" };
  }

  const authId = data.user.id;

  const user = await prisma.user.findUnique({
    where: { authId },
  });
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!user || !post || post.userId !== user.id) {
    return { success: false, message: "削除権限がありません" };
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    return { success: true, message: "削除しました" }
  } catch (e) {
    console.error(e);
    return { success: false, message: "削除できませんでした" };
  }
};
