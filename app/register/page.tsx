"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { registerAction } from "./action";

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerAction, { error: "" });

  return (
    <form action={formAction} className="space-y-4 max-w-lg mx-auto mt-20">
      <h2 className="text-4xl text-center">SignUp</h2>
      <div className="flex">
        <Label htmlFor="name" className="w-[30%]">
          ユーザー名
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="ユーザー名"
          required
        />
      </div>
      <div className="flex">
        <Label htmlFor="email" className="w-[30%]">
          メールアドレス
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="メールアドレス"
          required
        />
      </div>
      <div className="flex">
        <Label htmlFor="password" className="w-[30%]">
          パスワード
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="パスワード"
          required
        />
      </div>
      <div className="text-right">
        <Button type="submit">登録する</Button>
      </div>
      {state?.error && <div className="text-red-700">{state.error}</div>}
    </form>
  );
};

export default RegisterPage;
