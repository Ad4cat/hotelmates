import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.length < 2) {
    return NextResponse.json({ hotels: [] });
  }

  // 部分一致のまま高速化したい場合
  const { data } = await supabase
    .from("Hotels")
    .select("id, name, location, country")
    .textSearch("name", `${query}:*`, { config: "simple" }) // 全文検索用
    .limit(5);

  return NextResponse.json({ hotels: data }, { status: 200 });
}
