import { prisma } from "../lib/prisma";

export const getPost = async (postId: string) => {
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: true,
    },
  });

  return post;
};
