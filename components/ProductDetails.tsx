"use client";

import { ProductParams } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { cartStore } from "./store/card-store";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductDetails = ({ product }: { product: ProductParams }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
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

  const discountPercent =
    product.discount > 0
      ? Math.round(((product.price - product.offer_price) / product.price) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-700">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50"
          >
            <Image
              src={product.image_url_array?.[selectedImage] || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </motion.div>
          {product.image_url_array.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.image_url_array.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={i < Math.round(product.average_rating || 4) ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.review_count || 0} reviews)
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.offer_price || product.price}
            </span>
            {product.discount > 0 && (
              <span className="text-lg text-gray-400 line-through">${product.price}</span>
            )}
          </div>

          <div className="text-sm text-gray-500 mb-2">
            {product.quantity > 0 ? (
              <span className="text-green-600">In Stock ({product.quantity} available)</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          <hr className="my-6" />

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <p className="font-medium text-gray-900 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-4">
              <p className="font-medium text-gray-900 mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

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
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
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
              disabled={product.quantity === 0}
              className="flex-1 py-3.5 border border-black text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <Link
              href="/checkout"
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition text-center disabled:opacity-50"
            >
              Buy Now
            </Link>
          </div>

          {/* Details */}
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product.category?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">
                {product.product_shipping_fee > 0
                  ? `$${product.product_shipping_fee}`
                  : "Free"}
              </span>
            </div>
            {product.location && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">{product.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extra Images */}
      {product.image_url_array.length > 1 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Product Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.image_url_array.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer hover:opacity-90 transition"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
