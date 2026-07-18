"use client";

import { cartStore } from "@/components/store/card-store";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const items = cartStore((s) => s.items);
  const removeItem = cartStore((s) => s.decreaseQty);
  const increaseQty = cartStore((s) => s.increaseQty);
  const clearCart = cartStore((s) => s.clearCartItems);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.offer_price || item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Add some products to get started
        </p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 p-4 bg-white border border-gray-200 rounded-2xl"
            >
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={item.image_url_array?.[0] || "/placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.id}`}
                  className="font-medium text-gray-900 hover:underline truncate block"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                <p className="font-semibold text-gray-900 mt-2">
                  ${(item.offer_price || item.price) * item.quantity}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm"
                >
                  Remove
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({items.length} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Free shipping on orders over $50
                </p>
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3.5 rounded-xl font-medium mt-6 hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
