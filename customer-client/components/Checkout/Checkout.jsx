"use client";
import { useGetPaymentIntent } from "@/services/api/services/payment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import SectionHeading from "../Typography/SectionHeading";
import BillingAddressForm from "./BillingAddressForm";
import OrderSummery from "./OrderSummery";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from "./ShippingMethod";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const billingAddressValidationSchema = yup.object().shape({
  billingAddressId: yup.string().optional(),

  firstName: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("First Name is required"),
  }),

  lastName: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("Last Name is required"),
  }),

  streetAddress: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("Street Address is required"),
  }),

  aptSuiteUnit: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("Apt, Suite, Unit is required"),
  }),

  city: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("City is required"),
  }),

  phone: yup.string().when("billingAddressId", {
    is: (v) => !v,
    then: (schema) => schema.required("Phone is required"),
  }),

  saveInfoForFasterCheckout: yup.boolean().optional(),
});

const Checkout = () => {
  const fetchPaymentIntent = useGetPaymentIntent();
  const [isShippingAddressDifferent, setIsShippingAddressDifferent] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    clientSecret: "",
  });

  const shippingAddress = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptSuiteUnit: "",
      city: "",
      phone: "",
      differentShippingAddress: false,
    },
  });

  const billingAddress = useForm({
    resolver: yupResolver(billingAddressValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptSuiteUnit: "",
      city: "",
      phone: "",
      billingAddressId: "",
      saveInfoForFasterCheckout: false,
    },
  });

  useEffect(() => {
    const savedClientSecret = localStorage.getItem("stripeClientSecret");

    const fetch = async () => {
      const res = await fetchPaymentIntent({
        orderItems: [
          {
            productId: 1,
            quantity: 1,
            size: {
              id: 3,
            },
            color: {
              id: 1,
            },
          },
          {
            productId: 3,
            quantity: 1,
            size: {
              id: 3,
            },
            color: {
              id: 3,
            },
          },
        ],
      });

      if (res.status === 200) {
        setOptions({
          clientSecret: res.data.clientSecret,
        });
      } else {
        if (res.error) {
          enqueueSnackbar(res.error.message, { variant: "error" });
        }
      }
    };

    if (savedClientSecret) {
      setOptions({
        clientSecret: savedClientSecret,
      });
    } else {
      fetch();
    }
  }, [fetchPaymentIntent]);

  // useEffect(() => {
  //   const savedClientSecret = localStorage.getItem("clientSecret");
  //   if (savedClientSecret) {
  //     setOptions({
  //       clientSecret: savedClientSecret,
  //     });
  //   } else {
  //     fetch("http://localhost:8080/api/v1/orders", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         orderItems: [
  //           {
  //             productId: 1,
  //             quantity: 1,
  //             size: {
  //               id: 3,
  //             },
  //             color: {
  //               id: 1,
  //             },
  //           },
  //           {
  //             productId: 3,
  //             quantity: 1,
  //             size: {
  //               id: 3,
  //             },
  //             color: {
  //               id: 3,
  //             },
  //           },
  //         ],
  //         billingAddressId: 2,
  //         shippingAddressId: 2,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6eyJpZCI6MX0sInNlc3Npb25JZCI6NzUsImlhdCI6MTczMDQ4NjM1OCwiZXhwIjoxNzMwNDkyMzU4fQ.clMTZTFpZQLDcBJN2BnCIrqqa_0pjkRsPHb11HdESfA`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res);
  //         localStorage.setItem("clientSecret", res.metadata.clientSecret);
  //         setOptions({
  //           clientSecret: res.metadata.clientSecret,
  //         });
  //       });
  //   }
  // }, []);

  // const result = await stripe.confirmCardPayment(
  //   response.metadata.clientSecret,
  //   {
  //     payment_method: {
  //       card: elemens,
  //     },
  //   }
  // );

  const handleSetBillingAddressId = (id) => {
    billingAddress.setValue("billingAddressId", id);
  };

  const handleDifferentShippingAddress = (value) => {
    console.log(value);
    setIsShippingAddressDifferent(value);
    // shippingAddress.setValue(
    //   "differentShippingAddress",

    // );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await billingAddress.trigger();

    const billingAddressData = billingAddress.getValues();
    console.log(billingAddressData);

    console.log(isValid);

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
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
          <div className="lg:py-4">
            <SectionHeading text="Check Out" />
            <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242] mt-2">
              Billing Details
            </h4>
          </div>

          {/* checkout form  */}
          <div>
            <FormProvider {...billingAddress}>
              <BillingAddressForm />
            </FormProvider>

            <div className="custom-divider"></div>

            <ShippingAddress
              isShippingAddressDifferent={isShippingAddressDifferent}
              handleDifferentShippingAddress={handleDifferentShippingAddress}
            />

            {isShippingAddressDifferent && (
              <>
                <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242] mt-2">
                  Shipping Details
                </h4>

                <FormProvider {...shippingAddress}>
                  <BillingAddressForm isShipping={true} />
                </FormProvider>
              </>
            )}

            <div className="custom-divider"></div>

            <ShippingMethod />

            <div className="custom-divider"></div>

            {options?.clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <PaymentMethod />
              </Elements>
            )}

            {/* <PaymentElement /> */}
            {/* <CardElement options={{ hidePostalCode: true }} /> */}
          </div>
        </div>
        {/* order summery  */}
        <OrderSummery />
      </div>

      <button
        type="submit"
        className="btn mt-8 lg:mt-10"
        onClick={handleSubmit}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
