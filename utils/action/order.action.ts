// "use server";

// import { createClient } from "@/utils/supabase/server";
// import { revalidatePath } from "next/cache";

// interface CreateOrderParams {
//   items: Array<{
//     product_id: string;
//     quantity: number;
//     size?: string;
//     color?: string;
//   }>;
//   shipping_address: {
//     fullName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   };
//   shipping_method: string;
//   total_amount: number;
// }

// export async function createOrder(params: CreateOrderParams) {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return { error: "Not authenticated" };
//   }

//   // Fetch products to get details
//   const productIds = params.items.map((item) => item.product_id);
//   const { data: products } = await supabase
//     .from("products")
//     .select("*")
//     .in("id", productIds);

//   if (!products || products.length === 0) {
//     return { error: "Products not found" };
//   }

//   // Create orders for each item
//   const orders = params.items
//     .map((item) => {
//       const product = products.find((p) => p.id === item.product_id);
//       if (!product) return null;

//       return {
//         user_id: user.id,
//         user_email: user.email,
//         product_id: product.id,
//         product_name: product.name,
//         product_category: product.category?.name || "",
//         amount_paid: (product.offer_price || product.price) * item.quantity,
//         quantity_bought: item.quantity,
//         image_url: product.image_url_array?.[0] || "",
//         status: "processing" as const,
//         size: item.size || null,
//         color: item.color || null,
//         region: params.shipping_address.country,
//         state: params.shipping_address.state,
//         city: params.shipping_address.city,
//         address: params.shipping_address.address,
//         phone: params.shipping_address.phone,
//         reference_paystack: `ref_${Date.now()}`,
//         country_code: params.shipping_address.country,
//       };
//     })
//     .filter((order): order is NonNullable<typeof order> => order !== null);

//   const { data, error } = await supabase
//     .from("orders")
//     .insert(orders)
//     .select("id");

//   if (error) {
//     return { error: error.message };
//   }

//   // Update product quantities
//   for (const item of params.items) {
//     const product = products.find((p) => p.id === item.product_id);
//     if (product) {
//       await supabase
//         .from("products")
//         .update({ quantity: Math.max(0, product.quantity - item.quantity) })
//         .eq("id", item.product_id);
//     }
//   }

//   revalidatePath("/orders");
//   return { orderId: data?.[0]?.id, success: true };
// }

// export async function fetchUserOrders() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return { orders: [] };

//   const { data, error } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("user_id", user.id)
//     .order("created_at", { ascending: false });

//   if (error) return { orders: [] };
//   return { orders: data || [] };
// }

// export async function fetchOrderById(orderId: string) {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("id", orderId)
//     .single();

//   if (error) return null;
//   return data;
// }
