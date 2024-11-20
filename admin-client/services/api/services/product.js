import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useUploadProductImagesService() {
  const fetch = useFetch();

  return useCallback(
    async (data, reqConfig) => {
      return fetch(`${API_URL}/v1/products/image/add`, {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: data,
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetProductService() {
  const fetch = useFetch();

  return useCallback(
    async (reqConfig) => {
      return fetch(`${API_URL}/v1/products`, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetProductByIdService() {
  const fetch = useFetch();

  return useCallback(
    async (id, reqConfig) => {
      return fetch(`${API_URL}/v1/products/${id}`, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useCreateProductService() {
  const fetch = useFetch();

  return useCallback(
    async (data, reqConfig) => {
      return fetch(`${API_URL}/v1/products`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useUpdateProductService() {
  const fetch = useFetch();

  return useCallback(
    async (id, data, reqConfig) => {
      return fetch(`${API_URL}/v1/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
