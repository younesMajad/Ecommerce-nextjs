import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select("*, product:products(*, category:categories(id, name))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ items: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { product_id } = await request.json();

  const { data: existing } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product_id)
    .single();

  if (existing) {
    await supabase.from("wishlist").delete().eq("id", existing.id);
    return NextResponse.json({ removed: true });
  }

  const { error } = await supabase.from("wishlist").insert({
    user_id: user.id,
    product_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ added: true });
}
