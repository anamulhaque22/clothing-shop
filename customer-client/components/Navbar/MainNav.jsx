"use client";

import { useCart } from "@/context/cart/useCart";
import { useWishlist } from "@/context/wish-list/use-wish-list";
import { useGetHeaderCategoriesService } from "@/services/api/services/categories";
import useAuth from "@/services/auth/use-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";

const MainNav = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = useGetHeaderCategoriesService();
  const { cart } = useCart();
  const { wishlist, loading } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    async function getCategories() {
      const { data, status } = await fetchCategories();

      if (status === 200) {
        setCategories(data);
      }
    }
    getCategories();
  }, [fetchCategories]);

  return (
    <>
      <div className="border-b border-b-[#BEBCBD]">
        <div className="drawer z-50 container">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar justify-between">
              <div className="">
                {/* logo */}
                <a href="/">
                  <Image
                    src={"/images/logo.png"}
                    height={100}
                    width={100}
                    alt="logo"
                    priority={true}
                    className="w-auto h-auto"
                  />
                </a>
              </div>
              {/* menu bar icon to open can cole mobile menu */}
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className=""
                >
                  <Image
                    src={"/images/icon/menu.png"}
                    width={24}
                    height={24}
                    alt="menu bar icon"
                  />
                </label>
              </div>
              {/* desktop menu items */}
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal font-causten-medium font-medium text-secondary-light text-xl">
                  {/* Navbar menu content here */}
                  <li className="text-secondary font-bold">
                    <Link
                      className="active:!bg-transparent active:!text-secondary-light"
                      href={"/"}
                    >
                      Shop
                    </Link>
                  </li>

                  {categories
                    .filter((c) => c.isVisibleInMenu)
                    .map((c) => (
                      <li key={c.id}>
                        <Link
                          className="active:!bg-transparent active:!text-secondary-light"
                          href={`/products/${c.id}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              {/* header search bar  */}
              {/* <div className="relative hidden lg:flex items-center">
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
              </div> */}
              {/* header icon */}

              <div className="hidden lg:block">
                <ul className="flex space-x-3">
                  {!!user && (
                    <>
                      <li className="p-3 bg-off-white-light rounded-lg indicator">
                        {wishlist?.length > 0 && (
                          <span className="indicator-item badge bg-primary text-white w-5 h-5">
                            {wishlist?.length}
                          </span>
                        )}
                        <Link href={"/wish-list"}>
                          <FaRegHeart size={20} />
                        </Link>
                      </li>
                      <li className="p-3 bg-off-white-light rounded-lg">
                        <Link href={"/my-profile"}>
                          <LuUser2 size={20} />
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="p-3  rounded-lg indicator">
                    {cart?.length > 0 && (
                      <span className="indicator-item badge bg-primary text-white w-5 h-5">
                        {cart?.length}
                      </span>
                    )}

                    <Link href={"/cart"}>
                      <FiShoppingCart size={20} />
                    </Link>
                  </li>
                  {!!user ? null : (
                    <li className="  rounded-lg indicator">
                      <Link
                        href={"/login"}
                        className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-7 py-2 text-white"
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* mobile menu */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full bg-white font-causten-medium font-medium text-secondary-light text-xl">
              <li className="">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="p-0 flex justify-end"
                >
                  <Image
                    src={"/images/icon/menu-close.png"}
                    width={18}
                    height={18}
                    alt="menu bar icon"
                  />
                </label>
              </li>
              {/* Sidebar content here */}
              <li className="text-secondary font-bold">
                <Link href={"/"}>Shops</Link>
              </li>
              {categories
                .filter((c) => c.isVisibleInMenu)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      className="active:!bg-transparent active:!text-secondary-light"
                      href={`/products/${c.id}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}

              <li className="text-secondary font-bold">
                {!!user && (
                  <ul className="menu menu-horizontal rounded-box mobile-icon">
                    <li className=" rounded-lg indicator">
                      <div>
                        {wishlist?.length > 0 && (
                          <span className="indicator-item badge bg-primary text-white w-5 h-5">
                            {cart?.length}
                          </span>
                        )}
                        <Link href={"/wish-list"}>
                          <FaRegHeart size={20} />
                        </Link>
                      </div>
                    </li>
                    <li className=" rounded-lg">
                      <Link href={"/my-profile"}>
                        <LuUser2 size={20} />
                      </Link>
                    </li>
                    <li className=" rounded-lg indicator">
                      <div>
                        {cart?.length > 0 && (
                          <span className="indicator-item badge bg-primary text-white w-5 h-5">
                            {cart?.length}
                          </span>
                        )}

                        <Link href={"/cart"}>
                          <FiShoppingCart size={20} />
                        </Link>
                      </div>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
