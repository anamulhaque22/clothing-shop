"use client";
import Image from "next/image";
import Link from "next/link";
import MainNavLinks from "./MainNavLinks";
import { useState } from "react";
const MainNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border-b border-b-[#BEBCBD]">
        <div className="drawer z-50 container">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar">
              <div className="flex-1 px-2 mx-2">
                <a href="/">
                  <Image
                    src={"/images/logo.png"}
                    height={100}
                    width={100}
                    alt="logo"
                    priority={true}
                  />
                </a>
              </div>
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal font-causten-medium font-medium text-secondary-light text-xl">
                  {/* Navbar menu content here */}
                  <li className="text-secondary font-bold">
                    <Link href={"/"}>Shop</Link>
                  </li>

                  <li>
                    <Link href={"/products/Men"}>Men</Link>
                  </li>

                  <li>
                    <Link href={"/products/Women"}>Women</Link>
                  </li>

                  <li>
                    <Link href={"/products/combo"}>Combos</Link>
                  </li>
                  <li>
                    <Link href={"/products/joggers"}>Joggers</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-white font-causten-medium font-medium text-secondary-light text-xl">
              {/* Sidebar content here */}
              <li className="text-secondary font-bold">
                <Link href={"/"}>Shop</Link>
              </li>

              <li>
                <Link href={"/products/Men"}>Men</Link>
              </li>

              <li>
                <Link href={"/products/Women"}>Women</Link>
              </li>

              <li>
                <Link href={"/products/combo"}>Combos</Link>
              </li>
              <li>
                <Link href={"/products/joggers"}>Joggers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-b border-b-[#BEBCBD] hidden">
        <div className="container flex justify-between items-center py-5 relative">
          <div>
            <a href="/">
              <Image
                src={"/images/logo.png"}
                height={100}
                width={100}
                alt="logo"
                priority={true}
              />
            </a>
          </div>
          <ul className="flex flex-col items-center lg:flex-row gap-x-10 px-1 font-causten-medium font-medium text-secondary-light text-xl">
            <li className="text-secondary font-bold">
              <Link href={"/"}>Shop</Link>
            </li>

            <li>
              <Link href={"/products/Men"}>Men</Link>
            </li>

            <li>
              <Link href={"/products/Women"}>Women</Link>
            </li>

            <li>
              <Link href={"/products/combo"}>Combos</Link>
            </li>
            <li>
              <Link href={"/products/joggers"}>Joggers</Link>
            </li>
          </ul>
          <div className="relative flex items-center">
            <label className="absolute my-auto  left-5">
              <Image
                src={"/images/icon/search.svg"}
                alt="search icon"
                width={20}
                height={20}
              />
            </label>
            <input
              className="bg-off-white-light font-causten-regular text-secondary-light w-full rounded-lg focus:outline-none pl-12 py-3 text-base"
              type="text"
              placeholder="Search"
            />
          </div>

          <div>
            <ul className="flex space-x-3">
              <li className="p-3 bg-off-white-light rounded-lg">
                <Link href={"#"}>
                  <Image
                    src={"/images/icon/heart.svg"}
                    alt="user icon"
                    width={20}
                    height={20}
                  />
                </Link>
              </li>
              <li className="p-3 bg-off-white-light rounded-lg">
                <Link href={"#"}>
                  <Image
                    src={"/images/icon/user.svg"}
                    alt="user icon"
                    width={20}
                    height={20}
                  />
                </Link>
              </li>
              <li className="p-3 bg-off-white-light rounded-lg">
                <Link href={"#"}>
                  <Image
                    src={"/images/icon/shopping-cart.svg"}
                    alt="user icon"
                    width={20}
                    height={20}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
