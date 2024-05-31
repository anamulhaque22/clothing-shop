import WishList from "@/components/UserProfile/WishList/WishList";
import { notFound } from "next/navigation";

const WishListPage = () => {
  if (false) {
    // if wish list is empty
    notFound();
  }
  return <WishList />;
};

export default WishListPage;
