"use client";
import ProductsDetails from "@/components/ProductDetails/ProductsDetails";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductService } from "@/services/api/services/product";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useEffect, useState } from "react";

function ProductDetailsContent({ productCategory, productId }) {
  const fetchProduct = useGetProductService();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const product = async () => {
      const { data, status } = await fetchProduct(productId);
      if (status === HTTP_CODES.OK) {
        setProduct(data);
      }
      if (
        status === HTTP_CODES.NOT_FOUND ||
        status === HTTP_CODES.INTERNAL_SERVER_ERROR
      ) {
        setError(true);
      }
    };
    product();
  }, [productId, fetchProduct]);

  return product ? (
    <ProductsDetails product={product} />
  ) : (
    <div>Product not found</div>
  );
}
export default withPageRequiredGuest(ProductDetailsContent);
