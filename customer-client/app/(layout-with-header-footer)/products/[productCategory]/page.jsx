import ListOfProductPageLayout from "@/components/ListOfProduct/ListOfProductPageLayout";

const page = ({ params }) => {
  return <ListOfProductPageLayout productCategory={params.productCategory} />;
};

export default page;
