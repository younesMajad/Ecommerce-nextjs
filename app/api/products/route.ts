import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*, category:categories(id, name, slug)", { count: "exact" });

  if (category) {
    query = query.eq("categories.slug", category);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`);
  }

  if (minPrice) {
    query = query.gte("offer_price", Number(minPrice));
  }

  if (maxPrice) {
    query = query.lte("offer_price", Number(maxPrice));
  }

  switch (sort) {
    case "price_asc":
      query = query.order("offer_price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("offer_price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "popular":
      query = query.order("review_count", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ products: [], total: 0, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}
