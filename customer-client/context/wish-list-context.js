"use client";
import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import {
  useAddToWishListService,
  useGetWishListService,
  useRemoveFromWishListService,
} from "@/services/api/services/wish-list";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = useGetWishListService();
  const fetchPostWishlist = useAddToWishListService();
  const fetchDeleteWishlist = useRemoveFromWishListService();
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await fetchWishlist();
      if (status === HTTP_CODES.OK) {
        setWishlist(data);
      }
    };

    fetchData();
  }, [fetchWishlist]);

  // Helper function to check if a product is in the wishlist
  const isInWishlist = (productId) =>
    wishlist.find((w) => w?.product?.id === productId);

  const toggleWishlist = async (productId) => {
    const exitsWishItem = isInWishlist(productId);
    if (exitsWishItem) {
      const { data, status } = await fetchDeleteWishlist(exitsWishItem.id);
      if (status === HTTP_CODES.NO_CONTENT) {
        showToast("Product removed from wishlist", "success");
        setWishlist((prev) =>
          prev.filter((item) => item?.product?.id !== productId)
        );
      }
    } else {
      const { data, status } = await fetchPostWishlist(productId);
      if (status === HTTP_CODES.CREATED) {
        showToast("Product added to wishlist", "success");
        setWishlist((prev) => [...prev, data]);
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
