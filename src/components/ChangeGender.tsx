"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import {
  Check,
  CircleDashed,
  HelpCircle,
  Mars,
  MinusCircle,
  Venus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

const Gender = () => {
  const supabase = createClient();

  const [now, setNow] = useState<string>("");
  const [selectGender, setSelectGender] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false);

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

      // ② プロフィール（users テーブル）の language を取得
      const { data: profile, error: selectError } = await supabase
        .from("users")
        .select("gender")
        .eq("id", user.id)
        .single();

      if (selectError) {
        setErrorMessage("ユーザー設定の読み込みに失敗しました。");
        return;
      }

      const gender = profile?.gender ?? "";
      setNow(gender);
      setSelectGender(gender);
    })();
  }, [supabase]);

  const handleValChange = (val: string) => {
    setSelectGender(val);
    setChanged(false);
  };

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

    // ② users テーブルの language を更新
    const { error: updateError } = await supabase
      .from("users")
      .update({ gender: selectGender })
      .eq("id", user.id);

    if (updateError) {
      setErrorMessage(`言語の更新に失敗しました: ${updateError.message}`);
      return;
    }

    // ③ 保存に成功したら画面表示を更新
    setNow(selectGender);
    setChanged(true);
  };

  return (
    <div className="space-y-1">
      <Label>Gender (now : {now})</Label>
      <div className="flex justify-between items-center">
        <Select value={selectGender} onValueChange={handleValChange}>
          <SelectTrigger id="Gender" className="w-fit">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male" className="flex">
              <Mars className="inline mr-1 h-4 w-4" />
              Male
            </SelectItem>
            <SelectItem value="female" className="flex">
              <Venus className="inline mr-1 h-4 w-4" />
              Female
            </SelectItem>
            <SelectItem value="non_binary" className="flex">
              <CircleDashed className="inline mr-1 h-4 w-4" />
              Non-binary
            </SelectItem>
            <SelectItem value="other" className="flex">
              <HelpCircle className="inline mr-1 h-4 w-4" />
              Other
            </SelectItem>
            <SelectItem value="unspecified">
              <MinusCircle className="inline mr-1 h-4 w-4" />
              Prefer not to say
            </SelectItem>
          </SelectContent>
        </Select>

        {!changed ? (
          <Button
            variant="outline"
            size="sm"
            className="hover:cursor-pointer"
            onClick={handleSave}
            type="button"
          >
            Save
          </Button>
        ) : (
          <div className="flex">
            <Button variant="outline" size="sm" type="button" disabled>
              <Check className="text-green-500" />
              Changed
            </Button>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default Gender;
