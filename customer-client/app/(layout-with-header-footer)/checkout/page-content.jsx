"use client";
import Checkout from "@/components/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function CheckoutContent() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
