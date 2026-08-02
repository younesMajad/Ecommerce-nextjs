"use client";

import { ProductParams } from "@/shared.types";
import Link from "next/link";
import { cartStore } from "./store/card-store";
import toast from "react-hot-toast";
import { useState } from "react";
import ImageOverview from "./ImageOverview";

const ProductDetails = ({ product }: { product: ProductParams }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const addItem = cartStore.getState().addItem;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} item(s) added to cart`);
  };

  const handleBuyNow = () => {
    const addItem = cartStore.getState().addItem;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-700">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image */}
        <ImageOverview images={[product.image]} alt={product.title} />

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            {product.title}
          </h1>

          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
            {product.category}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-medium text-gray-900 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 border border-black text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Add to Cart
            </button>
            <Link
              href="/checkout"
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition text-center"
            >
              Buy Now
            </Link>
          </div>

          {/* Details */}
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
