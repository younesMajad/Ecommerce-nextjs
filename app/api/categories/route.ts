import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("category")
    .not("category", "is", null)
    .not("category", "eq", "");

  if (error) {
    return NextResponse.json({ categories: [], error: error.message }, { status: 500 });
  }

  const counts = new Map<string, number>();
  for (const row of data || []) {
    const category = row.category?.trim();
    if (!category) continue;
    counts.set(category, (counts.get(category) || 0) + 1);
  }

  const categories = Array.from(counts.keys())
    .sort((a, b) => a.localeCompare(b))
    .map((category) => ({
      id: category,
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      description: "",
      image_url: "",
      product_count: counts.get(category) || 0,
      created_at: "",
    }));

  return NextResponse.json({ categories });
}
