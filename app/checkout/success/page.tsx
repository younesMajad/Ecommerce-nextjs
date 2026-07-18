import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
      <p className="text-sm text-gray-400 mb-8">
        Order ID: <span className="font-mono">{orderId || "N/A"}</span>
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/orders"
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          View Orders
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
