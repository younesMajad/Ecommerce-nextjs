"use client";

import { ProductParams } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { cartStore } from "./store/card-store";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: ProductParams;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.getState().addItem(product);
    toast.success("Added to cart");
  };

  const discountPercent =
    product.discount > 0
      ? Math.round(((product.price - product.offer_price) / product.price) * 100)
      : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <Image
            src={product.image_url_array?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              -{discountPercent}%
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Image src={assets.cart_icon} alt="Add to cart" className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category?.name || "Category"}
          </p>
          <h3 className="font-medium text-gray-900 truncate mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={i < Math.round(product.average_rating || 4) ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-3 h-3"
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.review_count || 0})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">${product.offer_price || product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">${product.price}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
