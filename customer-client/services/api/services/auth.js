import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();
  return useCallback(
    (data, requestConfig) => {
      return fetchBase(`${API_URL}/v1/auth/email/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
