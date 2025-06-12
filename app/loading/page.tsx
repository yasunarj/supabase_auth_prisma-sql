"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoadingRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);
  return <p className="text-center mt-20">ログイン中です...</p>
}

export default LoadingRedirect