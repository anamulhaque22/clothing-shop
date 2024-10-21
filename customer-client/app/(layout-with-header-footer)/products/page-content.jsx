"use client";
import ListOfProductPageLayout from "@/components/ListOfProduct/ListOfProductPageLayout";
import { useGetProductsService } from "@/services/api/services/product";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

function ProductPageContent() {
  const fetchGetProducts = useGetProductsService();
  return <ListOfProductPageLayout />;
}

export default withPageRequiredGuest(ProductPageContent);
