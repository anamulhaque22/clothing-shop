"use client";
import ListOfProductPageLayout from "@/components/ListOfProduct/ListOfProductPageLayout";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";

function ProductPageContent() {
  return <ListOfProductPageLayout />;
}

export default withPageRequiredGuest(ProductPageContent);
