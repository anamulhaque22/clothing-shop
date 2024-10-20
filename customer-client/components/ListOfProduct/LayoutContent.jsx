"use client";
import { useProductListQuery } from "@/app/(layout-with-header-footer)/products/queries/products-queries";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListOfProduct from "./ListOfProduct";

export default function LayoutContent({ productCategory }) {
  const [renderProduct, setRenderProduct] = useState("New"); // new or recommended product
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = useMemo(() => {
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const size = searchParams.get("size");

    const filterPamams = {
      category: category ?? null,
      minPrice: minPrice ?? null,
      maxPrice: maxPrice ?? null,
      size: size ?? null,
    };

    return filterPamams;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useProductListQuery(filter);

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (scrollHeight - scrollTop <= clientHeight + 300) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, [handleScroll]);

  const result = useMemo(() => {
    console.log({ data });
    const result = data?.pages.flatMap((page) => page?.data) ?? null;
    console.log({ result });
    if (result) {
      return removeDuplicatesFromArrayObjects(result, "id");
    }
    return null;
  }, [data]);

  return (
    <div className="drawer-content">
      {/* <!-- Page content here --> */}

      <div className="w-full lg:pl-12">
        <div className="flex items-center justify-between py-6">
          <h3 className="capitalize font-causten-semi-bold text-base sm:text-[1.375rem] text-secondary">
            {productCategory ? productCategory : "All "} Clothing
          </h3>
          <div className="flex items-center gap-x-5 md:gap-x-6">
            <ul className="flex gap-4 md:gap-6 font-causten-semi-bold text-base sm:text-[1.375rem] text-[#3F4646]">
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
        <ListOfProduct productCategory={productCategory} result={result} />
      </div>
    </div>
  );
}
