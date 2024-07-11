import Image from "next/image";
import React from "react";

const WishListItem = () => {
  return (
    <div className="flex gap-x-5 items-center justify-between gap-4 custom-shadow p-4 rounded-md">
      <div className="flex items-center gap-x-4">
        <Image
          className="rounded-md"
          src={"/images/details.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "150px", height: "150px" }}
          alt="image"
        />
        <div>
          <h4 className="font-causten-bold text-lg text-[#3C4242]">
            Blue Flower Print Crop Top
          </h4>
          <h4 className="font-causten-bold text-lg text-[#3C4242]">
            Price: <span className="text-[#807D7E]">$49.99</span>
          </h4>
          <h4 className="font-causten-bold text-lg text-[#3C4242]">
            Color: <span className="text-[#807D7E]">Yellow</span>
          </h4>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <Image
          src={"/images/icon/xicon.png"}
          width={25}
          height={25}
          alt="image"
        />

        <button className="">
          <Image
            src={"/images/icon/shopping-cart.svg"}
            alt="user icon"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
