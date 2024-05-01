"use client";
import Image from "next/image";
import { useState } from "react";
import ListOfProduct from "./ListOfProduct";

export default function LayoutContent({ productCategory }) {
  const [renderProduct, setRenderProduct] = useState("New"); // new or recommended product
  return (
    <div className="drawer-content">
      {/* <!-- Page content here --> */}

      <div className="w-full lg:pl-12">
        <div className="flex justify-between py-12">
          <h3 className="capitalize font-causten-semi-bold text-[1.375rem] text-secondary">
            {productCategory} Clothing
          </h3>
          <div className="flex gap-6">
            <ul className="flex gap-6 font-causten-semi-bold text-[1.375rem] text-[#3F4646]">
              <li
                className={`${
                  renderProduct === "New" ? "text-primary" : " "
                } cursor-pointer`}
                onClick={() => setRenderProduct("New")}
              >
                New
              </li>
              <li
                className={`${
                  renderProduct === "Recommended" ? "text-primary" : " "
                } cursor-pointer`}
                onClick={() => setRenderProduct("Recommended")}
              >
                Recommended
              </li>
            </ul>
            <label
              htmlFor="product-filter-drawer"
              className="lg:hidden flex gap-2 items-center border px-4 py-2 rounded-lg"
              //   onClick={() => setIsOpen(true)}
            >
              Filter{" "}
              <Image
                src={"/images/icon/Filtter.svg"}
                width={18}
                height={18}
                alt="filter icon"
              />{" "}
            </label>
          </div>
        </div>
        <ListOfProduct productCategory={productCategory} />
      </div>
    </div>
  );
}
