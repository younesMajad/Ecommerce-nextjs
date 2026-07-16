"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import React from "react";
interface HamXParams {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const HamX = (params: HamXParams) => {
  const { isOpen, setIsOpen } = params;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="flex items-center gap-4 hover:text-amber-400 cursor-pointer transition-all"
        >
          <Image src={assets.hamIcon} alt="Toggle" className=" w-8 h-8" />
        </button>
      )}
      {isOpen && (
        <button onClick={toggleMenu} className="text-amber-500 text-2xl  cursor-pointer transition-all">
          X
        </button>
      )}
    </div>
  );
};

export default HamX;