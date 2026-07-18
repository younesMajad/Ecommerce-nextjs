"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  offer_price: number;
  quantity: number;
  status: string;
  image_url_array: string[];
  created_at: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=50")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image_url_array?.[0] || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                      <span className="font-medium text-sm text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">${product.offer_price || product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/product/${product.id}`} className="text-sm text-blue-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
