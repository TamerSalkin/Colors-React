import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import chroma from "chroma-js";
import LibraryPicks from "./LibraryPicks";

library.add(fas);

function Controls({ colors, setColors }) {
  // State
  const [savePopup, setSavePopup] = useState(false);
  const [libraryPopup, setLibraryPopup] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [localLibrary, setLocalLibrary] = useState(
    JSON.parse(localStorage.getItem("palettes")) === null
      ? []
      : JSON.parse(localStorage.getItem("palettes"))
  );
  // useEffect
  useEffect(() => {
    localStorage.setItem("palettes", JSON.stringify(localLibrary));
  }, [localLibrary]);
  //Handlers
  const generateColors = () => {
    const newColors = colors.map((color) => {
      if (color.lock === true) {
        return { ...color };
      } else {
        return { ...color, hexCode: chroma.random().hex() };
      }
    });
    setColors(newColors);
  };
  const saveNameHandler = (e) => {
    setSaveName(e.target.value);
  };
  const saveSubmitHandler = () => {
    let localPalettes = [...localLibrary];
    localPalettes.push({ name: saveName, colors });
    setSaveName("");
    setLocalLibrary(localPalettes);
  };
  // localStorage.clear();
  return (
    <div>
      <div className="panel">
        <div className="library-panel">
          <button
            className="library"
            onClick={() => {
              setLibraryPopup(!libraryPopup);
            }}
          >
            <FontAwesomeIcon icon={["fas", "book-open"]} />
          </button>
          <p>Library</p>
        </div>
        <div className="generate-panel">
          <button className="generate" onClick={generateColors}>
            <FontAwesomeIcon icon={["fas", "sync"]} />
          </button>
          <p>Generate</p>
        </div>
        <div className="save-panel">
          <button
            className="save"
            onClick={() => {
              setSavePopup(!savePopup);
            }}
          >
            <FontAwesomeIcon icon={["fas", "save"]} />
          </button>
          <p>Save</p>
        </div>
      </div>
      <div className={`save-container ${savePopup ? "active" : ""}`}>
        <div className={`save-popup ${savePopup ? "active" : ""}`}>
          <button
            className="close-save-button"
            onClick={() => {
              setSavePopup(!savePopup);
            }}
          >
            X
          </button>
          <h4>Give a name to your palette</h4>
          <input
            type="text"
            maxLength="35"
            className="save-name"
            onChange={saveNameHandler}
            value={saveName}
          />
          <button
            className="submit-save"
            type="submit"
            onClick={saveSubmitHandler}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={`library-container ${libraryPopup ? "active" : ""}`}>
        <div className={`library-popup ${libraryPopup ? "active" : ""}`}>
          <button
            className="close-library-button"
            onClick={() => {
              setLibraryPopup(!libraryPopup);
            }}
          >
            X
          </button>
          <h4>Pick your palette</h4>
          {localLibrary !== null
            ? localLibrary.map((palette) => (
                <LibraryPicks
                  palette={palette}
                  id={localLibrary.indexOf(palette)}
                  setColors={setColors}
                  key={localLibrary.indexOf(palette)}
                  localLibrary={localLibrary}
                  setLocalLibrary={setLocalLibrary}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Controls;
