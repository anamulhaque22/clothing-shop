import CategoryFilter from "../Filter/CategoryFilter";
import PriceFilter from "../Filter/PriceFilter";
import SizeFilter from "../Filter/SizeFilter";

const FilterContainer = ({ productFor }) => {
  return (
    <>
      <CategoryFilter productFor={productFor} />
      <PriceFilter />
      {/* <ColorsFilter /> */}
      <SizeFilter />
      {/* <DressStyleFilter /> */}
    </>
  );
};

export default FilterContainer;
