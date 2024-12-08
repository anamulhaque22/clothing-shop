"use client";
import { PAYMENT_PROVIDER } from "@/constants/payment-provider";
import { useCart } from "@/context/cart-context";
import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { usePlaceOrderService } from "@/services/api/services/order";
import { useGetPaymentIntent } from "@/services/api/services/payment";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import SectionHeading from "../Typography/SectionHeading";
import BillingAddressForm from "./BillingAddressForm";
import OrderSummery from "./OrderSummery";
import PaymentMethod from "./PaymentMethod";
import SelectAddress from "./SelectAddress";
import ShippingAddress from "./ShippingAddress";

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
  const stripe = useStripe();
  const elements = useElements();
  const [paymentType, setPaymentType] = useState(PAYMENT_PROVIDER.COD);
  const [error, setError] = useState(null);
  const { cart, clearCart } = useCart();
  const fetchOrder = usePlaceOrderService();
  const fetchPaymentIntent = useGetPaymentIntent();
  const showToast = useToast();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [isShippingAddressDifferent, setIsShippingAddressDifferent] =
    useState(false);
  const [loading, setLoading] = useState(false);

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

  const shippingAddress = useForm({
    resolver: yupResolver(billingAddressValidationSchema),
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

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchPaymentIntent({
        orderItems: cart?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: {
            id: item.size.id,
          },
          color: {
            id: item.color.id,
          },
        })),
      });

      if (res.status === 200) {
        setClientSecret(res.data.clientSecret);
      } else {
        if (res.error) {
          enqueueSnackbar(res.error.message, { variant: "error" });
        }
      }
    };

    if (cart?.length > 0 && paymentType === PAYMENT_PROVIDER.STRIPE) {
      fetch();
    }
  }, [fetchPaymentIntent, cart, paymentType]);

  const handleSetBillingAddressId = (id) => {
    billingAddress.setValue("billingAddressId", id);
  };

  const handleDifferentShippingAddress = (value) => {
    setIsShippingAddressDifferent(value);
  };

  const handlePlaceOrder = async (data) => {
    const orderData = await fetchOrder(data);
    if (orderData.status !== HTTP_CODES.CREATED) {
      showToast("Order processing failed!", "error");
      return;
    }
    clearCart();
    showToast("Order placed successfully!", "success");
    router.push(`/orders/details/${orderData.data.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await billingAddress.trigger();
    const billingAddressData = billingAddress.getValues();

    let shippingAddressData;
    if (isShippingAddressDifferent) {
      const isValid = await shippingAddress.trigger();
      if (isValid) {
        shippingAddressData = shippingAddress.getValues();
      }
    }

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setLoading(true);

    let reqBody;

    if (billingAddressData?.billingAddressId) {
      reqBody = {
        ...reqBody,
        billingAddressId: billingAddressData.billingAddressId,
      };
    } else {
      reqBody = {
        billingAddress: {
          ...billingAddressData,
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      };
    }

    if (isShippingAddressDifferent) {
      reqBody = {
        ...reqBody,
        shippingAddress: {
          ...shippingAddressData,
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      };
    } else {
      if (billingAddressData?.billingAddressId) {
        reqBody = {
          ...reqBody,
          shippingAddressId: billingAddressData.billingAddressId,
        };
      }
    }

    reqBody = {
      ...reqBody,

      orderItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: {
          id: item.size.id,
        },
        color: {
          id: item.color.id,
        },
      })),
    };

    if (paymentType === PAYMENT_PROVIDER.STRIPE) {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${billingAddressData.firstName} ${billingAddressData.lastName}`,
            },
          },
        }
      );

      if (error) {
        showToast(error?.message, "error");
        return;
      } else if (paymentIntent && paymentIntent?.status === "succeeded") {
        handlePlaceOrder({
          ...reqBody,
          paymentType: PAYMENT_PROVIDER.STRIPE,
          transaction_id: paymentIntent.id,
        });
      }
    } else if (paymentType === PAYMENT_PROVIDER.COD) {
      handlePlaceOrder({ ...reqBody, paymentType: PAYMENT_PROVIDER.COD });
    }
    setLoading(false);
  };
  return (
    <div className="container mb-11 md:mb-24">
      <div className="flex flex-col md:flex-row gap-x-8">
        <div className="w-full lg:w-[63%]">
          {/* section heading */}
          <div className="lg:py-4">
            <SectionHeading text="Check Out" />
            <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242] mt-2">
              Billing Details
            </h4>
          </div>

          <SelectAddress
            handleSetBillingAddressId={handleSetBillingAddressId}
          />

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

            {/* <div className="custom-divider"></div> */}

            {/* <ShippingMethod /> */}

            <div className="custom-divider"></div>

            <PaymentMethod
              paymentType={paymentType}
              onSetPaymentType={(type) => setPaymentType(type)}
            />

            {/* <PaymentElement /> */}
            {/* <CardElement options={{ hidePostalCode: true }} /> */}
          </div>
        </div>
        {/* order summery  */}
        <OrderSummery />
      </div>

      <button
        type="submit"
        className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white disabled:bg-slate-600 disabled:border-slate-600 mt-8 lg:mt-10"
        onClick={handleSubmit}
        disabled={loading}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
