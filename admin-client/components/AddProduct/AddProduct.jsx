"use client";
// components/AddProductForm.js
import { SIZES } from "@/constants";
import { useState } from "react";
import ColorPickerFromImage from "./ColorPickerFromImage";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");
  const [Visivility, setVisivility] = useState(null);
  const [productInfo, setProductInfo] = useState([]);

  const handleSelectSize = (e) => {
    const value = e.target.value;
    console.log({ value });
    if (sizes.includes(value)) {
      setSizes(sizes.filter((size) => size !== value));
    } else {
      setSizes([...sizes, value]);
    }
  };

  return (
    <form>
      <div className="form-control w-full">
        <label htmlFor="name" className="label label-text text-text">
          Product Name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          placeholder="Type here"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="label label-text text-text">
          Product Description
        </label>
        <textarea
          placeholder="Type here"
          rows={5}
          cols={20}
          className="py-2 input !h-auto text-text input-bordered w-full  focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex items-center ">
        {/* size */}
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
        {/* quantity  */}
        <div className="form-control basis-1/2">
          <label htmlFor="name" className="label label-text text-text">
            Quantity
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Type here"
            className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-x-7">
        <div className="form-control basis-1/2">
          <label htmlFor="price" className="label label-text text-text">
            Price
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            id="price"
            className="input  text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
            placeholder="Type here"
          />
        </div>
        <div className="form-control basis-1/2">
          <label htmlFor="sell-price" className="label label-text text-text">
            Sell Price
          </label>
          <input
            type="text"
            value={title}
            id="sell-price"
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Type here"
            className="input text-text input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-x-7">
        <div className="form-control basis-1/2">
          <label htmlFor="price" className="label label-text text-text">
            Visivility
          </label>
          <div className="flex items-center gap-x-3">
            <input
              type="radio"
              name="radio-1"
              className="radio checked:bg-[#3333] dark:checked:bg-[#F8F9FA] border-bc"
              id="v-hidden"
              checked={Visivility === false}
              onChange={() => setVisivility(false)}
            />
            <label htmlFor="v-hidden" className="text-text text-sm">
              Hidden
            </label>
          </div>

          <div className="flex items-center gap-x-3">
            <input
              type="radio"
              name="radio-1"
              className="radio checked:bg-[#F8F9FA] border-bc"
              id="v-published"
              checked={Visivility === true}
              onChange={() => setVisivility(true)}
            />
            <label htmlFor="v-published" className="text-text text-sm">
              Published
            </label>
          </div>
        </div>
      </div>

      {/* <div>
        <label>Sizes (comma separated):</label>
        <input
          type="text"
          value={sizes.join(",")}
          onChange={(e) => setSizes(e.target.value.split(","))}
        />
      </div> */}
      <div>
        <ColorPickerFromImage
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />
      </div>
      {/* <div>
        <label>Color-Wise Quantity (JSON):</label>
        <textarea
          value={colorWiseQuantity}
          onChange={(e) => setColorWiseQuantity(e.target.value)}
        />
      </div> */}
      {/* <div>
        <label>Size-Wise Quantity (JSON):</label>
        <textarea
          value={sizeWiseQuantity}
          onChange={(e) => setSizeWiseQuantity(e.target.value)}
        />
      </div> */}
      {/* <div>
        <label>Color-Size-Wise Quantity (JSON):</label>
        <textarea
          value={colorSizeWiseQuantity}
          onChange={(e) => setColorSizeWiseQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Images (comma separated URLs):</label>
        <input
          type="text"
          value={images.join(",")}
          onChange={(e) => setImages(e.target.value.split(","))}
        />
      </div> */}
      <button type="submit">Add Product</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddProductForm;
