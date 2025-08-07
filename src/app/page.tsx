import { Header } from "@/components/Header";
import HotelsClient from "@/components/HotelsClient";
import RootTypeWriter from "@/components/RootTypeWriter";
import { createClient } from "@/lib/supabase/client";

export default async function HotelsPage() {
  const supabase = createClient();
  const { data: hotelData, error } = await supabase.from("Hotels").select("*");
  if (error) {
    // 必要に応じてエラーハンドリング
    console.error(error);
    return <p>ホテル、または画像情報の取得に失敗しました</p>;
  }

  // サーバー側で取得したデータを props として渡す
  return (
    <div>
      <Header />
      <RootTypeWriter />
      <HotelsClient initialHotels={hotelData} />
    </div>
  );
}
