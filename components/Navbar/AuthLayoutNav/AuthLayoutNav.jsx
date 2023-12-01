import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayoutNav = () => {
  return (
    <div className="container">
      <div className="border-b border-b-[#BEBCBD]">
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
    </div>
  );
};

export default AuthLayoutNav;
