// import ProductDetails from "@/components/ProductDetails";
// import { fetchProductById } from "@/utils/action/product.action";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const product = await fetchProductById(id);

//   if (!product) {
//     return { title: "Product Not Found" };
//   }

//   return {
//     title: product.name,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: product.image_url_array?.[0] ? [{ url: product.image_url_array[0] }] : [],
//     },
//   };
// }

// export default async function Product({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const product = await fetchProductById(id);

//   if (!product) {
//     notFound();
//   }

//   return <ProductDetails product={product} />;
// }
