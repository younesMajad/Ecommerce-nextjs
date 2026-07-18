"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Order {
  id: string;
  product_name: string;
  product_category: string;
  amount_paid: number;
  quantity_bought: number;
  image_url: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  processing: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  returned: "bg-orange-100 text-orange-800",
  waiting: "bg-gray-100 text-gray-800",
  reviewed: "bg-purple-100 text-purple-800",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">My Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-4 p-4 border border-gray-200 rounded-2xl">
              <div className="w-20 h-20 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/6" />
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition"
            >
              <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={order.image_url || "/placeholder.png"}
                  alt={order.product_name}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{order.product_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Qty: {order.quantity_bought}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900">${order.amount_paid}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
