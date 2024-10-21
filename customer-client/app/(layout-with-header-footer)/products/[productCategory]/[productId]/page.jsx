import { useGetProductService } from "@/services/api/services/product";
import PageDetailsContent from "./pgae-content";
const InternalPage = ({ params }) => {
  const fetchProduct = useGetProductService();
  const { productCategory, productId } = params;
  // const product = async () => await fetchProduct(productId);
  // const result = product();
  // console.log({ result });
  return (
    <PageDetailsContent
      productCategory={productCategory}
      productId={productId}
    />
  );
};

export default InternalPage;
