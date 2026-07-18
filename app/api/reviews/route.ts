import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  let query = supabase
    .from("reviews")
    .select("*, profiles:user_id(full_name, avatar_url)")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ reviews: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data || [] });
}
