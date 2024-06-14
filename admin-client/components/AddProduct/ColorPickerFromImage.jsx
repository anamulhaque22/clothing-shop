import Image from "next/image";
import { useRef } from "react";

const ColorPickerFromImage = ({ productInfo, setProductInfo }) => {
  const canvasRef = useRef([]);
  const imgRefs = useRef([]);

  // uploading image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Use e.target.files to access the file list
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const newImage = reader.result;
      setProductInfo((prevProductInfo) => [
        ...prevProductInfo,
        {
          image: file,
          color: "red",
          sizes: [],
          colorWiseQuantity: "",
          sizeWiseQuantity: {
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
          },
          previewImage: newImage,
        },
      ]); // setting image preview
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  // handle image load
  const handleImageLoad = (index) => {
    const canvas = canvasRef.current[index];
    const img = imgRefs.current[index];
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  // handle click on image to pick color
  const handleClick = (e, index) => {
    // e is event
    const canvas = canvasRef.current[index];
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
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
    setProductInfo(updatedProductInfo);
  };

  // set sizes color wise
  const setSizesColorWise = (e, index) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        if (info.sizes.includes(value)) {
          alert("Size already exists");
          return info;
        }
        return {
          ...info,
          sizes: [...info.sizes, value],
          sizeWiseQuantity: { ...info.sizeWiseQuantity, [value]: 0 },
        };
      }
      return info;
    });
    setProductInfo(updatedProductInfo);
  };

  // handle size wise quantity
  const handleSizeWiseQuantity = (e, index, size) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          sizeWiseQuantity: { ...info.sizeWiseQuantity, [size]: value },
        };
      }
      return info;
    });
    setProductInfo(updatedProductInfo);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <div className="grid grid-cols-4 gap-5">
        {productInfo.map((info, index) => (
          <div
            className="border p-4 rounded-md flex flex-col items-center"
            key={index}
          >
            {info?.previewImage && (
              <>
                <Image
                  ref={(el) => (imgRefs.current[index] = el)}
                  src={info ? info.previewImage : ""}
                  width={0}
                  height={200}
                  sizes="100vw"
                  className="w-full h-[300px]"
                  alt="image"
                  style={{ display: "none" }}
                  onLoad={() => handleImageLoad(index)}
                />
                <canvas
                  ref={(el) => (canvasRef.current[index] = el)}
                  onClick={(e) => handleClick(e, index)}
                  style={{ cursor: "crosshair" }}
                />
              </>
            )}
            <div>
              <div className="mt-4 mb-4 flex items-center gap-x-3">
                <h3>Selected Color:</h3>
                <div
                  style={{
                    backgroundColor: info.color,
                    width: "30px",
                    height: "30px",
                    margin: "5px",
                  }}
                ></div>
              </div>

              <div className="flex items-center gap-x-3 mb-3">
                <label htmlFor="color-wise-quantity">Color Wise Quantity</label>
                <input
                  type="number"
                  id="color-wise-quantity"
                  className="w-16 input  input-bordered  h-8 focus:outline-1 focus:outline-offset-1"
                />
              </div>

              <label className="form-control w-full max-w-xs">
                <div className="label">Select Sizes:</div>
                <select
                  className="select select-bordered"
                  onChange={(e) => setSizesColorWise(e, index)}
                >
                  <option disabled selected={true}>
                    Pick one option
                  </option>
                  <option value={"S"}>S</option>
                  <option value={"M"}>M</option>
                  <option value={"XL"}>XL</option>
                </select>
              </label>

              <div className="mt-5">
                <label htmlFor="size-wise-quantity">Size Wise Quantity</label>
                <div>
                  {info?.sizes?.map((s, i) => {
                    return (
                      <div className="flex items-center gap-x-3 mb-3" key={i}>
                        <label htmlFor="size-wise-quantity">{s}</label>
                        <input
                          type="number"
                          id="size-wise-quantity"
                          className="w-16 input input-bordered h-8 focus:outline-1 focus:outline-offset-1"
                          onChange={(e) => handleSizeWiseQuantity(e, index, s)}
                          value={info.sizeWiseQuantity[s]}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button className="btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerFromImage;
