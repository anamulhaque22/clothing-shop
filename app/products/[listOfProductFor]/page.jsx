"use client";
import ListOfProductPageLayout from "@/components/ListOfProduct/ListOfProductPageLayout";

const page = ({ params }) => {
  const productFor = params.listOfProductFor;
  return <ListOfProductPageLayout productFor={productFor} />;
};

export default page;
