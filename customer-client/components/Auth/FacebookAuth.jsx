"use client";

import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthFacebookLoginService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import useFacebookAuth from "@/services/social-auth/facebook/use-facebook-auth";
import { useState } from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import Loading from "../Shared/Loading";

export default function FacebookAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authFacebookLoginService = useAuthFacebookLoginService();
  const facebook = useFacebookAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      const loginResponse = await facebook.login();
      if (!loginResponse.authResponse) return;

      setIsLoading(true);

      const { status, data } = await authFacebookLoginService({
        accessToken: loginResponse.authResponse.accessToken,
      });

      if (status === HTTP_CODES.OK) {
        setTokensInfo({
          token: data.token,
          refreshToken: data.refreshToken,
          tokenExpires: data.tokenExpires,
        });
        setUser(data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onLogin}
        className="flex gap-x-3 text-primary text-lg md:text-[1.2rem] font-medium justify-center py-2 rounded-md items-center border-2 border-secondary w-full"
      >
        <FaSquareFacebook color="#087DEB" /> Continue with facebook
      </button>
      <Loading isLoading={isLoading} />
    </>
  );
}
