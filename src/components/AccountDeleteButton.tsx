"use client";

import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export default function AccountDeleteButton() {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage(
        "ユーザー情報の取得に失敗しました。再度ログインしてください。"
      );
      setIsDeleting(false);
      return;
    }

    // プロファイルテーブル削除（必要なら）
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("id", user.id);

    if (deleteError) {
      setError(true);
      setErrorMessage("アカウントの削除に失敗しました。");
      setIsDeleting(false);
      return;
    }

    const res = await fetch("/api/accounts/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(true);
      setErrorMessage(body.error || "認証ユーザーの削除に失敗しました。");
      setIsDeleting(false);
      return;
    }

    // 認証ユーザー削除はサーバーサイド API 経由で行う想定
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          disabled={isDeleting}
          hidden={error}
        >
          {isDeleting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Deleting...
            </>
          ) : (
            "Delete Account"
          )}
        </Button>
      </AlertDialogTrigger>

      {errorMessage && (
        <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
