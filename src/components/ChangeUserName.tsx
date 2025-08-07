"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

const UserName = () => {
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [now, setNow] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      // ① ログイン中のユーザー情報を取得
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMessage(
          "ユーザー情報の取得に失敗しました。再度ログインしてください。"
        );
        return;
      }
      const { data: profile, error: selectError } = await supabase
        .from("users")
        .select("display_name")
        .eq("id", user.id)
        .single();

      if (selectError) {
        setErrorMessage("ユーザー設定の読み込みに失敗しました。");
        return;
      }

      const UserName = profile?.display_name || "";
      setNow(UserName);
    })();
  }, [supabase]);

  const handleSave = async () => {
    setErrorMessage("");

    // ① ログイン中ユーザーをもう一度取得（念のため）
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage(
        "ユーザー情報の取得に失敗しました。再度ログインしてください。"
      );
      return;
    }

    // ② users テーブルの display_name を更新
    const { error: updateError } = await supabase
      .from("users")
      .update({ display_name: inputValue })
      .eq("id", user.id);

    if (updateError) {
      setErrorMessage(
        `ユーザーネームの更新に失敗しました: ${updateError.message}`
      );
      return;
    }

    // ③ 保存に成功したら画面表示を更新
    setNow(inputValue);
    setInputValue("");
  };
  return (
    <div className="space-y-1">
      <Label htmlFor="displayName">UserName (now : {now || "未設定"})</Label>
      <div className="flex justify-between items-center">
        <Input
          id="displayName"
          placeholder='Default : "anonymous"'
          className="w-fit"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="outline"
          size="sm"
          className="hover:cursor-pointer"
          onClick={handleSave}
          type="button"
        >
          Save
        </Button>
      </div>
      {errorMessage && (
        <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default UserName;
