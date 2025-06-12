"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { postSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { createPost } from "./action";

const NewPostPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postSchema) });


  const onSubmit = async (data: z.infer<typeof postSchema>) => {
      const result = await createPost(data);
    if(result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto px-3 py-2 flex flex-col gap-4 mt-20"
    >
      <div className="flex">
        <Label htmlFor="title" className="w-[30%]">
          タイトル
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title")}
          placeholder="タイトル"
          required
        />
        {errors.title && (
          <div className="text-red-700">{errors.title.message}</div>
        )}
      </div>
      <div className="flex">
        <Label htmlFor="content" className="w-[30%]">
          内容
        </Label>
        <Textarea id="content" {...register("content")} placeholder="内容" />
      </div>
      <div className="text-right">
        <Button type="submit">投稿する</Button>
      </div>
    </form>
  );
};

export default NewPostPage;
