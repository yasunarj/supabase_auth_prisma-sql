"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    
    router.push("/loading");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto mt-20"
    >
      <h2 className="text-center text-4xl">Login</h2>
      <div className="flex">
        <Label htmlFor="email" className="w-[30%]">
          メールアドレス
        </Label>
        <Input
          type="email"
          {...register("email")}
          id="email"
          placeholder="メールアドレス"
          required
        />
        {errors.email && (
          <div className="text-center text-red-700-">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="flex">
        <Label htmlFor="password" className="w-[30%]">
          パスワード
        </Label>
        <Input
          type="password"
          {...register("password")}
          id="password"
          placeholder="パスワード"
          required
        />
        {errors.password && (
          <div className="text-center text-red-700">
            {errors.password.message}
          </div>
        )}
      </div>
      <div className="text-right">
        <Button type="submit">ログイン</Button>
      </div>
    </form>
  );
};

export default LoginPage;
