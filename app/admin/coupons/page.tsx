"use client";

import { useState, useEffect } from "react";

interface Coupon {
  id: string;
  code: string;
  discount_percent: number;
  max_uses: number;
  used_count: number;
  min_order_amount: number;
  expires_at: string;
  is_active: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount_percent: 10,
    max_uses: 100,
    min_order_amount: 0,
    expires_at: "",
  });

  useEffect(() => {
    // Simulated data
    setTimeout(() => {
      setCoupons([]);
      setLoading(false);
    }, 500);
  }, []);

  const handleCreate = () => {
    if (!form.code || !form.discount_percent || !form.expires_at) return;
    // In production, this would call a server action
    setCoupons((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...form,
        used_count: 0,
        is_active: true,
      },
    ]);
    setForm({ code: "", discount_percent: 10, max_uses: 100, min_order_amount: 0, expires_at: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
        >
          {showForm ? "Cancel" : "+ Create Coupon"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">New Coupon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="SAVE20"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
              <input
                type="number"
                value={form.discount_percent}
                onChange={(e) => setForm({ ...form, discount_percent: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
              <input
                type="number"
                value={form.max_uses}
                onChange={(e) => setForm({ ...form, max_uses: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Order ($)</label>
              <input
                type="number"
                value={form.min_order_amount}
                onChange={(e) => setForm({ ...form, min_order_amount: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="mt-4 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            Create Coupon
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Discount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Uses</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No coupons yet. Create one above.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">{coupon.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{coupon.discount_percent}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{coupon.used_count}/{coupon.max_uses}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(coupon.expires_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        coupon.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {coupon.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
