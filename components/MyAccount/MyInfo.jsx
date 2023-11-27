"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AccountSummery from "./AccountSummery";
import PersonalDetails from "./PersonalDetails";
import MyAddress from "./MyAddress";
import UpdateDetails from "./UpdateDetails";
import WishList from "../WishList/WishList";

const MyInfo = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [isOpen, setIsOpen] = useState(false); // filter container
  return (
    <div className="container">
      <div class="drawer lg:auto-cols-auto lg:drawer-open mt-5 gap-x-5">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {/* <!-- Page content here --> */}

          <div className="">
            <div className="hidden justify-between py-12">
              <div className="flex gap-6">
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
            <WishList />
            <AccountSummery />
            <PersonalDetails />
            <UpdateDetails />
            <MyAddress />
          </div>
        </div>
        <div class="custom-shadow drawer-side">
          <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul className="user-account menu w-80 min-h-full">
            <li>
              <Link
                href={"/"}
                className="bg-[#F6F6F6] hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg"
              >
                <Image
                  src={"/images/icon/user.svg"}
                  width={0}
                  height={0}
                  alt="image"
                  className="w-[20px] h-[20px] mr-2"
                />
                My Info
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
              >
                <Image
                  src={"/images/icon/user.svg"}
                  width={0}
                  height={0}
                  alt="image"
                  className="w-[20px] h-[20px] mr-2"
                />
                My Info
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
