import CategoryFilter from "../Filter/CategoryFilter";
import ColorsFilter from "../Filter/ColorsFilter";
import DressStyleFilter from "../Filter/DressStyleFilter";
import PriceFilter from "../Filter/PriceFilter";
import SizeFilter from "../Filter/SizeFilter";

const FilterContainer = () => {
  return (
    <>
      <CategoryFilter />
      <PriceFilter />
      <ColorsFilter />
      <SizeFilter />
      <DressStyleFilter />
    </>
  );
};

export default FilterContainer;
