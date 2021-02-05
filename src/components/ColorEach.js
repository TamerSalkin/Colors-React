import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function ColorEach({ color, colors, setColors, setCopyClipboard }) {
  // State
  const [initialColor, setInitialColor] = useState(color); // For reference point
  const [specsToggle, setSpecsToggle] = useState(false);
  // useEffect
  useEffect(() => {
    setInitialColor(color);
  }, [color]);
  // Styling
  const inputHueBackground = {
    background: `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), 
    rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))`,
  };
  const midBright = chroma(initialColor.hexCode).set("hsl.l", 0.5);
  const inputBrightBackground = {
    background: `linear-gradient(to right, black, ${midBright}, white)`,
  };
  const noSat = chroma(initialColor.hexCode).set("hsl.s", 0);
  const fullSat = chroma(initialColor.hexCode).set("hsl.s", 1);
  const inputSatBackground = {
    background: `linear-gradient(to right, ${noSat}, ${fullSat})`,
  };
  //Handlers
  const hueInputHandler = (e) => {
    let cColor = chroma(color.hexCode).set("hsl.h", e.target.value);
    const newColors = colors.map((colorm) => {
      if (colorm.id === color.id) {
        return { ...colorm, hexCode: cColor.hex() };
      } else {
        return {
          ...colorm,
        };
      }
    });
    setColors(newColors);
    let newInitialColor = { ...initialColor, hexCode: cColor.hex() };
    setInitialColor(newInitialColor);
  };
  const brightInputHandler = (e) => {
    let cColor = chroma(initialColor.hexCode).set("hsl.l", e.target.value);
    const newColors = colors.map((colorm) => {
      if (colorm.id === color.id) {
        return { ...colorm, hexCode: cColor.hex() };
      } else {
        return {
          ...colorm,
        };
      }
    });
    setColors(newColors);
    let newInitialColor = { ...initialColor, hexCode: cColor.hex() };
    setInitialColor(newInitialColor);
  };
  const saturationInputHandler = (e) => {
    let cColor = chroma(initialColor.hexCode).set("hsl.s", e.target.value);
    const newColors = colors.map((colorm) => {
      if (colorm.id === color.id) {
        return { ...colorm, hexCode: cColor.hex() };
      } else {
        return {
          ...colorm,
        };
      }
    });
    setColors(newColors);
    // e.target.attributes[6].value = e.target.value;
    // console.log(e.target.attributes[6].value);
    let newInitialColor = { ...initialColor, hexCode: cColor.hex() };
    setInitialColor(newInitialColor);
  };
  const copyToClipBoard = (e) => {
    navigator.clipboard.writeText(e.target.innerText); // basic copying to clipboard
    setCopyClipboard(true);
  };
  const lockColor = () => {
    const newColors = colors.map((colorm) => {
      if (colorm.id === color.id) {
        return { ...colorm, lock: !color.lock };
      } else {
        return {
          ...colorm,
        };
      }
    });
    setColors(newColors);
  };
  return (
    <div className="color" style={{ background: color.hexCode }}>
      <h2
        style={{
          color: chroma(color.hexCode).luminance() > 0.5 ? "black" : "white",
        }}
        onClick={copyToClipBoard}
      >
        {color.hexCode}
      </h2>
      <div className="controls">
        <button
          className="adjust"
          onClick={() => {
            setSpecsToggle(!specsToggle);
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "sliders-h"]}
            style={{
              color:
                chroma(color.hexCode).luminance() > 0.5 ? "black" : "white",
            }}
          />
        </button>
        <button className="lock" onClick={lockColor}>
          <FontAwesomeIcon
            icon={["fas", color.lock ? "lock" : "lock-open"]}
            style={{
              color:
                chroma(color.hexCode).luminance() > 0.5 ? "black" : "white",
            }}
          />
        </button>
      </div>
      <div className={`sliders ${specsToggle ? "active" : ""}`}>
        <button
          className="close-adjustment"
          onClick={() => {
            setSpecsToggle(!specsToggle);
          }}
        >
          X
        </button>
        <span>Hue</span>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          name="hue"
          className="hue-input"
          data-hue="0"
          value={chroma(initialColor.hexCode).hsl()[0]}
          style={inputHueBackground}
          onChange={hueInputHandler}
        />
        <span>Brightness</span>
        <input
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          name="brightness"
          className="bright-input"
          data-bright="0"
          value={chroma(color.hexCode).hsl()[2]}
          style={inputBrightBackground}
          onChange={brightInputHandler}
        />
        <span>Saturation</span>
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          name="saturation"
          className="sat-input"
          data-sat="0"
          value={chroma(color.hexCode).hsl()[1]}
          style={inputSatBackground}
          onChange={saturationInputHandler}
        />
      </div>
    </div>
  );
}

export default ColorEach;
