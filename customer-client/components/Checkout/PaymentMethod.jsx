import Image from "next/image";

const PaymentMethod = () => {
  return (
    <div>
      <div className="mb-7">
        <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242]">
          Payment Method
        </h4>
        <p className="font-causten-regular text-base text-[3C4242]">
          All transactions are secure and encrypted.
        </p>
      </div>
      <div className="bg-[#F6F6F6] rounded-md py-9 px-7">
        <div className="flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="ripple-on"
            dataRippleDark="true"
          >
            <input
              id="ripple-on"
              name="ripple"
              type="radio"
              className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-full border border-[#3C4242] text-[#3C4242] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#3C4242] opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
          </label>
          <label
            className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242] flex flex-col"
            htmlFor="ripple-off"
          >
            Credit Card
            <span className="font-causten-medium text-base text-[#807D7E]">
              We accept all major credit cards.
            </span>
          </label>
        </div>

        {/* cart form with cart image  */}
        <div className="">
          <div className="flex gap-x-5 md:gap-x-6 py-7">
            <Image
              src={"/images/payment-cart/gpay.png"}
              height={46}
              width={80}
              layout="fixed"
              alt="google pay"
              className="h-[30px] w-[50px]"
            />
            <Image
              src={"/images/payment-cart/visa.png"}
              height={46}
              width={80}
              layout="fixed"
              alt="google pay"
              className="h-[30px] w-[50px]"
            />
            <Image
              src={"/images/payment-cart/paypal.png"}
              height={46}
              width={80}
              layout="fixed"
              alt="google pay"
              className="h-[30px] w-[50px]"
            />
            <Image
              src={"/images/payment-cart/paypas.png"}
              height={46}
              width={80}
              layout="fixed"
              alt="google pay"
              className="h-[30px] w-[50px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5">
            <input
              type="text"
              value=""
              placeholder="Card Number"
              className="input  input-bordered w-full "
            />
            <input
              type="text"
              value=""
              placeholder="Name of card"
              className="input  input-bordered w-full "
            />
            <input
              type="text"
              value=""
              placeholder="Expiration date (MM/YY)"
              className="input  input-bordered w-full "
            />
            <input
              type="text"
              value=""
              placeholder="Security Code"
              className="input  input-bordered w-full "
            />
          </div>
        </div>

        <div className="divider"></div>
        <div className="flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="ripple-off"
          >
            <input
              id="ripple-off"
              name="ripple"
              type="radio"
              className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-full border border-[#3C4242] text-[#3C4242] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#3C4242] opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle dataName="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
          </label>
          <label
            className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242] flex flex-col"
            htmlFor="ripple-off"
          >
            Cash on delivery
            <span className="font-causten-medium text-base text-[#807D7E]">
              Pay with cash upon delivery.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
