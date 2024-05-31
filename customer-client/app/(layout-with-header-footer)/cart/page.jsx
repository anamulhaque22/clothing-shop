import Cart from "@/components/Cart/Cart";
import { notFound } from "next/navigation";
// import EmptyCart from "@/components/Cart/EmptyCart";

const page = () => {
  if (false) {
    // if cart is empty
    notFound();
  }
  return <Cart />;
};

export default page;
