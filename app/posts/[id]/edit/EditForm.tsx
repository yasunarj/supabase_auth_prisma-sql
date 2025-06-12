"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema } from "./updeteSchema";
import { z } from "zod";
import { updatePost } from "./action";
import { useState } from "react";

interface EditPostProps {
  post: {
    id: string;
    title: string;
    content: string | null;
  };
}

const EditForm = ({ post }: EditPostProps) => {
  const [ error, setError ] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      id: post.id,
      title: post.title,
      content: post.content || "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof updateSchema>) => {
    const result = await updatePost(formData);

    if (!result.success) {
      setError(result.message ?? "不明なエラーが発生しました" as const)
      return
    }
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto px-3 py-2 flex flex-col gap-4 mt-20"
    >
      <div className="flex">
        <Input type="hidden" {...register("id")} value={post.id} />
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
        <Button type="submit">修正する</Button>
      </div>
      { error && <div className="text-center text-red-700">{error}</div> }
    </form>
  );
};

export default EditForm;
