"use client";
import EmptyCart from "@/components/Cart/EmptyCart";
import Checkout from "@/components/Checkout/Checkout";
import { useCart } from "@/context/cart-context";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
function CheckoutContent() {
  const { cart } = useCart();
  return cart?.length > 0 ? (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  ) : (
    <EmptyCart />
  );
}

export default withPageRequiredAuth(CheckoutContent);
