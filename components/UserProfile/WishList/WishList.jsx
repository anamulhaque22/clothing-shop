import React from "react";
import WishListItem from "./WishListItem";
import EmptyWithList from "./EmptyWithList";

const WishList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 custom-shadow py-6 px-5 rounded-lg gap-5">
      <WishListItem />
      <WishListItem />
      <WishListItem />
    </div>
  );
};

export default WishList;
