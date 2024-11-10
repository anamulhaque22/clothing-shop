import ProductDetailsContain from "./pgae-content";
const InternalPage = ({ params }) => {
  console.log("ProductDetailsContent", params);
  const { productId } = params;
  return <ProductDetailsContain productId={productId} />;
};

export default InternalPage;
