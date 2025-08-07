import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { Header } from "@/components/Header";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <div className="fixed w-full">
        <Header />
      </div>
      <div className="flex h-svh w-full items-center justify-center gap-2">
        <p>
          Hello <span>{data.user.email}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
