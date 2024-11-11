import { Controller } from "react-hook-form";
import InputText from "../Input/InputText";

export default function BillingAddressForm({ isShipping = false }) {
  return (
    <form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <InputText
          name={"firstName"}
          type="text"
          containerStyle="mt-0"
          labelTitle="First Name*"
        />

        <InputText
          name={"lastName"}
          type="text"
          containerStyle="mt-0"
          labelTitle="Last Name*"
        />

        <InputText
          name="streetAddress"
          type="text"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="Street Address*"
        />

        <InputText
          name="aptSuiteUnit"
          type="text"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="Apt, Suite, Unit"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <InputText
          name="city"
          type="text"
          updateType="city"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="City*"
        />

        <InputText
          name="phone"
          type="text"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="Phone*"
        />
      </div>
      {/* <input
                  className="btn mt-7 mb-5"
                  type="button"
                  value="Continue to delivery"
                /> */}
      {!isShipping && (
        <div className="flex items-center">
          <label
            className="relative flex items-center rounded-full cursor-pointer"
            htmlFor="login"
          >
            <Controller
              name="saveInfoForFasterCheckout"
              defaultValue={false}
              render={({ field, fieldState }) => (
                <>
                  <input
                    name="saveInfoForFasterCheckout"
                    id="login"
                    type="checkbox"
                    className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
                    {...field}
                  />
                  {fieldState?.error?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
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
            className="ml-3 mt-px font-causten-regular text-lg cursor-pointer select-none"
            htmlFor="login"
          >
            Save my information for a faster checkout
          </label>
        </div>
      )}
    </form>
  );
}
