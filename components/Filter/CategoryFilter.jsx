import Image from "next/image";
import FilterSection from "./FilterSection";

const categoryList = [
  {
    name: "Tops",
  },
  {
    name: "Printed T-shirts",
  },
  {
    name: "Plain T-shirts",
  },
  {
    name: "Kurti",
  },
  {
    name: "Boxers",
  },
  {
    name: "Full sleeve T-shirts",
  },
  {
    name: "Joggers",
  },
  {
    name: "Payjamas",
  },
  {
    name: "Jeans",
  },
];

const CategoryFilter = () => {
  return (
    <FilterSection
      title="Category"
      icon={"/images/icon/Filtter.svg"}
      titleBorder="border-b border-b-secondary-lighter"
    >
      <div className="flex justify-between px-7 py-10">
        <ul className="w-full space-y-[18px]">
          {categoryList.map((category) => (
            <li key={category.name} className="flex justify-between">
              <span className="font-causten-semi-bold text-base text-[#8A8989] cursor-pointer">
                {category.name}
              </span>
              <Image
                src={"/images/icon/chevron/right.svg"}
                width={18}
                height={18}
                alt="filter icon"
              />
            </li>
          ))}
        </ul>
      </div>
    </FilterSection>
  );
};

export default CategoryFilter;
{
  /* <div className="border-b border-b-secondary-lighter">
        <div className="flex justify-between px-7 py-5">
          <h4 className="font-causten-semi-bold text-[1.375rem] text-secondary-light">
            Filter
          </h4>
          <Image
            src={"/images/icon/filtter.svg"}
            width={18}
            height={18}
            alt="filter icon"
          />
        </div>
      </div>
      <div className="flex justify-between px-7 py-10">
        <ul className="w-full space-y-[18px]">
          {categoryList.map((category) => (
            <li key={category.name} className="flex justify-between">
              <span className="font-causten-semi-bold text-base text-[#8A8989] cursor-pointer">
                {category.name}
              </span>
              <Image
                src={"/images/icon/chevron/right.svg"}
                width={18}
                height={18}
                alt="filter icon"
              />
            </li>
          ))}
        </ul>
      </div> */
}
