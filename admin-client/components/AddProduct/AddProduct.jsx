"use client";
import { PRODUCT_VISIBILITY, SIZES } from "@/constants";
import { useEffect, useState } from "react";
import CategoryInput from "./CategoryInput";
import ColorPickerFromImage from "./ColorPickerFromImage";
import TagsInput from "./TagsInput";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [tags, setTags] = useState();
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");
  const [visivility, setVisivility] = useState(PRODUCT_VISIBILITY[0]);
  const [productInfo, setProductInfo] = useState([]);

  const handleSelectSize = (e) => {
    const value = e.target.value;

    if (sizes.includes(value)) {
      setSizes(sizes.filter((size) => size !== value));
    } else {
      setSizes([...sizes, value]);
    }
  };

  console.log({
    title,
    description,
    buyPrice,
    sellPrice,
    category,
    quantity,
    discount,
    tags,
    sizes,
    visivility,
    productInfo,
  });

  useEffect(() => {}, []);

  return (
    <form>
      <div className="form-control w-full">
        <label htmlFor="name" className="label label-text text-text">
          Product Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          placeholder="Product Title"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="label label-text text-text">
          Product Description
        </label>
        <textarea
          placeholder="Product Description"
          rows={5}
          cols={20}
          className="py-2 input !h-auto text-text input-bordered w-full  focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex items-center gap-x-7">
        <div className="form-control basis-1/2">
          <label htmlFor="price" className="label label-text text-text">
            Price
          </label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            required
            id="price"
            className="input  text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
            placeholder="৳ 0.00"
          />
        </div>
        <div className="form-control basis-1/2">
          <label htmlFor="sell-price" className="label label-text text-text">
            Sell Price
          </label>
          <input
            type="number"
            value={sellPrice}
            id="sell-price"
            onChange={(e) => setSellPrice(e.target.value)}
            required
            placeholder="৳ 0.00"
            className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-x-7">
        <div className="basis-1/2">
          <label htmlFor="discount" className="label label-text text-text">
            Discounts
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            id="discount"
            className="input  text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
            placeholder="0 %"
          />
        </div>
        {/* quantity  */}
        <div className="form-control basis-1/2">
          <label htmlFor="name" className="label label-text text-text">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder="Quantity"
            className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-x-7">
        <div className="basis-1/2">
          <p className="text-text text-sm mb-2">Size: </p>
          <div className="flex gap-x-3">
            {SIZES.map((size, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  id={size}
                  hidden
                  onClick={handleSelectSize}
                />
                <label
                  htmlFor={size}
                  className={`flex items-center justify-center w-10 h-10 rounded-md  text-text text-xs cursor-pointer ${
                    sizes.includes(size)
                      ? "dark:bg-[#3b82f633] bg-[#eff6ff] border dark:border-[#1d4ed8] border-[#93c5fd]"
                      : "border border-bc dark:bg-transparent bg-[#F8F9FA]"
                  }`}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <CategoryInput category={category} setCategory={setCategory} />
      </div>
      <div className="mt-4 flex items-center gap-x-7">
        <div className="basis-1/2 flex flex-col">
          <label htmlFor="price" className="label label-text text-text">
            Visivility:
          </label>
          <select
            onChange={(e) => setVisivility(e.target.value)}
            value={visivility}
            className="text-text input-bordered border bg-secondary h-10 px-4 pr-8 rounded leading-tight focus:outline-1 focus:outline-offset-1 focus:bg-white dark:focus:bg-secondary"
          >
            {PRODUCT_VISIBILITY.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <TagsInput tags={tags} onSetTags={setTags} />
      </div>

      <div className="mt-4">
        <ColorPickerFromImage
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          sizes={sizes}
        />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary mt-4 !text-text" type="submit">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
