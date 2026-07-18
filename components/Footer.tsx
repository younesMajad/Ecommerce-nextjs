import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/">
              <h1 className="text-2xl font-bold text-amber-200">Store</h1>
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Premium electronics and accessories. Quality products, exceptional service.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Facebook</a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-amber-200 mb-4">Shop</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/shop">
                  All Products
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/shop?category=electronics">
                  Electronics
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/shop?category=accessories">
                  Accessories
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/shop?sort=newest">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-amber-200 mb-4">Account</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/orders">
                  My Orders
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/favorites">
                  Favorites
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-amber-200 mb-4">Support</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition" href="#">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; 2026 Store. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
