
import React, { useState } from "react";

function ImageAdjustment({ imageUrl, onSizeChange }) {
  const [size, setSize] = useState(100); // Initial size, you can change this as needed

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    onSizeChange(newSize);
  };

  return (
    <div>
      <h2>Image Adjustment</h2>
      <label htmlFor="imageSize">Image Size:</label>
      <input
        type="range"
        id="imageSize"
        name="imageSize"
        min="50"
        max="200"
        step="10"
        value={size}
        onChange={handleSizeChange}
      />
      <p>Size: {size}%</p>
      <img src={imageUrl} alt="Adjustable Image" style={{ width: `${size}%` }} />
    </div>
  );
}

export default ImageAdjustment;