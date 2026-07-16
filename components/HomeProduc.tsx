"use client";

import { ProductParams } from "@/shared.types";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface HomeProductsParams {
  products: ProductParams[];
}
const HomeProducts = ({ products }: HomeProductsParams) => {
  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="
    grid 
    max-md:gap-3 
    gap-4
    mt-8 
    pb-14 
    w-full
    lg:max-w-[1500px]
    grid-cols-2 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-4 
  "
      >
        {products.map((product, index: number) => (
          <motion.div 
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      {/* <button className="px-12 py-2.5 mb-4 border rounded bg-[#043033] text-white hover:bg-black transition">
        See more
      </button> */}
    </div>
  );
};

export default HomeProducts;