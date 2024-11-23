import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetCategoriesService() {
  const fetchBase = useFetchBase();

  return useCallback(
    async (data) => {
      return fetchBase(`${API_URL}/v1/categories`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useGetCategoryService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (id, requestConfig) => {
      return fetchBase(`${API_URL}/v1/categories/${id}/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
