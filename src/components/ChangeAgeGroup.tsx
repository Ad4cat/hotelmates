"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

const AgeGroup = () => {
  const supabase = createClient();

  const [now, setNow] = useState<string>("");
  const [selectAgeGroup, setSelectAgeGroup] = useState<string>("");
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
        .select("age_group")
        .eq("id", user.id)
        .single();

      if (selectError) {
        setErrorMessage("ユーザー設定の読み込みに失敗しました。");
        return;
      }

      const agegroup = profile?.age_group ?? "";
      setNow(agegroup);
      setSelectAgeGroup(agegroup);
    })();
  }, [supabase]);

  const handleValChange = (val: string) => {
    setSelectAgeGroup(val);
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
      .update({ age_group: selectAgeGroup })
      .eq("id", user.id);

    if (updateError) {
      setErrorMessage(`言語の更新に失敗しました: ${updateError.message}`);
      return;
    }

    // ③ 保存に成功したら画面表示を更新
    setNow(selectAgeGroup);
    setChanged(true);
  };

  return (
    <div className="space-y-1">
      <Label>Age Group (now : {now})</Label>
      <div className="flex justify-between items-center">
        <Select value={selectAgeGroup} onValueChange={handleValChange}>
          <SelectTrigger id="age_group" className="w-fit">
            <SelectValue placeholder="Select AgeGroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">Not specified</SelectItem>
            <SelectItem value="< 19">&lt; 19</SelectItem>
            <SelectItem value="20-29">20-29</SelectItem>
            <SelectItem value="30-39">30-39</SelectItem>
            <SelectItem value="40-49">40-49</SelectItem>
            <SelectItem value="50-59">50-59</SelectItem>
            <SelectItem value="60+">60+</SelectItem>
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

export default AgeGroup;
