"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    window.location.reload();
  };

  return (
    <div onClick={logout} className="flex gap-3 items-center justify-center">
      <LogOut />
      LogOut
    </div>
  );
}
