"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamX from "./HamX";
import { useAppContext } from "@/context/App.Context";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cartStore } from "./store/card-store";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();
  const cartItems = cartStore((s) => s.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const checkIn = () => {
    setUserOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 text-white bg-black sticky top-0 z-50">
      <Link href="/">
        <h1 className="font-extrabold text-amber-200 cursor-pointer text-xl">
          Store
        </h1>
      </Link>
      <div className="flex items-center gap-6 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-amber-400 transition cursor-pointer">
          Home
        </Link>
        <Link href="/shop" className="hover:text-amber-400 transition cursor-pointer">
          Shop
        </Link>
        <Link href="/about" className="hover:text-amber-400 transition cursor-pointer">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-amber-400 transition cursor-pointer">
          Contact
        </Link>
      </div>

      <div>
        <ul className="hidden md:flex items-center gap-4">
          <Link href="/shop?search=true" className="hover:text-amber-400 transition cursor-pointer">
            <Image className="w-4 h-6 cursor-pointer" src={assets.search_icon} alt="search" />
          </Link>

          <Link href="/favorites" className="hover:text-amber-400 transition cursor-pointer">
            <Image src={assets.heart_icon} alt="favorite" className="w-4" />
          </Link>

          <Link href="/cart" className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer relative">
            <Image src={assets.cart_icon} alt="cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={checkIn}
            className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer"
          >
            <Image src={assets.user_icon} alt="user" className="w-6 cursor-pointer" />
          </button>
        </ul>

        {/* Mobile view */}
        <div className="md:hidden flex items-center justify-center gap-3">
          <Link href="/cart" className="relative">
            <Image src={assets.cart_icon} alt="cart" className="w-10 h-7 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={checkIn} className="flex items-center gap-2 hover:text-amber-400 transition">
            <Image src={assets.user_icon} alt="user" className="w-10 h-8 cursor-pointer" />
          </button>
          <HamX isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* User dropdown */}
        <AnimatePresence>
          {userOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full max-w-[390px] min-h-[200px] flex flex-col bg-zinc-900 border border-zinc-800 text-white top-[60px] right-0 md:right-10 z-50 rounded-b-2xl shadow-xl p-6"
            >
              <div className="flex flex-row justify-center items-center">
                {user?.email ? (
                  <p className="text-[#fce3c7] mr-2 font-medium">{user.email}</p>
                ) : (
                  <div className="mt-4">
                    <Link
                      href="/login"
                      onClick={() => setUserOpen(false)}
                      className="hover:text-amber-300 transition text-lg font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>

              {user?.email && (
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Link href="/profile" onClick={() => setUserOpen(false)} className="hover:text-amber-400 transition">
                    My Profile
                  </Link>
                  <Link href="/orders" onClick={() => setUserOpen(false)} className="hover:text-amber-400 transition">
                    My Orders
                  </Link>
                  <Link href="/favorites" onClick={() => setUserOpen(false)} className="hover:text-amber-400 transition">
                    My Favorites
                  </Link>
                  <button
                    onClick={() => {
                      setUserOpen(false);
                      router.push("/login");
                    }}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="md:hidden fixed right-0 w-[55%] h-screen flex flex-col rounded-lg bg-zinc-900/90 border-l border-zinc-800 text-white top-[58px] z-40 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-8 text-xl mt-12">
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
                Shop
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
                Contact
              </Link>
              <Link href="/favorites" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-amber-400 transition">
                Favorites
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
