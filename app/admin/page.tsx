"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated stats - in production, these would come from API
    setTimeout(() => {
      setStats({
        totalOrders: 156,
        totalRevenue: 24580.5,
        totalProducts: 48,
        totalUsers: 312,
      });
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, icon: "📦", color: "bg-blue-50" },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-green-50" },
    { label: "Products", value: stats.totalProducts, icon: "🏷️", color: "bg-purple-50" },
    { label: "Users", value: stats.totalUsers, icon: "👥", color: "bg-amber-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard Overview</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className={`${card.color} p-6 rounded-2xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <span className="text-3xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { text: "New order #1234 placed", time: "2 min ago", type: "order" },
                { text: "Product 'MacBook Pro' updated", time: "15 min ago", type: "product" },
                { text: "New user registered", time: "1 hour ago", type: "user" },
                { text: "Review added to 'iPhone 15'", time: "2 hours ago", type: "review" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-700">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
