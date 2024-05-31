import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderDetails = () => {
  return (
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
            Order no: #123456789
          </h3>
          <p className="font-causten-regular text-base text-[#BEBCBD]">
            Placed On 2 June 2023 2:40 PM
          </p>
        </div>
        <p className="font-causten-semi-bold text-lg text-secondary">
          <span className="text-[#807D7E]">Total:</span> $123.00
        </p>
      </div>

      {/* order status timeline  */}
      <div>
        <ul className="timeline justify-center">
          <li className="sm:w-1/5">
            <div className="timeline-middle">
              <div className="w-[20px] h-[20px] bg-secondary rounded-full"></div>
            </div>
            <div className="font-causten-semi-bold text-sm timeline-end">
              Order Placed
            </div>
            <hr />
          </li>
          <li className="sm:w-1/5">
            <hr />
            <div className="timeline-middle">
              <div className="w-[20px] h-[20px] bg-secondary rounded-full"></div>
            </div>
            <div className="font-causten-semi-bold text-sm timeline-end">
              Inprogres
            </div>
            <hr />
          </li>
          <li className="sm:w-1/5">
            <hr />
            <div className="timeline-middle">
              <div className="w-[20px] h-[20px] bg-secondary rounded-full border-[3px] border-[#CFCFCF]"></div>
            </div>
            <div className="font-causten-semi-bold text-sm timeline-end">
              Shipped
            </div>
            <hr />
          </li>
          <li className="sm:w-1/5">
            <hr />
            <div className="timeline-middle">
              <div className="w-[16px] h-[16px] bg-[#CFCFCF] rounded-full"></div>
            </div>
            <div className="font-causten-semi-bold text-sm timeline-end">
              Delivered
            </div>
          </li>
        </ul>
      </div>

      <div className="sm:w-4/5 mx-auto rounded-lg px-7 py-6 bg-[#F6F6F6]">
        <p className="font-causten-semi-bold text-base text-[#807D7E]">
          8 June 2023 3:40 PM{" "}
          <span className="text-secondary">
            Your order has been successfully verified.
          </span>
        </p>
      </div>

      <div className="flex flex-col bg-[#F6F6F6] px-8 py-7 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-x-5 justify-between">
          <div className="flex flex-col sm:flex-row gap-x-4">
            <Image
              src={"/images/details.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="image"
              className="w-full h-[250px] sm:w-[102px] sm:h-[102px] mb-3 sm:mb-0"
            />
            <div>
              <h4 className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
                Blue Flower Print Crop Top
              </h4>
              <h4 className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
                Color:{" "}
                <span className="font-causten-regular text-[#807D7E]">
                  Yellow
                </span>
              </h4>
            </div>
          </div>
          <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
            Qty: <span className="font-causten-regular text-[#807D7E]">1</span>
          </span>
          <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#807D7E]">
            $49.99
          </span>
        </div>
        <div className="custom-divider before:bg-[#BEBCBD] after:bg-[#BEBCBD]"></div>
        <div className="flex flex-col sm:flex-row gap-x-5 justify-between">
          <div className="flex flex-col sm:flex-row gap-x-4">
            <Image
              src={"/images/details.png"}
              width={0}
              height={0}
              sizes="100vw"
              alt="image"
              className="w-full h-[250px] sm:w-[102px] sm:h-[102px] mb-3 sm:mb-0"
            />
            <div>
              <h4 className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
                Blue Flower Print Crop Top
              </h4>
              <h4 className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
                Color:{" "}
                <span className="font-causten-regular text-[#807D7E]">
                  Yellow
                </span>
              </h4>
            </div>
          </div>
          <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#3C4242]">
            Qty: <span className="font-causten-regular text-[#807D7E]">1</span>
          </span>
          <span className="font-causten-bold text-lg sm:text-[1.375rem] text-[#807D7E]">
            $49.99
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
