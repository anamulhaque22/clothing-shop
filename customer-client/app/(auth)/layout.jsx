import AuthLayoutNav from "@/components/Navbar/AuthLayoutNav/AuthLayoutNav";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <AuthLayoutNav />
      {children}
    </>
  );
};

export default AuthLayout;
