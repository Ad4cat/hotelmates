// src/app/api/reviews/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const {
      hotel_name,
      hotel_country,
      hotel_location,
      access_info,
      rating,
      user_name,
      age_group,
      gender,
      check_in_at,
      nights,
      currency,
      price,
      positive,
      negative,
      is_public,
    } = await req.json();

    // 必須チェック
    if (!hotel_name || !hotel_country || !hotel_location) {
      return NextResponse.json(
        { error: "hotel_name, hotel_country, hotel_location は必須です" },
        { status: 400 }
      );
    }

    const slug = hotel_name.trim().replace(/\s+/g, "-").toLowerCase();

    // ホテル情報を upsert（重複があれば既存を返し、なければ新規作成）
    const { data: hotelUpsertData, error: hotelError } = await supabase
      .from("Hotels")
      .upsert(
        {
          name: slug,
          country: hotel_country, // カラム名はスキーマに合わせること
          location: hotel_location,
          access_info,
        },
        { onConflict: "name" }
      )
      .select("id");

    if (hotelError) {
      console.error("upsert hotel エラー詳細:", {
        message: hotelError.message,
        code: hotelError.code,
        details: hotelError.details,
        hint: hotelError.hint,
      });
      return NextResponse.json(
        {
          error: "ホテル情報の作成または取得に失敗しました。",
          detail: hotelError.message,
        },
        { status: 500 }
      );
    }

    // 配列で返ってくるため、先頭要素を取り出す
    const firstHotel = Array.isArray(hotelUpsertData)
      ? hotelUpsertData[0]
      : hotelUpsertData;
    if (!firstHotel || !firstHotel.id) {
      console.error(
        "ホテル情報 upsert は成功したが、id が取得できませんでした。",
        { hotelUpsertData }
      );
      return NextResponse.json(
        { error: "ホテル情報の取得に失敗しました。" },
        { status: 500 }
      );
    }

    const hotel_id = firstHotel.id;

    let userId = "";
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      userId = data.user.id;
    }

    // Reviews テーブルにレビューを挿入
    const { data: reviewInsertData, error: reviewError } = await supabase
      .from("Reviews")
      .insert([
        {
          hotel_id,
          user_name: user_name || "anonymous",
          age_group,
          gender,
          rating,
          check_in_at,
          nights: Number(nights),
          price: Number(price),
          currency,
          positive,
          negative,
          is_public,
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (reviewError) {
      console.error("レビュー挿入エラー:", {
        message: reviewError.message,
        code: reviewError.code,
        details: reviewError.details,
        hint: reviewError.hint,
      });
      return NextResponse.json(
        {
          error: "レビューの追加に失敗しました。",
          detail: reviewError.message,
        },
        { status: 500 }
      );
    }

    const firstReview = Array.isArray(reviewInsertData)
      ? reviewInsertData[0]
      : reviewInsertData;
    if (!firstReview) {
      console.error(
        "レビュー挿入は成功したが、データが返ってきませんでした。",
        { reviewInsertData }
      );
      return NextResponse.json(
        { error: "レビューの登録に失敗しました。" },
        { status: 500 }
      );
    }

    // 成功時は JSON を返す
    return NextResponse.json(
      { success: true, hotel_id, review: firstReview },
      { status: 200 }
    );
  } catch (err) {
    console.error("意外なサーバーエラー:", err);
    return NextResponse.json(
      { error: "サーバー内部で予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────────────────────────────────
// GET リクエスト：使用していないが、一応 405 を返す
// ───────────────────────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

// ───────────────────────────────────────────────────────────────────────────
// その他のメソッド（OPTIONS など）も 405 を返す
// ───────────────────────────────────────────────────────────────────────────
export async function OPTIONS() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
