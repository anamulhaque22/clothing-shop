import Image from "next/image";
import React from "react";

const WishList = () => {
  return (
    <div className="grid grid-cols-2 custom-shadow mt-6 py-6 px-5 rounded-lg">
      <div className="flex gap-x-5 items-center justify-between gap-4 custom-shadow p-4">
        <div className="flex items-center gap-x-4">
          <Image
            className="rounded-md"
            src={"/images/details.png"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "110px", height: "110px" }}
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
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2 self-end"
          />

          <button className="btn text-base">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default WishList;
