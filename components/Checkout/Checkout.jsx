"use client";
import React, { useState } from "react";
import SectionHeading from "../Typography/SectionHeading";
import InputText from "../Input/InputText";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Link from "next/link";
import Image from "next/image";

const Checkout = () => {
  const INITIAL_BILLING_OBJ = {
    firstName: "",
    lastName: "",
    country: "",
    companyName: "",
    streetAddress: "",
    aptSuiteUnit: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };

  // const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")
  const [loginObj, setLoginObj] = useState(INITIAL_BILLING_OBJ);

  // const submitForm = (e) =>{
  //     e.preventDefault()
  //     setErrorMessage("")

  //     if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
  //     if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
  //     else{
  //         setLoading(true)
  //         // Call API to check user credentials and save token in localstorage
  //         localStorage.setItem("token", "DumyTokenHere")
  //         setLoading(false)
  //         window.location.href = '/app/welcome'
  //     }
  // }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };
  return (
    <div className="container mb-11 md:mb-24">
      <div className="flex flex-col md:flex-row gap-x-8">
        <div className="w-full lg:w-[63%]">
          <div className="text-[1.125rem] font-causten-medium breadcrumbs">
            <ul className="mb-3">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>My Account</a>
              </li>
              <li>
                <a>Check Out</a>
              </li>
            </ul>
          </div>
          {/* section heading */}
          <div className="py-7 lg:py-10">
            <SectionHeading text="Check Out" />
            <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242] mt-2">
              Billing Details
            </h4>
          </div>

          {/* checkout form  */}
          <div>
            <form action="">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InputText
                  type="text"
                  defaultValue={loginObj.firstName}
                  updateType="firstName"
                  containerStyle="mt-0"
                  labelTitle="First Name*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.lastName}
                  updateType="lastName"
                  containerStyle="mt-0"
                  labelTitle="Last Name*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.country}
                  updateType="country"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="Country*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.companyName}
                  updateType="companyName"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="Company Name"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.streetAddress}
                  updateType="streetAddress"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="Street Address*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.aptSuiteUnit}
                  updateType="aptSuiteUnit"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="Apt, Suite, Unit"
                  updateFormValue={updateFormValue}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6">
                <InputText
                  type="text"
                  defaultValue={loginObj.city}
                  updateType="city"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="City*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.state}
                  updateType="state"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="State*"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="text"
                  defaultValue={loginObj.postalCode}
                  updateType="postalCode"
                  containerStyle="mt-0 sm:mt-6"
                  labelTitle="Postal Code*"
                  updateFormValue={updateFormValue}
                />
              </div>
              <InputText
                type="text"
                defaultValue={loginObj.phone}
                updateType="phone"
                containerStyle="mt-0 sm:mt-6"
                labelTitle="Phone*"
                updateFormValue={updateFormValue}
              />

              <input
                className="btn mt-7 mb-5"
                type="button"
                value="Continue to delivery"
              />
              <div class="flex items-center">
                <label
                  class="relative flex items-center rounded-full cursor-pointer"
                  for="login"
                  dataRippleDark="true"
                >
                  <input
                    id="login"
                    type="checkbox"
                    class="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
                  />
                  <div class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </label>
                <label
                  class="ml-3 mt-px font-causten-regular text-lg cursor-pointer select-none"
                  for="login"
                >
                  Save my information for a faster checkout
                </label>
              </div>
            </form>

            <div className="custom-divider"></div>

            <ShippingAddress />

            <div className="custom-divider"></div>

            <ShippingMethod />

            <div className="custom-divider"></div>

            <PaymentMethod />
          </div>
        </div>
        {/* order summery  */}
        <div className="w-full lg:w-[43%]">
          <div className="shadow-md shadow-[#EDEEF2] px-5 py-10 mt-6 lg:mt-28">
            <h3 className="font-core-sans-bold text-2xl text-[#3C4242]">
              Order Summary
            </h3>
            <div className="custom-divider"></div>

            <div className="flex flex-col">
              <div className="flex gap-x-5 items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <Image
                    className="rounded-md"
                    src={"/images/details.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "65px", height: "65px" }}
                    alt="image"
                  />
                  <div>
                    <div className="flex">
                      <h4 className="font-causten-bold text-sm text-[#3C4242]">
                        Blue Flower Print Crop Top{" "}
                      </h4>
                      <span className="font-causten-bold text-sm text-[#807D7E]">
                        x 1
                      </span>
                    </div>
                    <h4 className="font-causten-bold text-sm text-[#3C4242]">
                      Color: <span className="text-[#807D7E]">Yellow</span>
                    </h4>
                  </div>
                </div>
                <span className="font-causten-bold text-sm text-[#807D7E]">
                  $49.99
                </span>
              </div>
              <div className="custom-divider"></div>
              <div className="flex gap-x-5 items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <Image
                    className="rounded-md"
                    src={"/images/details.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "65px", height: "65px" }}
                    alt="image"
                  />
                  <div>
                    <div className="flex">
                      <h4 className="font-causten-bold text-sm text-[#3C4242]">
                        Blue Flower Print Crop Top{" "}
                      </h4>
                      <span className="font-causten-bold text-sm text-[#807D7E]">
                        x 1
                      </span>
                    </div>
                    <h4 className="font-causten-bold text-sm text-[#3C4242]">
                      Color: <span className="text-[#807D7E]">Yellow</span>
                    </h4>
                  </div>
                </div>
                <span className="font-causten-bold text-sm text-[#807D7E]">
                  $49.99
                </span>
              </div>
              <div className="custom-divider"></div>
              <div className="flex gap-x-5 items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <Image
                    className="rounded-md"
                    src={"/images/details.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "65px", height: "65px" }}
                    alt="image"
                  />
                  <div>
                    <div className="flex">
                      <h4 className="font-causten-bold text-sm text-[#3C4242]">
                        Blue Flower Print Crop Top{" "}
                      </h4>
                      <span className="font-causten-bold text-sm text-[#807D7E]">
                        x 1
                      </span>
                    </div>
                    <h4 className="font-causten-bold text-sm text-[#3C4242]">
                      Color: <span className="text-[#807D7E]">Yellow</span>
                    </h4>
                  </div>
                </div>
                <span className="font-causten-bold text-sm text-[#807D7E]">
                  $49.99
                </span>
              </div>

              <div className="custom-divider"></div>
              <div>
                <div className="flex gap-x-5 items-center justify-between">
                  <h4 className="font-causten-bold text-lg text-[#3C4242]">
                    Subtotal{" "}
                    <span className="font-causten-semi-bold text-[#807D7E]">
                      (3 items)
                    </span>
                  </h4>
                  <span className="font-causten-bold text-lg text-[#3C4242]">
                    $49.99
                  </span>
                </div>
                <div className="flex gap-x-5 items-center justify-between">
                  <h4 className="font-causten-bold text-lg text-[#3C4242]">
                    Savings
                  </h4>
                  <span className="font-causten-bold text-lg text-[#3C4242]">
                    -$5.00
                  </span>
                </div>
              </div>
              <div className="custom-divider"></div>
              <div className="flex gap-x-5 items-center justify-between">
                <h4 className="font-causten-bold text-lg text-[#3C4242]">
                  Shipping
                </h4>
                <span className="font-causten-bold text-lg text-[#3C4242]">
                  -$5.00
                </span>
              </div>
              <div className="custom-divider"></div>
              <div className="flex gap-x-5 items-center justify-between">
                <h4 className="font-causten-bold text-lg text-[#3C4242]">
                  Total
                </h4>
                <span className="font-causten-bold text-lg text-[#3C4242]">
                  $478.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link href={"/pay"} className="btn mt-8 lg:mt-10">
        Pay Now
      </Link>
    </div>
  );
};

export default Checkout;
