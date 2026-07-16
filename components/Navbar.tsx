"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamX from "./HamX";
import { useAppContext } from "@/context/App.Context";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {signOut} from "@/utils/action/userAuth.action";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { session, setSession }    = useAppContext();

  const router = useRouter();

  const checkIn = () => {
    setUserOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    router.push("/");
  };
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-8  text-white bg-black ">
      <Link href="/">
        <h1 className="font-extrabold text-amber-200 cursor-pointer"> Store</h1>
      </Link>
      <div className="flex items-center gap-6 lg:gap-8 max-md:hidden  ">
        <Link href="/" className="hover:text-amber-400 transition cursor-pointer">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-amber-400 transition cursor-pointer">
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
        <ul className="hidden md:flex items-center gap-4 ">
          <button>
            <Image className="w-4 h-6 cursor-pointer" src={assets.search_icon} alt="search" />
          </button>

          <button className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer">
            <Image src={assets.heart_icon} alt="favorite" className="w-4" />
          </button>

          <Link
            href={"/cart"}
            className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer"
          >
            <Image src={assets.cart_icon} alt="cart" />
          </Link>

          <button
            onClick={checkIn}
            className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer" 
          >
            <Image src={assets.user_icon} alt="user"   className="w-6   cursor-pointer"/>
          </button>
        </ul>
        
        {/* for mobile view */}
        <div className=" md:hidden flex items-center justify-center gap-3">
          <button>
            <Image className="w-10 h-8 cursor-pointer" src={assets.search_icon} alt="search" />
          </button>

          <button className="flex items-center gap-2 hover:text-amber-400 transition">
            <Image src={assets.cart_icon} alt="cart" className="w-10 h-7 cursor-pointer" />
          </button> 
          <button
            onClick={checkIn}
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <Image src={assets.user_icon} alt="user" className="w-10 h-8 cursor-pointer" />
          </button>

          <HamX isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <AnimatePresence>
        {userOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className=" absolute w-full max-w-[390px] min-h-[200px] flex flex-col flex-full bg-zinc-900 border border-zinc-800 text-white top-[80px] right-0 md:right-10 z-50 rounded-b-2xl shadow-xl p-6"
          >
            <div className="flex flex-row justify-center items-center">
              {session ? (
                <p className="text-[#fce3c7] mr-2 font-medium">{session?.user.email}</p>
              ) : (
                <div className="mt-4">
                  <Link
                    href="/login"
                    onClick={() => setUserOpen(false)}
                    className="hover:text-amber-300 transition text-lg font-medium "
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {session && (
              <div className="flex flex-col items-center gap-4 mt-6">
                <Link
                  href="/profile"
                  onClick={() => setUserOpen(false)}
                  className="hover:text-amber-400 transition"
                >
                  My Profile
                </Link>
                <Link href="/orders" onClick={() => setUserOpen(false)} className="hover:text-amber-400 transition">
                  My Orders
                </Link>
                <Link
                  href="/reviews"
                  onClick={() => setUserOpen(false)}
                  className="hover:text-amber-400 transition"
                >
                  My Reviews
                </Link>

                <button onClick={handleSignOut} className="text-red-400 hover:text-red-300 transition">Sign Out</button>
              </div>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>

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
            <Link
              href="/all-products"
              onClick={() => setIsOpen(false)}
              className="hover:text-amber-400 transition"
            >
              Shop
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition">
              Contact
            </Link>

            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 hover:text-amber-400 transition"
            >
              Favorites
            </Link>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};