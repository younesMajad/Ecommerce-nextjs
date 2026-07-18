"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/categories", label: "Categories", icon: "🏷️" },
  { href: "/admin/orders", label: "Orders", icon: "🛍️" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/coupons", label: "Coupons", icon: "🎫" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
        <nav className="space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
