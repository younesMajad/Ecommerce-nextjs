// "use server";

// import { createClient } from "@/utils/supabase/server";
// import { ProductParams, CategoryParams } from "@/shared.types";

// export async function fetchProducts(options?: {
//   category?: string;
//   search?: string;
//   sort?: string;
//   page?: number;
//   limit?: number;
//   minPrice?: number;
//   maxPrice?: number;
// }): Promise<{ products: ProductParams[]; total: number }> {
//   const supabase = await createClient();

//   const page = options?.page || 1;
//   const limit = options?.limit || 12;
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   let query = supabase
//     .from("products")
//     .select("*, category:categories(id, name)", { count: "exact" });

//   if (options?.category) {
//     query = query.eq("category.slug", options.category);
//   }

//   if (options?.search) {
//     query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,brand.ilike.%${options.search}%`);
//   }

//   if (options?.minPrice !== undefined) {
//     query = query.gte("offer_price", options.minPrice);
//   }

//   if (options?.maxPrice !== undefined) {
//     query = query.lte("offer_price", options.maxPrice);
//   }

//   switch (options?.sort) {
//     case "price_asc":
//       query = query.order("offer_price", { ascending: true });
//       break;
//     case "price_desc":
//       query = query.order("offer_price", { ascending: false });
//       break;
//     case "newest":
//       query = query.order("created_at", { ascending: false });
//       break;
//     case "popular":
//       query = query.order("review_count", { ascending: false });
//       break;
//     default:
//       query = query.order("created_at", { ascending: false });
//   }

//   const { data, count, error } = await query.range(from, to);

//   if (error) {
//     console.error("Error fetching products:", error);
//     return { products: [], total: 0 };
//   }

//   return {
//     products: (data as ProductParams[]) || [],
//     total: count || 0,
//   };
// }

// export async function fetchProductById(id: string): Promise<ProductParams | null> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("products")
//     .select("*, category:categories(id, name)")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }

//   return data as ProductParams;
// }

// export async function fetchCategories(): Promise<CategoryParams[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("categories")
//     .select("*")
//     .order("name");

//   if (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }

//   return (data as CategoryParams[]) || [];
// }

// export async function fetchFeaturedProducts(): Promise<ProductParams[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("products")
//     .select("*, category:categories(id, name)")
//     .order("review_count", { ascending: false })
//     .limit(8);

//   if (error) {
//     console.error("Error fetching featured products:", error);
//     return [];
//   }

//   return (data as ProductParams[]) || [];
// }
