"use client";
import Register from "@/components/Auth/Register";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

function SignUp() {
  return <Register />;
}

export default withPageRequiredGuest(SignUp);
