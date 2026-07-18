import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our store and mission.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          We are passionate about bringing you the best electronics and accessories at competitive prices.
          Our mission is to make premium technology accessible to everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Quality First", desc: "We carefully curate every product to ensure the highest quality standards." },
          { title: "Customer Focus", desc: "Your satisfaction is our priority. We provide exceptional support and service." },
          { title: "Fast Delivery", desc: "We offer quick and reliable shipping so you get your products when you need them." },
        ].map((item) => (
          <div key={item.title} className="text-center p-8 bg-gray-50 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-black rounded-3xl p-8 md:p-16 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Founded with a vision to bridge the gap between premium technology and affordability,
          we have grown from a small startup to a trusted destination for electronics enthusiasts.
          Every product we offer is handpicked, tested, and backed by our commitment to quality.
        </p>
      </div>
    </div>
  );
}
