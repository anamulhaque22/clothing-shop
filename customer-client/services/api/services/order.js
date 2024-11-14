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

export const useGetOrdersService = () => {
  const fetch = useFetch();

  return useCallback(
    (ordersReq, reqConfig) => {
      const requestUrl = new URL(`${API_URL}/v1/orders/`);
      if (ordersReq) {
        if (ordersReq.page)
          requestUrl.searchParams.append("page", ordersReq.page);

        if (ordersReq.limit)
          requestUrl.searchParams.append("limit", ordersReq.limit);

        if (ordersReq?.sort)
          requestUrl.searchParams.append("sort", ordersReq.sort);

        if (ordersReq?.status)
          requestUrl.searchParams.append("status", ordersReq.status);

        if (ordersReq?.search)
          requestUrl.searchParams.append("search", ordersReq.search);
      }
      return fetch(requestUrl, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
};

export function useGetOrderService() {
  const fetch = useFetch();

  return useCallback(
    (orderId) => {
      return fetch(`${API_URL}/v1/orders/${orderId}`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
