"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const [ error, setError ] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (e) {
      console.log(e);
      setError(true)
    }
  };

  return (
    <div className="text-center mt-8">
      <div>
        <Button variant="outline" onClick={handleLogout} className="hover:cursor-pointer">
          ログアウト
        </Button>
      </div>
      {error && <div className="text-red-700 text-center">ログアウトできませんでした</div>}
    </div>
  );
};

export default LogoutButton;
