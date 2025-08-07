import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { Header } from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login");
  }

  const { data: acData, error: acError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (acError) {
    console.log(acError);
  }

  const name = acData?.display_name || "";
  const created = acData?.created_at || "";
  return (
    <div>
      <Header />
      <div className="rounded-2xl border m-5 p-5">
        <div className="p-10 bg-card rounded-2xl">
          <div className="flex items-center space-x-3 text-3xl pb-2">
            <CurrentUserAvatar />
            <span>{name}</span>
          </div>
          <div>
            <span className="text-gray-500 text-sm">
              Joined : {created.split("T")[0]}
            </span>
          </div>
        </div>
        <Separator />
        {/* review */}
        <div className="m-5 ">
          <ReviewCard user={user.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
