import ProductsDetails from "@/components/ProductDetails/ProductsDetails";
import { notFound } from "next/navigation";

const page = () => {
  if (false) {
    // if product id not found based on productId
    notFound();
  }
  return <ProductsDetails />;
};

export default page;
