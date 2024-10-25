import { FaCalendarDays, FaCcMastercard } from "react-icons/fa6";
import { MdPrint } from "react-icons/md";
import CustomerInfo from "./components/CustomerInfo";
import DeliverTo from "./components/DeliverTo";
import OrderInfo from "./components/OrderInfo";
import OrderdProducts from "./components/OrderdProducts";

export default function OrderDetails() {
  return (
    <div>
      {/* order date */}
      <div className="">
        <div className="flex justify-between border-b border-bc py-4 px-5">
          <div>
            <div className="flex text-text mb-1 gap-x-1">
              <FaCalendarDays className="text-2xl" />
              <p>Wed, Aug 13, 2024, 4:34PM</p>
            </div>
            <p className="text-[#adb5bd]">Order ID: 2423</p>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="flex gap-x-1 items-stretch">
              <select className="select h-full select-bordered w-full max-w-lg focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary text-text">
                <option disabled selected>
                  Normal
                </option>
                <option>Normal Apple</option>
                <option>Normal Orange</option>
                <option>Normal Tomato</option>
              </select>
              <button
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

      <div className="flex justify-between py-6 px-4">
        <CustomerInfo />
        <OrderInfo />
        <DeliverTo />
      </div>

      <div className="flex justify-between py-6 px-4 gap-x-5">
        <div className="w-[70%]">
          <OrderdProducts />
        </div>
        <div className="bg-[#F7F8F9] dark:bg-[#32394E] p-4 self-start rounded-md text-text text-sm w-[30%]">
          <h4 className="font-bold mb-2">Payment info</h4>
          <div className="font-normal space-y-[5px]">
            <div className="flex gap-x-1">
              <FaCcMastercard className="text-2xl" />
              <p>Master Card **** **** 4768</p>
            </div>
            <p>Business name: Grand Market LLC</p>
            <p>Phone: +1 (800) 555-154-52</p>
          </div>
        </div>
      </div>
    </div>
  );
}
