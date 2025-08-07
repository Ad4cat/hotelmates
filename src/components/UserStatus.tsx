"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Menu from "./menu";

export default function UserStatus() {
  const [isLogIned, setIsLogIned] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      setIsLogIned(!!data.session);
    };
    fetchSession();
  }, []);

  return (
    <div>
      {isLogIned ? (
        <div className="flex items-center hover:cursor-pointer hover:shadow-md rounded-full">
          <Menu />
        </div>
      ) : (
        <Link href="/auth/login">
          <Button
            variant="ghost"
            className="flex items-center hover:cursor-pointer hover:border border-accent-foreground"
          >
            <LogIn />
            Log In
          </Button>
        </Link>
      )}
    </div>
  );
}
