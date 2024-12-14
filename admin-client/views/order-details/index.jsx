"use client";
import { ORDER_STATUS } from "@/constants/order-status";
import useToast from "@/hooks/useToast";
import {
  useGetOrderService,
  useUpdateOrderStatusService,
} from "@/services/api/services/order";
import HTTP_CODES from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { MdPrint } from "react-icons/md";
import BillingInfo from "./components/BillingInfo";
import CustomerInfo from "./components/CustomerInfo";
import OrderdProducts from "./components/OrderdProducts";
import ShippingInfo from "./components/ShippingInfo";

function OrderDetails() {
  const params = useParams();
  const fetchGetOrder = useGetOrderService();
  const fetchUpdateOrderStatus = useUpdateOrderStatusService();
  const [order, setOrder] = useState(null);
  const showToast = useToast();
  const [orderStatus, setOrderStatus] = useState(order?.status);

  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const getOrder = async () => {
      const { status, data: order } = await fetchGetOrder(orderId);

      if (status === HTTP_CODES.OK) {
        setOrder(order);
      }
    };
    getOrder();
  }, [orderId, fetchGetOrder]);

  const handleUpdateOrderStatus = async (orderStatus) => {
    const { status } = await fetchUpdateOrderStatus(orderId, orderStatus);

    if (status === HTTP_CODES.NO_CONTENT) {
      setOrder({
        ...order,
        status: orderStatus,
      });
      showToast("Order status updated successfully", "success");
    } else {
      showToast("Failed to update order status", "error");
    }
  };

  return (
    order && (
      <div className="pt-8 px-6">
        {/* order date */}
        <div className="bg-content-bg rounded-xl border border-bc">
          <div className="flex justify-between py-4 px-5">
            <div>
              <div className="flex text-text mb-1 gap-x-1">
                <FaCalendarDays className="text-2xl" />
                <p>
                  {moment(order?.createdAt).format("ddd, MMM D, YYYY, h:mmA")}
                </p>
              </div>
              <p className="text-[#adb5bd]">Order ID: {order.id}</p>
            </div>

            <div className="flex items-center gap-x-2">
              <div className="flex gap-x-1 items-stretch">
                <select
                  className="select select-bordered w-full max-w-xs focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary text-text"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={order?.status}
                >
                  <option value={""}>Order Status</option>
                  {Object.keys(ORDER_STATUS).map((key, index) => (
                    <option key={index} value={ORDER_STATUS[key]}>
                      {ORDER_STATUS[key]}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleUpdateOrderStatus(orderStatus)}
                  type="submit"
                  className="btn btn-primary !text-text !h-auto"
                >
                  Save
                </button>
              </div>

              <button className="btn bg-[#6c757d] border-[#6c757d] hover:bg-[#6c757d] ">
                <MdPrint className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
        {/* order date end  */}

        <div className="flex justify-between mt-5">
          <CustomerInfo user={order.user} />
          <ShippingInfo address={order?.shippingAddress} />
          <BillingInfo address={order?.billingAddress} />
        </div>

        <div className="flex justify-between mt-5 gap-x-5">
          <div className="w-[70%]">
            <OrderdProducts
              orderItems={order?.orderItems}
              successPayment={order?.successPayment ?? order?.payments?.[0]}
            />
          </div>
          <div className="self-start text-text text-sm w-[30%] bg-content-bg rounded-xl border border-bc p-4">
            <h4 className="font-bold mb-2">Payment info</h4>
            <div className="font-normal space-y-[5px]">
              <p>
                Payment Provider:{" "}
                {order?.successPayment
                  ? order?.successPayment?.payment_provider
                  : order?.payments?.[0].payment_provider}
              </p>
              <p>
                Payment Status:{" "}
                {order?.successPayment
                  ? order?.successPayment?.status
                  : order?.payments?.[0].status}
              </p>
              <div className="flex gap-x-1">
                {/* <FaCcMastercard className="text-2xl" /> */}
                {/* <p>Master Card **** **** 4768</p> */}
              </div>
              {/* <p>Business name: Grand Market LLC</p> */}
              {/* <p>Phone: +1 (800) 555-154-52</p>  */}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default withPageRequiredAuth(OrderDetails);
