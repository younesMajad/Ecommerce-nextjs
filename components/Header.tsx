"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Coming Soon",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Coming Soon",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Coming Soon",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full bg-black md:min-h-[450px] min-h-[400px] flex flex-col justify-center pb-12">
      <div className="relative w-full h-full flex-1 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col-reverse md:flex-row items-center justify-between py-8 md:px-14 px-5 w-full text-white absolute inset-0"
          >
            <div className="md:pl-8 mt-10 md:mt-0 z-10 flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold"
              >
                {sliderData[currentSlide].title}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center mt-4 md:mt-6 "
              >
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-[#fce3c7] rounded-full text-black font-medium hover:bg-amber-300 transition-colors shadow-lg hover:shadow-amber-500/20">
                  {sliderData[currentSlide].buttonText1}
                </button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center flex-1 justify-center z-10"
            >
              <Image
                className="md:w-[350px] w-56 drop-shadow-2xl"
                src={sliderData[currentSlide].imgSrc}
                alt={`Slide ${currentSlide + 1}`}
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 absolute bottom-6 left-0 right-0 z-20">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-[#043033]" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;