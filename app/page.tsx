import HomeProducts from "@/components/ProductCard";
import Header from "../components/Header";
import {fetchProducts} from "@/utils/action/product.action";
export default async function Home() {
  // const { data, error } = await supabase
  //   .from("products")
  //   .select("*");

  // if (error) {
  //   return <pre>{JSON.stringify(error, null, 2)}</pre>;
  // }
  const allProudects   = fetchProducts()
  
  return (
    <main>
      <Header />
      
      <HomeProducts products={allProudects}/>
    </main>
  );
}
