"use client";
import EmptyWithList from "@/components/UserProfile/WishList/EmptyWithList";
import WishListItem from "@/components/UserProfile/WishList/WishListItem";
import { useWishlist } from "@/context/wish-list-context";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function WishListContent() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <>
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 custom-shadow py-6 px-5 rounded-lg gap-5">
          {wishlist.map((wishList) => (
            <WishListItem
              key={wishList.id}
              wishList={wishList}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        <EmptyWithList />
      )}
    </>
  );
}

export default withPageRequiredAuth(WishListContent);
