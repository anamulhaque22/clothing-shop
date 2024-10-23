"use client";

import { useCallback } from "react";
import { useAuthTokens } from "./auth-context";

function useFetch() {
  const { tokensInfoRef, setTokensInfo } = useAuthTokens();
  const fetchBase = useFetchBase();

  const fetchWrapper = useCallback(
    (input, init) => {
      return fetchBase(input, init, {
        token: tokensInfoRef.current.token,
        refreshToken: tokensInfoRef.current.refreshToken,
        tokenExpires: tokensInfoRef.current.tokenExpires,
        setTokensInfo,
      });
    },
    [tokensInfoRef, fetchBase, setTokensInfo]
  );

  return fetchWrapper;
}

export default useFetch;
