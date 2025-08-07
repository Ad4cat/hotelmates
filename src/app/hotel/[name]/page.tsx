import { Header } from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import React from "react";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function HotelPage({ params }: Props) {
  const { name } = await params;
  const decoded = await decodeURIComponent(name);
  const hotelName = decoded.replace(/-/g, " ");

  const supabase = await createClient();
  const { data: Data, error: Error } = await supabase
    .from("Hotels")
    .select("id, location, country, access_info, rating")
    .eq("name", decoded)
    .single();
  if (Error) {
    console.log(Error);
  }
  return (
    <div>
      <Header />
      <div className="m-10 font-mono">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center px-5 ">
              <h1 className="text-2xl font-bold">{hotelName}</h1>
              <span className="text-lg font-semibold whitespace-nowrap pl-3">
                総合評価: {Data?.rating}
              </span>
            </div>
            <CardDescription className="flex justify-between">
              <div className="flex items-center space-x-1 text-gray-400 text-sm px-5">
                <span>{Data?.location}</span>
                <span>/</span>
                <span>{Data?.country}</span>
              </div>
              <span>アクセス: {Data?.access_info}</span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="m-10 w-fit ">
        <ReviewCard hotel={Data?.id} is_Public={false} />
      </div>
    </div>
  );
}
