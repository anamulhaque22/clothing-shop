"use client";
import Image from "next/image";
import { useState } from "react";
import FilterContainer from "./FilterContainer";
import ListOfProduct from "./ListOfProduct";

const ListOfProductPageLayout = ({ productFor }) => {
  const [renderProduct, setRenderProduct] = useState("New"); // new or recommended product
  const [isOpen, setIsOpen] = useState(false); // filter container
  return (
    <div className="container">
      <div class="drawer lg:auto-cols-auto lg:drawer-open">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {/* <!-- Page content here --> */}

          <div className="w-full lg:pl-12">
            <div className="flex justify-between py-12">
              <h3 className="capitalize font-causten-semi-bold text-[1.375rem] text-secondary">
                {productFor}
                {"'"} Clothing
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
                  htmlFor="my-drawer"
                  className="lg:hidden flex gap-2 items-center border px-4 py-2 rounded-lg"
                  onClick={() => setIsOpen(true)}
                >
                  Filter{" "}
                  <Image
                    src={"/images/icon/filtter.svg"}
                    width={18}
                    height={18}
                    alt="filter icon"
                  />{" "}
                </label>
              </div>
            </div>
            <ListOfProduct />
          </div>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          {/* filter container  */}
          <div
            className={
              " bg-white border-x border-b border-b-secondary-lighter border-x-secondary-lighter w-[300px]"
            }
          >
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <FilterContainer productFor={productFor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfProductPageLayout;
