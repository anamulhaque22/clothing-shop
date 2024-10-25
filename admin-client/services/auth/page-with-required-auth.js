"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function withPageRequiredAuth(component) {
  return function WithPageRequiredAuth(props) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if ((user && user?.role?.id && user?.role?.id === 1) || !isLoaded)
          return;

        const currentLocation = window.location.toString();

        const returnToPath =
          currentLocation.replace(new URL(currentLocation).origin, "") || "/";
        const params = new URLSearchParams({
          returnTo: returnToPath,
        });

        console.log({ params });
        let redirectTo = `/login?${params.toString()}`;

        if (user) redirectTo = "/";

        router.replace(redirectTo);
      };
      check();
    }, [user, isLoaded, router]);

    return user && user?.role?.id && user?.role?.id === 1
      ? component(props)
      : null;
  };
}

export default withPageRequiredAuth;
