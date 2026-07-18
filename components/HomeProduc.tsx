"use client";

import { ProductParams } from "@/shared.types";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface HomeProductsParams {
  products: ProductParams[];
  title?: string;
}

const HomeProducts = ({ products, title = "Popular Products" }: HomeProductsParams) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{title}</p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="
          grid
          max-md:gap-3
          gap-4
          mt-8
          pb-14
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
        "
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeProducts;
