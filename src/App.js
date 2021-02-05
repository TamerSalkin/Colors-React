import React, { useState } from "react";
import "./styles/app.scss";
import Colors from "./components/Colors";
import Controls from "./components/Controls";
import data from "./data";

function App() {
  // State
  const [colors, setColors] = useState(data);
  const [copyClipboard, setCopyClipboard] = useState(false);
  const transitionEnd = () => {
    setCopyClipboard(false);
  };
  return (
    <div className="App">
      <Colors
        colors={colors}
        setColors={setColors}
        setCopyClipboard={setCopyClipboard}
      />
      <Controls colors={colors} setColors={setColors} />
      <div className={`copy-container ${copyClipboard ? "active" : ""}`}>
        <div
          className={`copy-popup ${copyClipboard ? "active" : ""}`}
          onTransitionEnd={transitionEnd}
        >
          <h3>Copied to clipboard!</h3>
          <h4>&#128077;</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
