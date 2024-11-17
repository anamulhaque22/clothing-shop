"use client";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetOrderService } from "@/services/api/services/order";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderTimeLime from "./OrderTimeLime";

const OrderDetails = () => {
  const params = useParams();
  const fetchGetOrder = useGetOrderService();
  const [order, setOrder] = useState(null);
  console.log({ params });
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;

  console.log({ orderId });

  useEffect(() => {
    const getOrder = async () => {
      const { status, data: order } = await fetchGetOrder(orderId);

      if (status === HTTP_CODES.OK) {
        setOrder(order);
      }
    };
    getOrder();
  }, [orderId, fetchGetOrder]);

  return order ? (
    <div className="flex flex-col gap-y-10 custom-shadow py-6 px-5 rounded-lg">
      <div className="">
        <h3 className="font-core-sans-bold text-[1.75rem] flex items-center">
          <Link href={"/orders"} className="mr-2">
            <Image
              src={"/images/icon/chevron/left.svg"}
              width={20}
              height={10}
              alt="left arrow"
            />
          </Link>
          Order Details
        </h3>
      </div>
      <div className="flex justify-between items-center bg-[#F6F6F6] px-8 py-7 rounded-lg">
        <div>
          <h3 className="font-causten-semi-bold text-xl text-secondary">
            Order no: #{order.id}
          </h3>
          <p className="font-causten-regular text-base text-[#BEBCBD]">
            Placed On {moment(order?.createdAt).format("D MMMM YYYY h:mm A")} 2
          </p>
        </div>
        <p className="font-causten-semi-bold text-lg text-secondary">
          <span className="text-[#807D7E]">Total:</span> ${order.totalAmount}
        </p>
      </div>

      {/* order status timeline  */}
      <OrderTimeLime status={order.status} updatedAt={order?.updatedAt} />

      <div className="flex flex-col bg-[#F6F6F6] px-8 py-7 rounded-lg">
        {order?.orderItems?.map((item, index) => {
          const isLastItem = index === order?.orderItems?.length - 1;
          return (
            <>
              <div
                className="flex flex-col sm:flex-row gap-x-5 justify-between"
                key={item.id}
              >
                <div className="flex flex-col sm:flex-row gap-x-4">
                  <Image
                    src={item?.product?.images?.[0]?.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="image"
                    className="w-full h-[250px] sm:w-[102px] sm:h-[102px] mb-3 sm:mb-0"
                  />
                  <div>
                    <h4 className="font-causten-bold text-base text-[#3C4242]">
                      {item?.product?.title}
                    </h4>
                    <p className="font-causten-bold text-base text-[#3C4242]">
                      Color:{" "}
                      <span className="font-causten-regular text-[#807D7E]">
                        {item?.color}
                      </span>
                    </p>
                    <p className="font-causten-bold text-base text-[#3C4242]">
                      Size:{" "}
                      <span className="font-causten-regular text-[#807D7E]">
                        {item?.size}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
                  Qty:{" "}
                  <span className="font-causten-regular text-[#807D7E]">
                    {item?.quantity}
                  </span>
                </span>
                <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#807D7E]">
                  ${item?.price * item?.quantity}
                </span>
              </div>
              <div
                className={`  ${
                  isLastItem
                    ? "hidden"
                    : "custom-divider before:bg-[#BEBCBD] after:bg-[#BEBCBD]"
                }`}
              ></div>
            </>
          );
        })}
      </div>
    </div>
  ) : (
    <h3 className="text-center"> No order found! </h3>
  );
};

export default withPageRequiredAuth(OrderDetails);
