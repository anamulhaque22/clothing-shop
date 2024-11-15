"use client";
import { useOrderListQuery } from "@/app/(layout-with-header-footer)/(profile)/orders/queries/orders-query";
import { SORT_TYPE } from "@/constants/sort-type";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import moment from "moment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";

import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import OrderFilter from "./OrderFilter";

const t = Array.from({ length: 10 }, (_, i) => ({}));

const OrderdItems = () => {
  const [testData, setTestData] = useState(t);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) return JSON.parse(searchParamsSort);
    return { order: SORT_TYPE.DESC, orderBy: "id" };
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === SORT_TYPE.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SORT_TYPE.DESC : SORT_TYPE.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({ order: newOrder, orderBy: newOrderBy });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) return JSON.parse(searchParamsFilter);
    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useOrderListQuery({ filter, sort: { order, orderBy } });

  // const test = useOrderListQuery({ filter, sort: { order, orderBy } });
  // console.log(test);

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const result = useMemo(() => {
    const result = data?.pages.flatMap((page) => page?.data) ?? [];
    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <div className="overflow-x-auto rounded-md w-full font-causten-medium custom-shadow py-6 px-5">
      <div className="flex justify-between">
        <select className="select select-bordered w-full max-w-xs focus:outline-none  focus:bg-white">
          <option disabled selected>
            All Category
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>

        <OrderFilter />
      </div>
      <div className=" text-base w-full ">
        <TableVirtuoso
          style={{ height: 500 }}
          data={result}
          components={{
            Table: ({ style, ...props }) => (
              <table
                {...props}
                style={{ ...style, width: "100%", display: "table" }}
              />
            ),
            TableRow: ({ style, ...props }) => (
              <tr
                {...props}
                style={{
                  ...style,
                  borderBottomWidth: "1px",
                }}
              />
            ),
          }}
          endReached={handleScroll}
          overscan={20}
          useWindowScroll
          increaseViewportBy={400}
          fixedHeaderContent={() => (
            <tr className="text-secondary text-lg border-b">
              <th
                className="cursor-pointer text-left py-4 pl-2 pr-3 hover:bg-slate-500"
                onClick={() => handleRequestSort("id")}
              >
                <div className="flex items-center justify-between">
                  <div>#ID</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "id" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "id" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th
                className=" text-left cursor-pointer select-none py-4 pl-2 pr-3"
                onClick={() => handleRequestSort("createdAt")}
              >
                <div className="flex items-center justify-between">
                  <div>Order date</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "createdAt" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "createdAt" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="text-left pl-2 pr-3">Order Status</th>
              <th className="text-left pl-2 pr-3">Payment Status</th>
              <th
                className="cursor-pointer text-left py-4 pl-2 pr-3"
                onClick={() => handleRequestSort("totalAmount")}
              >
                <div className="flex items-center justify-between">
                  <div>Total Amount</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "totalAmount" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "totalAmount" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="text-left pl-2 pr-3">Action</th>
            </tr>
          )}
          itemContent={(index, order) => (
            <>
              <td className="pl-2 pr-3">{order?.id}</td>
              <td className="py-4 text-left pl-2 pr-3">
                {moment(order?.createdAt).format("MMMM DD, YYYY")}
              </td>
              <td className="text-left pl-2 pr-3">{order.status}</td>
              <td className="text-left pl-2 pr-3">{order?.payment?.status}</td>
              <td className="text-left pl-2 pr-3">${order.totalAmount}</td>
              <td className="text-left pl-2 pr-3">
                <Link
                  href={"/order-details"}
                  className="bg-primary text-white px-3 py-1 inline-block rounded-md"
                >
                  Order Details
                </Link>
              </td>
            </>
          )}
        ></TableVirtuoso>
      </div>
    </div>
  );
};

export default OrderdItems;
