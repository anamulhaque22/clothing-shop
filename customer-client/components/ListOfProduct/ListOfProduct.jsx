import Product from "../Product/Product";

const ListOfProduct = ({ productCategory, result }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4  sm:gap-9">
      {result
        ? result.map((product) => {
            return (
              <Product
                key={product.id}
                productCategory={productCategory}
                product={product}
              />
            );
          })
        : null}
    </div>
  );
};

export default ListOfProduct;
