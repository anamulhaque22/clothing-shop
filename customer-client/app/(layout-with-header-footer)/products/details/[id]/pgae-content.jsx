"use client";
import ProductsDetails from "@/components/ProductDetails/ProductsDetails";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductService } from "@/services/api/services/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductDetailsContent() {
  const fetchProduct = useGetProductService();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data, status } = await fetchProduct(productId);
        if (status === HTTP_CODES.OK) {
          setProduct(data);
        } else if (
          status === HTTP_CODES.NOT_FOUND ||
          status === HTTP_CODES.INTERNAL_SERVER_ERROR
        ) {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
      }
    };
    loadProduct();
  }, [productId, fetchProduct]);

  return product ? (
    <ProductsDetails product={product} />
  ) : (
    <div>Product not found</div>
  );
}
export default ProductDetailsContent;
