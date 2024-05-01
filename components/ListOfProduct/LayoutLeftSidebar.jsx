import FilterContainer from "./FilterContainer";

export default function LayoutLeftSidebar({ productCategory }) {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="product-filter-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div
        className={
          " bg-white border-x border-b border-b-secondary-lighter border-x-secondary-lighter w-[300px] z-50"
        }
      >
        <FilterContainer productFor={productCategory} />
      </div>
    </div>
  );
}
