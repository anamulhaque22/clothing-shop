"use client";
import { useState } from "react";
import ReactSlider from "react-slider";
import FilterSection from "./FilterSection";

const PriceFilter = () => {
  const [maxPrice, setMaxPrice] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  //   const [rangeValue, setRangeValue] = useState([0, 100]);
  const handleRangeValue = (value) => {
    setMaxPrice(value[1]);
    setMinPrice(value[0]);
  };
  return (
    <FilterSection title="Price">
      <div className="flex flex-col px-7 py-10">
        <div className="">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[minPrice, maxPrice]}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            //   renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            pearling
            minDistance={10}
            onChange={(value) => handleRangeValue(value)}
          />
        </div>
        <div className="flex flex-row justify-between mt-10 gap-2">
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default PriceFilter;
{
  /* <div>
      <TitleFilterFor title="Price" />
      <div className="flex flex-col px-7 py-10">
        <div className="">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[minPrice, maxPrice]}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            //   renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            pearling
            minDistance={10}
            onChange={(value) => handleRangeValue(value)}
          />
        </div>
        <div className="flex flex-row justify-between mt-10 gap-2">
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </div> */
}
