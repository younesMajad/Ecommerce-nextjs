import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Order Cancelled</h1>
      <p className="text-gray-500 mb-8">Your order was not completed. Your cart items are still saved.</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/cart"
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          Return to Cart
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
