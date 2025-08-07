// components/ReviewCard.tsx
import { createClient } from "@/lib/supabase/client";
import {
  CalendarDays,
  Lock,
  MapPin,
  MoonIcon,
  Star,
  ThumbsDown,
  ThumbsUp,
  Unlock,
} from "lucide-react";
import React from "react";
import { CurrentUserAvatar } from "./current-user-avatar";
import { Separator } from "./ui/separator";

const supabase = createClient();

interface ReviewCardProps {
  hotel?: string;
  user?: string;
  is_Public?: boolean;
}

export default async function ReviewCard({
  hotel,
  user,
  is_Public,
}: ReviewCardProps) {
  let q = supabase.from("Reviews").select(`
      *,
      hotel:Hotels(name, location, country)
    `);

  // 条件があればクエリに追加
  if (hotel) q = q.eq("hotel_id", hotel);
  if (user) q = q.eq("user_id", user);
  if (is_Public) q = q.eq("is_public", is_Public);

  const { data: reviews, error: revErr } = await q;
  if (revErr) {
    console.error("レビューの取得に失敗しました。", revErr);
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={` ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-card p-4 min-w-fit border rounded-lg flex flex-col space-x-2 "
        >
          {/* 左側 */}
          <div className="flex justify-between items-center rounded-3xl ml-2 pl-2 pt-2 space-y-1 min-w-40">
            {/* ユーザー情報 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CurrentUserAvatar />
                <span>{review.user_name}</span>
              </div>
            </div>
            <div className="items-center">
              {(review.is_public && <Lock className="text-yellow-400 " />) || (
                <Unlock className="text-yellow-400 " />
              )}
            </div>
          </div>
          {/* 宿泊情報 */}
          <div className="ml-2 pl-2">
            <div className="flex justify-between items-center pr-3 pl-3 text-gray-500 text-sm space-y-1">
              <div className="text-gray-500 text-sm space-y-1">
                <div>
                  <span>Gender : {review.gender}</span>
                </div>
                <div>
                  <span>Age : {review.age_group}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-end items-center ">
                  <CalendarDays className="size-4 mr-1" />
                  <span>{review.check_in_at}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">{review.currency}</span>
                  <span className="mr-1">{review.price} /</span>
                  <MoonIcon className="size-4 mr-1" />
                  <span>{review.nights}</span>
                </div>
              </div>
            </div>
          </div>
          {/* 右側 */}
          {/* レビュー */}
          <div className="p-2 w-full">
            {/* header */}
            <div className="flex items-center p-1">
              <span className="ml-3 font-extrabold text-lg">
                {review.hotel?.name}
              </span>
            </div>

            {/* 下 */}
            <div className="flex items-center ml-2 pl-2 text-gray-500">
              <MapPin className="size-4 mr-1" />
              <span>
                {review.hotel?.location}, {review.hotel?.country}
              </span>
            </div>
            <div className="">
              <div className="px-3 py-1 flex items-center space-x-2 w-fit ">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="font-medium">{review.rating}.0</span>
              </div>
              {/* Good */}
              <div className="m-2 p-2 space-y-1">
                <span className="flex items-center font-semibold">
                  <ThumbsUp className="mr-1" />
                  Pros :
                </span>
                <p>{review.positive}</p>
              </div>
              <Separator />
              {/* Not Good */}
              <div className=" m-2 p-2 space-y-1">
                <span className="flex items-center font-semibold">
                  <ThumbsDown className="mr-1" />
                  Cons :
                </span>
                <p>{review.negative}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-gray-500 mr-3">
                Posted On : {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
