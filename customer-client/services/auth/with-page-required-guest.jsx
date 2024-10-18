import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function withPageRequiredGuest(Component) {
  return function WithPageRequiredGuest(props) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        let redirectTo = "/";
        router.replace(redirectTo);
      };
      check();
    }, [user, isLoaded, router]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}

export default withPageRequiredGuest;
