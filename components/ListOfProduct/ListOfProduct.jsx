import Product from "../Product/Product";

const ListOfProduct = ({ productCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4  sm:gap-9">
      <Product productCategory={productCategory} />
    </div>
  );
};

export default ListOfProduct;
