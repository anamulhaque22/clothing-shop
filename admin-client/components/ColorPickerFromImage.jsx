// components/ColorPickerFromImage.js
import { useRef, useState } from "react";

const ColorPickerFromImage = ({ onColorsSelected }) => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setColors((prevColors) => [...prevColors, color]);
  };

  const handleSubmit = () => {
    onColorsSelected(colors);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <img
            ref={imgRef}
            src={image}
            alt="Selected"
            style={{ display: "none" }}
            onLoad={handleImageLoad}
          />
          <canvas
            ref={canvasRef}
            onClick={handleClick}
            style={{ cursor: "crosshair" }}
          />
          <div>
            <h3>Selected Colors:</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: "50px",
                    height: "50px",
                    margin: "5px",
                    border:
                      selectedColor === color ? "3px solid black" : "none",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={handleSubmit}>
        Submit Colors
      </button>
    </div>
  );
};

export default ColorPickerFromImage;
