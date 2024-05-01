import ProductsDetails from "@/components/ProductDetails/ProductsDetails";
import { notFound } from "next/navigation";

const page = () => {
  if (false) {
    notFound();
  }
  return <ProductsDetails />;
};

export default page;
