import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  return (
    <>
      <div className="container mb-6">
        <div className="py-5">
          <div className="py-0 text-[1.125rem] font-causten-medium breadcrumbs">
            <ul className="mb-3">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
            </ul>
          </div>
          <p className="text-sm font-causten-regular text-[#807D7E]">
            Please fill in the fields below and click place order to complete
            your purchase!
          </p>
          <p className="text-sm font-causten-regular text-[#807D7E]">
            Already registered?{" "}
            <Link href="/login" className="text-[#8A33FD] font-bold">
              Please login here
            </Link>
          </p>
        </div>

        <div className="md:hidden">
          <div className="py-3 bg-[#3C4242] text-white pl-4 mb-5">Product</div>
          <div className="flex gap-5 pb-5">
            <div className="">
              <div className="w-[105px] h-[120px]">
                <Image
                  className="rounded-md"
                  src={"/images/details.png"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "105px", height: "120px" }}
                  alt="image"
                />
              </div>
            </div>
            <div>
              <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                Blue Flower Print Crop Top
              </div>
              <div className="text-sm text-[#807D7E]">Yellow / M</div>
              <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                $49.00
              </div>
              <div className="w-[100px]  flex justify-evenly bg-[#F6F6F6] font-causten-medium text-xs text-[#3C4242] py-2 rounded-lg increase-decrease-btn">
                <button className="">
                  <svg
                    width="11"
                    height="2"
                    viewBox="0 0 11 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2412 1L1 1"
                      stroke="#3C4242"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  className="bg-[#F6F6F6] text-[#3C4242] w-[30px] text-center font-medium focus:outline-none"
                  type="number"
                  value={1}
                />
                <button className="">
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                      stroke="#3C4242"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-5 pb-5">
            <div className="">
              <div className="w-[105px] h-[120px]">
                <Image
                  className="rounded-md"
                  src={"/images/details.png"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "105px", height: "120px" }}
                  alt="image"
                />
              </div>
            </div>
            <div>
              <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                Blue Flower Print Crop Top
              </div>
              <div className="text-sm text-[#807D7E]">Yellow / M</div>
              <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                $49.00
              </div>
              <div className="w-[100px]  flex justify-evenly bg-[#F6F6F6] font-causten-medium text-xs text-[#3C4242] py-2 rounded-lg increase-decrease-btn">
                <button className="">
                  <svg
                    width="11"
                    height="2"
                    viewBox="0 0 11 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2412 1L1 1"
                      stroke="#3C4242"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  className="bg-[#F6F6F6] text-[#3C4242] w-[30px] text-center font-medium focus:outline-none"
                  type="number"
                  value={1}
                />
                <button className="">
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                      stroke="#3C4242"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto hidden md:block">
          <table className="table">
            {/* head */}
            <thead className="bg-[#3C4242] text-white font-causten-semi-bold text-[1.125rem]">
              <tr>
                <th className="py-6">PRODUCT DETAILS</th>
                <th className="hidden lg:table-cell">PRICE</th>
                <th>QUANTITY</th>
                <th>SHIPPING</th>
                <th>SUBTOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="border-b-0">
                <div className="p-10"></div>
              </tr> */}
              {/* row 1 */}
              <tr className="border-[#BEBCBD]">
                <td>
                  <div className="flex gap-5 py-10">
                    <div className="">
                      <div className="md:w-[80px] lg:w-[105px] lg:h-[120px]">
                        <Image
                          className="rounded-md"
                          src={"/images/details.png"}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "105px", height: "120px" }}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                        Blue Flower Print Crop Top
                      </div>
                      <div className="text-sm text-[#807D7E]">
                        Color: Yellow
                      </div>
                      <div className="text-sm text-[#807D7E]">Size: M</div>
                      <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                        $49.00
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell">
                  <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                    $49.00
                  </div>
                </td>
                <td>
                  <div className="w-[100px]  flex justify-evenly bg-[#F6F6F6] font-causten-medium text-xs text-[#3C4242] py-2 rounded-lg increase-decrease-btn">
                    <button className="">
                      <svg
                        width="11"
                        height="2"
                        viewBox="0 0 11 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.2412 1L1 1"
                          stroke="#3C4242"
                          strokeWidth="1.03964"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      className="bg-[#F6F6F6] text-[#3C4242] w-[30px] text-center font-medium focus:outline-none"
                      type="number"
                      value={1}
                    />
                    <button className="">
                      <svg
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                          stroke="#3C4242"
                          strokeWidth="1.03964"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <th>
                  <p className="font-causten-bold text-[1.125rem] text-[#BEBCBD]">
                    FREE
                  </p>
                </th>
                <th>
                  <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                    $49.00
                  </div>
                </th>
                <th>delete</th>
              </tr>
              <tr className="">
                <td>
                  <div className="flex gap-5 py-10">
                    <div className="">
                      <div className="md:w-[80px] lg:w-[105px] lg:h-[120px]">
                        <Image
                          className="rounded-md"
                          src={"/images/details.png"}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "105px", height: "120px" }}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                        Blue Flower Print Crop Top
                      </div>
                      <div className="text-sm text-[#807D7E]">
                        Color: Yellow
                      </div>
                      <div className="text-sm text-[#807D7E]">Size: M</div>
                      <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                        $49.00
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:table-cell">
                  <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                    $49.00
                  </div>
                </td>
                <td>
                  <div className="w-[100px]  flex justify-evenly bg-[#F6F6F6] font-causten-medium text-xs text-[#3C4242] py-2 rounded-lg increase-decrease-btn">
                    <button className="">
                      <svg
                        width="11"
                        height="2"
                        viewBox="0 0 11 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.2412 1L1 1"
                          stroke="#3C4242"
                          strokeWidth="1.03964"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      className="bg-[#F6F6F6] text-[#3C4242] w-[30px] text-center font-medium focus:outline-none"
                      type="number"
                      value={1}
                    />
                    <button className="">
                      <svg
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                          stroke="#3C4242"
                          strokeWidth="1.03964"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <th>
                  <p className="font-causten-bold text-[1.125rem] text-[#BEBCBD]">
                    FREE
                  </p>
                </th>
                <th>
                  <div className="font-causten-bold font-bold text-[1.125rem] text-[#3C4242]">
                    $49.00
                  </div>
                </th>
                <th>delete</th>
              </tr>
              {/* <tr className="border-t-0">
                <div className="p-10"></div>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      {/* apply coupon, Grand total, proceed to checkout  */}

      <div className="container mb-8 sm:mb-0">
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="pt-8">
            <h3 className="font-causten-semi-bold text-2xl text-[#3C4242]">
              Discount Codes
            </h3>
            <p>Enter your coupon code if you have one</p>
            <form action="" className="flex py-7">
              <input type="text" className="border rounded-l-md" />
              <input
                type="submit"
                value={"Apply Coupon"}
                className="rounded-r-md bg-[#8A33FD] text-[1.125rem] text-white px-7 py-2 font-causten-medium"
              />
            </form>
            <Link
              href={"/shop"}
              className="t-btn inline-block text-black font-causten-semi-bold text-base"
            >
              Continue Shopping
            </Link>
          </div>
          <div className=" bg-[#F3F3F3] text-center pt-8 pb-10">
            <div className="px-4 sm:px-20">
              <p className="font-causten-medium text-[1.375rem] flex justify-between gap-5">
                <span>Sub Total</span> <span>$513.00</span>
              </p>
              <p className="font-causten-medium text-[1.375rem] flex justify-between gap-5">
                <span>Shipping</span> <span>Free</span>
              </p>
              <p className="font-causten-bold text-[1.375rem] flex justify-between gap-5">
                <span>Grand Total</span> <span>$513.00</span>
              </p>
            </div>

            <div className="divider before:bg-[#BEBCBD] after:bg-[#BEBCBD]"></div>
            <Link className="btn" href={"/checkout"}>
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
