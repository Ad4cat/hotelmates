"use client";

import React, { useEffect, useState } from "react";
import ScoreStars from "./ScoreStars";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Mars,
  Venus,
  CircleDashed,
  HelpCircle,
  MinusCircle,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import InputHotelName from "./InputHotelName";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "./ui/separator";

const ReviewForm = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [currency, setCurrency] = useState("¥");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const supabase = createClient();

  const [formData, setFormData] = useState({
    // Hotelsテーブルに
    hotel_name: "",
    hotel_country: "",
    hotel_location: "",
    access_info: "",
    // Reviewsテーブルに
    rating,
    user_name: "",
    age_group: "",
    gender: "",
    check_in_at: "",
    nights: "",
    currency,
    price: "",
    positive: "",
    negative: "",
    is_public: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
      } else {
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("display_name, age_group, gender")
          .eq("id", userData.user.id)
          .single();

        const DisplayName = userProfile?.display_name ?? "";
        const AgeGroup = userProfile?.age_group ?? "";
        const Gender = userProfile?.gender ?? "";

        setFormData((prev) => ({ ...prev, user_name: DisplayName }));
        setFormData((prev) => ({ ...prev, age_group: AgeGroup }));
        setFormData((prev) => ({ ...prev, gender: Gender }));

        if (profileError) {
          setErrorMessage(`言語の更新に失敗しました: ${profileError.message}`);
          return;
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    // バリデーション
    const newErrors: Record<string, string> = {};

    if (!formData.hotel_name) newErrors.hotel_name = "Hotel name is required";
    if (!formData.hotel_country)
      newErrors.hotel_country = "Hotel Country is required";
    if (!formData.hotel_location)
      newErrors.hotel_location = "Hotel Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // エラーなしなら送信
      setErrors({});
      console.log("送信データ:", {
        ...formData,
        rating,
        currency,
      });

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
          currency,
        }),
      });

      const data = await res.json();
      console.log("レスポンス:", { status: res.status, data });

      if (!res.ok) {
        console.error("APIエラー:", data);
        setSubmitStatus("error");
        setSubmitMessage(data.error || "レビューの保存に失敗しました");
        return;
      }

      // 成功時の処理
      console.log("成功！レビューが保存された:", data);
      setSubmitStatus("success");
      setSubmitMessage("レビューが正常に保存されました！");

      // 2秒後にホームページに戻る
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("送信エラー:", error);
      setSubmitStatus("error");
      setSubmitMessage("ネットワークエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 max-w-2xl pb-12"
      >
        <Link
          href={"/"}
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center pt-5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </div>
        </Link>

        {/* 成功・エラーメッセージ */}
        {submitStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
              submitStatus === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{submitMessage}</span>
          </motion.div>
        )}

        <motion.div
          animate={hasErrors ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Card className="border border-accent">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Write a Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="items-center">
                <form onSubmit={handleSubmit}>
                  <h1 className="text-2xl font-semibold border-b">
                    About Hotel
                  </h1>
                  <div className="space-y-12 pt-6">
                    {/* ホテル詳細 */}
                    <div>
                      <Label
                        htmlFor="hotelName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Hotel Name<span className="text-red-500">*</span>
                      </Label>
                      <InputHotelName
                        value={formData.hotel_name}
                        onChange={(value: string) =>
                          setFormData((prev) => ({
                            ...prev,
                            hotel_name: value,
                          }))
                        }
                        hasError={!!errors.hotel_name}
                      />
                      {errors.hotel_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hotel_name}
                        </p>
                      )}

                      <Label
                        htmlFor="country"
                        className="text-sm font-medium text-gray-700 mt-4 block"
                      >
                        Country<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="hotel_country"
                        type="text"
                        placeholder="e.g. Japan"
                        className={
                          errors.hotel_country
                            ? "border-red-500"
                            : "border px-3 py-2 rounded w-full"
                        }
                        value={formData.hotel_country}
                        onChange={handleChange}
                      />
                      {errors.hotel_country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hotel_country}
                        </p>
                      )}

                      <Label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-700 mt-4 block"
                      >
                        Location<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="hotel_location"
                        type="text"
                        placeholder="e.g. Kyoto"
                        className={
                          errors.hotel_location
                            ? "border-red-500"
                            : "border px-3 py-2 rounded w-full"
                        }
                        value={formData.hotel_location}
                        onChange={handleChange}
                      />
                      {errors.hotel_location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hotel_location}
                        </p>
                      )}
                      <Label
                        htmlFor="access"
                        className="text-sm font-medium text-gray-700 mt-4 block"
                      >
                        How did you get to the hotel?
                      </Label>
                      <Input
                        id="access_info"
                        type="text"
                        placeholder="e.g. 10 min walk from Kyoto Station"
                        className="border px-3 py-2 rounded w-full"
                        value={formData.access_info}
                        onChange={handleChange}
                      />
                    </div>
                    {/* 総合評価 */}
                    <div id="ev">
                      <div className="flex flex-col">
                        <Label className="text-sm font-medium ">
                          Rating<span className="text-red-500">*</span>
                        </Label>
                        <ScoreStars value={rating} onChange={setRating} />
                        {errors.rating && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.rating}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* 宿泊日程 */}
                    <div>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor="checkin"
                            className="text-gray-700 text-sm font-medium"
                          >
                            Check-in:
                          </Label>
                          <Input
                            id="check_in_at"
                            type="month"
                            className="w-fit"
                            value={formData.check_in_at}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex items-center gap-2 space-x-1">
                          <Label
                            htmlFor="nights"
                            className="text-gray-700 text-sm font-medium"
                          >
                            Nights:
                          </Label>
                          <Input
                            id="nights"
                            type="number"
                            min={0}
                            className="w-20"
                            placeholder="5"
                            value={formData.nights}
                            onChange={handleChange}
                          />
                          <span>泊</span>
                        </div>
                        <div>
                          <div className="flex items-start space-x-2">
                            <Label
                              htmlFor="price"
                              className="text-gray-700 text-sm font-medium"
                            >
                              Price:
                            </Label>
                            <div className="flex flex-col space-y-3 pt-1">
                              {/* 通貨セレクト */}
                              <RadioGroup
                                defaultValue={currency}
                                className="flex gap-6"
                                onValueChange={setCurrency}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="$" id="usd" />
                                  <Label htmlFor="usd">$ USD</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="¥" id="jpy" />
                                  <Label htmlFor="jpy">¥ JPY</Label>
                                </div>
                              </RadioGroup>

                              {/* 金額 */}
                              <div className="flex items-center space-x-2">
                                <Input
                                  id="price"
                                  type="number"
                                  min={0}
                                  className="w-auto"
                                  placeholder="10000"
                                  value={formData.price}
                                  onChange={handleChange}
                                />
                                <span>/ 泊</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Positive, Negative */}
                    <div>
                      <Label
                        htmlFor="positive"
                        className="text-sm font-medium text-gray-700"
                      >
                        What did you like?
                      </Label>
                      <Textarea
                        id="positive"
                        placeholder="e.g. The view from the room was amazing."
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                        value={formData.positive}
                        onChange={handleChange}
                      />

                      <Label
                        htmlFor="negative"
                        className="text-sm font-medium text-gray-700 mt-4 block"
                      >
                        What didn&apos;t you like?
                      </Label>
                      <Textarea
                        id="negative"
                        placeholder="e.g. The hotel is far from the station."
                        className="w-full border rounded px-3 py-2 bg-gray-50"
                        value={formData.negative}
                        onChange={handleChange}
                      />
                    </div>
                    {/* 写真 */}
                    <div>
                      <Label
                        htmlFor="inputfile"
                        className="text-sm font-medium"
                      >
                        Got any photos? Add one here.
                      </Label>
                      <Input
                        id="inputfile"
                        type="file"
                        className="hover:cursor-pointer  "
                      />
                    </div>
                  </div>
                  {/* about you */}
                  <h1 className="text-2xl font-semibold border-b pt-12">
                    About You
                  </h1>
                  <div className="space-y-6 ">
                    {/* Name */}
                    <div>
                      <div className="space-y-1 pt-6">
                        <Label htmlFor="name" className="text-sm font-medium">
                          <div className="normal-wrap">
                            Display Name ( If left blank, your name will default
                            to
                            <span className="font-bold"> {`'anonymous'`}</span>.
                            )
                          </div>
                        </Label>
                        <Input
                          id="user_name"
                          name="name"
                          placeholder="Enter your name"
                          className="bg-background border-accent"
                          value={formData.user_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* Age_Group */}

                    <div className="space-y-1">
                      <Label
                        htmlFor="age_group"
                        className="text-sm font-medium"
                      >
                        AgeGroup
                      </Label>
                      <div className="flex justify-between items-center">
                        <Select
                          value={formData.age_group}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              age_group: value,
                            }))
                          }
                        >
                          <SelectTrigger id="age_group" className="w-fit">
                            <SelectValue placeholder="Select AgeGroup" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unspecified">
                              Not specified
                            </SelectItem>
                            <SelectItem value="< 19">&lt; 19</SelectItem>
                            <SelectItem value="20-29">20-29</SelectItem>
                            <SelectItem value="30-39">30-39</SelectItem>
                            <SelectItem value="40-49">40-49</SelectItem>
                            <SelectItem value="50-59">50-59</SelectItem>
                            <SelectItem value="60+">60+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-1 pb-6">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        Gender
                      </Label>
                      <div className="flex justify-between items-center">
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              gender: value,
                            }))
                          }
                        >
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
                      </div>
                    </div>
                  </div>

                  <Separator />
                  {/* Public or Private */}
                  <div className="flex flex-col space-y-2 justify-center pt-6">
                    <Label htmlFor="isPublic" className="text-sm font-medium">
                      Is it okay to publish this post?
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="isPublic"
                        checked={formData.is_public}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            is_public: checked,
                          }))
                        }
                      />
                      {formData.is_public ? (
                        <div className="flex items-center text-green-600">
                          <Unlock className="w-4 h-4 mr-1" />
                          Public
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <Lock className="w-4 h-4 mr-1" />
                          Private
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 送信 */}
                  <div className="pt-6">
                    <Button
                      variant="default"
                      type="submit"
                      className="hover:cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting || submitStatus === "success"}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : submitStatus === "success"
                        ? "Submitted!"
                        : "Submit Review"}
                    </Button>
                    {errorMessage && (
                      <p className="mt-2 text-red-600 text-sm">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReviewForm;
