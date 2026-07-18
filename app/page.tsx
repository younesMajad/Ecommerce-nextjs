import HeaderSlider from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeaderSlider />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-medium mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Headphones", slug: "headphones", color: "from-amber-50 to-orange-50" },
            { name: "Phones", slug: "phones", color: "from-blue-50 to-indigo-50" },
            { name: "Laptops", slug: "laptops", color: "from-green-50 to-emerald-50" },
            { name: "Cameras", slug: "cameras", color: "from-purple-50 to-pink-50" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              <h3 className="font-semibold text-gray-900 group-hover:scale-105 transition-transform origin-left">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Explore &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Free Shipping", desc: "On orders over $50", icon: "📦" },
              { title: "Secure Payment", desc: "100% secure checkout", icon: "🔒" },
              { title: "24/7 Support", desc: "Dedicated support team", icon: "💬" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-white shadow-sm"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-black rounded-3xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Explore our collection of premium electronics designed to elevate your everyday experience.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
