"use client";
import { useCart } from "@/context/cart-context";
import { useGetHeaderCategoriesService } from "@/services/api/services/categories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const MainNav = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchCategories = useGetHeaderCategoriesService();
  const { cart } = useCart();

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
              <div className="relative hidden lg:flex items-center">
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
              {/* header icon */}
              <div className="hidden lg:block">
                <ul className="flex space-x-3">
                  <li className="p-3 bg-off-white-light rounded-lg">
                    <Link href={"/wish-list"}>
                      <Image
                        src={"/images/icon/heart.svg"}
                        alt="user icon"
                        width={20}
                        height={20}
                        className="w-auto"
                      />
                    </Link>
                  </li>
                  <li className="p-3 bg-off-white-light rounded-lg">
                    <Link href={"/my-profile"}>
                      <Image
                        src={"/images/icon/user.svg"}
                        alt="user icon"
                        width={20}
                        height={20}
                      />
                    </Link>
                  </li>
                  <li className="p-3 bg-off-white-light rounded-lg indicator">
                    {cart?.length > 0 && (
                      <span className="indicator-item badge bg-primary text-white w-5 h-5">
                        {cart?.length}
                      </span>
                    )}

                    <Link href={"/cart"}>
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
    </>
  );
};

export default MainNav;
