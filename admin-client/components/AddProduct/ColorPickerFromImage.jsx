import { useEffect, useRef } from "react";
import InputError from "../Input/InputError";
import SizeWiseQuantity from "./SizeWiseQuantity";

const parseQuantity = (value) => {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity < 0) {
    return 0;
  }

  return Math.floor(quantity);
};

const toSizeMap = (sizes = [], currentMap = {}) => {
  return Object.fromEntries(
    sizes.map((size) => {
      const key = String(size?.name || "").toLowerCase();
      return [key, parseQuantity(currentMap[key])];
    }),
  );
};

const ColorPickerFromImage = ({
  productInfo,
  setProductInfo,
  sizes,
  name,
  errors,
}) => {
  const canvasRef = useRef([]);
  const imgContainerRef = useRef([]);

  useEffect(() => {
    if (!Array.isArray(productInfo) || productInfo.length === 0) return;

    const normalizedInfo = productInfo.map((info) => ({
      ...info,
      colorSizeWiseQuantity: toSizeMap(
        sizes,
        info?.colorSizeWiseQuantity || {},
      ),
    }));

    const isDifferent = normalizedInfo.some((info, idx) => {
      const currentMap = productInfo[idx]?.colorSizeWiseQuantity || {};
      const nextMap = info.colorSizeWiseQuantity || {};
      const currentKeys = Object.keys(currentMap);
      const nextKeys = Object.keys(nextMap);

      if (currentKeys.length !== nextKeys.length) return true;
      return nextKeys.some(
        (key) => Number(currentMap[key] || 0) !== Number(nextMap[key] || 0),
      );
    });

    if (isDifferent) {
      setProductInfo(name, normalizedInfo, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [name, productInfo, setProductInfo, sizes]);

  useEffect(() => {
    productInfo.forEach((info, index) => {
      if (!info?.previewImage || !canvasRef.current[index]) return;

      const canvas = canvasRef.current[index];
      const container = imgContainerRef.current[index];
      const context = canvas.getContext("2d");
      if (!context || !container) return;

      const image = new window.Image();
      image.onload = () => {
        const width = Math.max(container.clientWidth - 32, 260);
        const ratio = image.height / image.width;
        const height = Math.max(Math.round(width * ratio), 220);

        canvas.width = width;
        canvas.height = height;
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = info.previewImage;
    });
  }, [productInfo]);

  // uploading image
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      return;
    }

    const imageEntries = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                image: file,
                color: "",
                colorName: "",
                colorWiseQuantity: 0,
                colorSizeWiseQuantity: toSizeMap(sizes),
                previewImage: reader.result,
              });
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          }),
      ),
    );

    const validEntries = imageEntries.filter(Boolean);
    if (validEntries.length > 0) {
      setProductInfo(name, [...productInfo, ...validEntries], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    e.target.value = null;
  };

  // handle click on image to pick color
  const handleClick = (e, index) => {
    const canvas = canvasRef.current[index];
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          color,
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo);
  };

  // handle size wise quantity
  const handleSizeWiseQuantity = (e, index, size) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorSizeWiseQuantity: {
            ...info.colorSizeWiseQuantity,
            [size?.name?.toLowerCase()]: parseQuantity(value),
          },
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // delete image from product info
  const deleteImage = (index) => {
    const updatedProductInfo = productInfo.filter((_, i) => i !== index);
    setProductInfo(name, updatedProductInfo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // handle color name
  const handleColorName = (e, index) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorName: value,
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleColorWiseQuantity = (e, index) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorWiseQuantity: parseQuantity(value),
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="mb-4">
      <label className="label label-text text-text">
        Product Images and Color Inventory
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 mt-4">
        {productInfo.map((info, index) => (
          <div
            ref={(el) => (imgContainerRef.current[index] = el)}
            className="border border-bc p-4 rounded-md flex flex-col"
            key={index}
          >
            {/* image preview here */}
            {info?.previewImage && (
              <canvas
                ref={(el) => (canvasRef.current[index] = el)}
                onClick={(e) => handleClick(e, index)}
                className="w-full rounded-md border border-bc cursor-crosshair"
              />
            )}
            {/* product image and color wise product info  */}
            <div className="mt-4">
              <div className="mb-4 flex flex-col gap-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-text">Pick color from image</p>
                  <div
                    style={{
                      backgroundColor: info.color,
                      width: "30px",
                      height: "30px",
                      border: "1px solid #c9c9c9",
                      borderRadius: "6px",
                    }}
                  ></div>
                </div>
                <p className="text-xs text-text opacity-75">
                  {info.color || "No color selected"}
                </p>
                <InputError>
                  {errors?.[index]?.color?.message &&
                    errors[index]?.color?.message}
                </InputError>
              </div>

              <div className="flex flex-col gap-x-3 mb-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="color-name" className="text-sm">
                    Color Name:
                  </label>
                  <input
                    value={info?.colorName || ""}
                    type="text"
                    id="color-name"
                    className="bg-secondary w-full input input-bordered  h-8 focus:outline-1 focus:outline-offset-1"
                    onChange={(e) => handleColorName(e, index)}
                  />
                </div>

                <InputError>
                  {errors?.[index]?.colorName?.message &&
                    errors[index]?.colorName?.message}
                </InputError>
              </div>

              <div className="flex flex-col gap-x-3 mb-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="color-wise-quantity" className="text-sm">
                    Color Wise Quantity:
                  </label>
                  <input
                    type="number"
                    value={info?.colorWiseQuantity || 0}
                    min={0}
                    id="color-wise-quantity"
                    className="w-16 input  input-bordered  h-8 focus:outline-1 focus:outline-offset-1 bg-secondary"
                    onChange={(e) => handleColorWiseQuantity(e, index)}
                  />
                </div>

                <InputError>
                  {errors?.[index]?.colorWiseQuantity?.message &&
                    errors[index]?.colorWiseQuantity?.message}
                </InputError>
              </div>

              <div className="mb-3 rounded-md bg-secondary border border-bc p-2 text-xs text-text">
                <p>
                  Assigned in sizes:{" "}
                  {Object.values(info?.colorSizeWiseQuantity || {}).reduce(
                    (sum, qty) => sum + Number(qty || 0),
                    0,
                  )}
                </p>
                <p>
                  Remaining in this color:{" "}
                  {Number(info?.colorWiseQuantity || 0) -
                    Object.values(info?.colorSizeWiseQuantity || {}).reduce(
                      (sum, qty) => sum + Number(qty || 0),
                      0,
                    )}
                </p>
              </div>

              {sizes?.length > 0 && (
                <>
                  <SizeWiseQuantity
                    info={info}
                    onHandleSizeWiseQuantity={(e, size) =>
                      handleSizeWiseQuantity(e, index, size)
                    }
                    sizes={sizes}
                  />
                  <InputError>
                    {errors?.[index]?.colorSizeWiseQuantity?.message &&
                      errors[index]?.colorSizeWiseQuantity?.message}
                  </InputError>
                </>
              )}

              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="btn btn-primary btn-sm !text-text"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerFromImage;
