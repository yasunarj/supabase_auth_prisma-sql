"use client";
import { FormEvent, useActionState, useEffect } from "react";
import { deletePost } from "./action";
import { useRouter } from "next/navigation";

const DeleteButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(deletePost, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if(!confirm("削除しますか？")) {
      e.preventDefault();
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input type="hidden" name="postId" value={postId} />
      <button type="submit" className="text-red-700 text-xl">
        削除
      </button>
    </form>
  );
};

export default DeleteButton;
