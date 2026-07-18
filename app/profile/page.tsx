"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "@/utils/action/userAuth.action";

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: string;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setFullName(data?.full_name || "");
        setPhone(data?.phone || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateProfile({ full_name: fullName, phone });
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setProfile((prev) => (prev ? { ...prev, full_name: fullName, phone } : null));
      setEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">My Profile</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editing}
              className={`w-full px-4 py-3 border rounded-xl transition ${
                editing ? "border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing}
              className={`w-full px-4 py-3 border rounded-xl transition ${
                editing ? "border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={profile?.role || "customer"}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 capitalize"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
            <input
              type="text"
              value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        {editing && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </motion.div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/orders", label: "My Orders", icon: "📦" },
          { href: "/favorites", label: "Favorites", icon: "❤️" },
          { href: "/cart", label: "Cart", icon: "🛒" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="font-medium text-gray-900">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
