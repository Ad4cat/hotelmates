"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Check, Globe, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GiJapan } from "react-icons/gi";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

const Language = () => {
  const supabase = createClient();

  const [now, setNow] = useState<string>("");
  const [selectLang, setSelectLang] = useState<string>("");
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
        .select("language")
        .eq("id", user.id)
        .single();

      if (selectError) {
        setErrorMessage("ユーザー設定の読み込みに失敗しました。");
        return;
      }

      const lang = profile?.language || "";
      setNow(lang);
      setSelectLang(lang);
    })();
  }, [supabase]);

  const handleValChange = (val: string) => {
    setSelectLang(val);
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
      .update({ language: selectLang })
      .eq("id", user.id);

    if (updateError) {
      setErrorMessage(`言語の更新に失敗しました: ${updateError.message}`);
      return;
    }

    // ③ 保存に成功したら画面表示を更新
    setNow(selectLang);
    setChanged(true);
  };

  return (
    <div>
      <Label htmlFor="language">
        <Languages className="inline h-4 w-4" />
        Language (now: {now || "未設定"})
      </Label>

      <div className="flex justify-between items-center mt-2">
        <Select
          value={selectLang}
          onValueChange={(val) => handleValChange(val)}
        >
          <SelectTrigger id="language" className="w-fit">
            <SelectValue placeholder="select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="日本語">
              <GiJapan /> 日本語
            </SelectItem>
            <SelectItem value="English">
              <Globe /> English
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

export default Language;
