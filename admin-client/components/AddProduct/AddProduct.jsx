"use client";
// components/AddProductForm.js
import { useState } from "react";
import ColorPickerFromImage from "../ColorPickerFromImage";
const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorWiseQuantity, setColorWiseQuantity] = useState("");
  const [sizeWiseQuantity, setSizeWiseQuantity] = useState("");
  const [colorSizeWiseQuantity, setColorSizeWiseQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleColorsSelected = (selectedColors) => {
    setColors(selectedColors);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const parsedColorWiseQuantity = JSON.parse(colorWiseQuantity);
      const parsedSizeWiseQuantity = JSON.parse(sizeWiseQuantity);
      const parsedColorSizeWiseQuantity = JSON.parse(colorSizeWiseQuantity);

      const productData = {
        title,
        description,
        price,
        sold_price: soldPrice,
        category,
        quantity,
        sizes,
        colors,
        color_wise_quantity: parsedColorWiseQuantity,
        size_wise_quantity: parsedSizeWiseQuantity,
        color_size_wise_quantity: parsedColorSizeWiseQuantity,
        images,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert("Product added successfully!");
        // Reset the form fields
        setTitle("");
        setDescription("");
        setPrice("");
        setSoldPrice("");
        setCategory("");
        setQuantity("");
        setSizes([]);
        setColors([]);
        setColorWiseQuantity("");
        setSizeWiseQuantity("");
        setColorSizeWiseQuantity("");
        setImages([]);
        setError("");
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      setError("Invalid JSON format in quantity fields");
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div className="form-control w-full">
        <label htmlFor="name" className="label label-text text-text">
          Product Name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input  input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sold Price:</label>
        <input
          type="number"
          value={soldPrice}
          onChange={(e) => setSoldPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sizes (comma separated):</label>
        <input
          type="text"
          value={sizes.join(",")}
          onChange={(e) => setSizes(e.target.value.split(","))}
        />
      </div>
      <div>
        <ColorPickerFromImage onColorsSelected={handleColorsSelected} />
      </div>
      <div>
        <label>Color-Wise Quantity (JSON):</label>
        <textarea
          value={colorWiseQuantity}
          onChange={(e) => setColorWiseQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Size-Wise Quantity (JSON):</label>
        <textarea
          value={sizeWiseQuantity}
          onChange={(e) => setSizeWiseQuantity(e.target.value)}
        />
      </div>
      <div>
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
      </div>
      <button type="submit">Add Product</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddProductForm;
