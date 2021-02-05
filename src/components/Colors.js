import React from "react";
import ColorEach from "./ColorEach";

function Colors({ colors, setColors, setCopyClipboard }) {
  return (
    <div className="colors">
      {colors.map((color) => (
        <ColorEach
          color={color}
          key={color.id}
          colors={colors}
          setColors={setColors}
          setCopyClipboard={setCopyClipboard}
        />
      ))}
    </div>
  );
}

export default Colors;
