import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
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

export function useAuthForgotPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/forgot/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthResetPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/reset/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data, requestConfig) => {
      return fetch(`${API_URL}/v1/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
