"use client";
import Login from "@/components/Auth/Login";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

function SignIn() {
  return <Login />;
}
export default withPageRequiredGuest(SignIn);
