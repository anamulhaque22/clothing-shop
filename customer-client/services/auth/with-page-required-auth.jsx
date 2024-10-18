"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function withPageRequiredAuth(Component, options) {
  return function WithPageRequiredAuth(props) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if ((user && user?.role?.id) || !isLoaded) return;

      let redirectTo = "/login";
      if (user) {
        redirectTo = "/";
      }
      router.replace(redirectTo);
    }, [user, isLoaded, router]);

    return user && user?.role?.id ? <Component {...props} /> : null;
  };
}

export default withPageRequiredAuth;
