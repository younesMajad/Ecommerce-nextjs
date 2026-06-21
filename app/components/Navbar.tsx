"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import HamX from "./HamX";
import { useAppContext } from "@/context/App.Context";
import { signOut } from "@/utils/action/userAuth.actions";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { session, setSession } : any   = useAppContext();

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
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-10  text-white bg-black ">
      <Link href="/">
        <h1 className="font-extrabold text-amber-200"> Store</h1>
      </Link>
      <div className="flex items-center gap-6 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-amber-400 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-amber-400 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-amber-400 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-amber-400 transition">
          Contact
        </Link>
      </div>

      <div>
        <ul className="hidden md:flex items-center gap-4 ">
          <button>
            <Image className="w-4 h-4" src={assets.search_icon} alt="search" />
          </button>

          <button className="flex items-center gap-2 hover:text-amber-400 transition">
            <Image src={assets.heart_icon} alt="favorite" className="w-4" />
          </button>

          <Link
            href={"/cart"}
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <Image src={assets.cart_icon} alt="cart" />
          </Link>

          <button
            onClick={checkIn}
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <Image src={assets.user_icon} alt="user" />
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
        {userOpen && (
          <div className=" absolute w-[390px] h-[200px] flex flex-col flex-full bg-black text-white top-[92px] right-0 z-10 rounded-b-2xl max-md:top-[48px] md:top-[48px]">
            <div className="flex flex-row justify-center items-center">
              {session ? (
                <p className="text-[#fce3c7] mr-2">{session?.user.email}</p>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className="hover:text-amber-300 transition"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {session && (
              <div className="flex flex-col items-center gap-2  mt-2">
                <Link
                  href="/profile"
                  className="hover:text-amber-400 transition"
                >
                  My Profile
                </Link>
                <Link href="/orders" className="hover:text-amber-400 transition">
                  My Orders
                </Link>
                <Link
                  href="/reviews"
                  className="hover:text-amber-400 transition"
                >
                  My Reviews
                </Link>

                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="md:hidden absolute right-0  w-[70%] h-full flex flex-col flex-full bg-black  text-white top-[80px] z-10">
          <div className="flex flex-col items-center gap-10 text-2xl mt-20">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <Link
              href="/all-products"
              className="hover:text-amber-400 transition"
            >
              Shop
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition">
              Contact
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 hover:text-amber-400 transition"
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};