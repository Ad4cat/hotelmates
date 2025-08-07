import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CurrentUserAvatar } from "@/components/current-user-avatar";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import Language from "@/components/ChangeLanguage";
import UserName from "@/components/ChangeUserName";
import AgeGroup from "@/components/ChangeAgeGroup";
import Gender from "@/components/ChangeGender";
import AccountDeleteButton from "@/components/AccountDeleteButton";

export default async function SettingsPage() {
  const supabase = await createClient();
  // LogIn済みかどうか
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/auth/login");
  }
  const email = userData.user.email;

  return (
    <div className="h-screen ">
      <Header />
      <div className="flex justify-center items-center min-h-screen py-12  ">
        <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Settings</h1>
          <Separator className="mb-6" />
          <form className="space-y-6">
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:cursor-pointer"
                >
                  Change
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">*******</span>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm hover:underline"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:cursor-pointer"
                  >
                    Reset
                  </Button>
                </Link>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-1">
              <Language />
            </div>
            <Separator />
            {/* Profile */}

            <h1 className="text-3xl font-semibold m-0 ">Profile</h1>

            <p className="text-sm text-gray-600 mb-4">
              Filling this out now makes it easier when you write a review.
            </p>

            {/* Icon */}
            <div className="flex space-y-1">
              <CurrentUserAvatar />
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <UserName />
            </div>

            {/* age_group */}
            <div className="space-y-2">
              <AgeGroup />
            </div>
            {/* Gender */}
            <Gender />
            <Separator />
            <div className="flex justify-end">
              <AccountDeleteButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
