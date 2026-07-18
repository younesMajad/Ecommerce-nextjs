"use client";

export default function AdminInventoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Inventory</h1>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-500 text-center py-12">
          Inventory management will track stock levels, reserved items, and low stock alerts.
          <br />
          <span className="text-sm">This feature requires the inventory table to be populated via the admin API.</span>
        </p>
      </div>
    </div>
  );
}
