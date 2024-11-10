import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export const usePlaceOrderService = () => {
  const fetch = useFetch();

  return useCallback(
    (data, reqConfig) => {
      return fetch(`${API_URL}/v1/orders`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
};
