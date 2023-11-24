import Product from "../Product/Product";

const ListOfProduct = ({ productFor }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4  sm:gap-9">
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default ListOfProduct;
