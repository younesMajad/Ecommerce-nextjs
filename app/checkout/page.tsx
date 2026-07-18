"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cartStore } from "@/components/store/card-store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const items = cartStore((s) => s.items);
  const clearCart = cartStore((s) => s.clearCartItems);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");

  const subtotal = items.reduce(
    (acc, item) => acc + (item.offer_price || item.price) * item.quantity,
    0
  );
  const shippingCost = shippingMethod === "express" ? 19.99 : subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Create order via server action
      const { createOrder } = await import("@/utils/action/order.action");
      const result = await createOrder({
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          size: undefined,
          color: undefined,
        })),
        shipping_address: address,
        shipping_method: shippingMethod,
        total_amount: total,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-black font-medium hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {["Shipping", "Review", "Payment"].map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === i + 1 ? "text-gray-900" : "text-gray-500"}`}>
                {label}
              </span>
            </div>
            {i < 2 && <div className="w-12 h-px bg-gray-300 mx-3" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold pt-4">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standard Shipping", desc: "5-7 business days", price: subtotal > 50 ? "Free" : "$9.99" },
                  { id: "express", label: "Express Shipping", desc: "2-3 business days", price: "$19.99" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${
                      shippingMethod === method.id ? "border-black bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4 text-black"
                      />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </div>
                    <span className="font-medium">{method.price}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                Continue to Review
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-semibold">Review Your Order</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium mb-2">Shipping To</h3>
                  <p className="text-sm text-gray-600">
                    {address.fullName}<br />
                    {address.address}<br />
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                      <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={item.image_url_array?.[0] || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.offer_price || item.price) * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-semibold">Payment</h2>
              <div className="p-6 border border-gray-200 rounded-xl">
                <p className="text-gray-600 text-center">
                  Stripe checkout will be integrated here.
                </p>
                <p className="text-sm text-gray-400 text-center mt-2">
                  For now, click &quot;Place Order&quot; to complete your purchase.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost}`}
                </span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
