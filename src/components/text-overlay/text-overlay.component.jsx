import React from "react";
import "./text-overlay.styles.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import TextOverlayVideo from "../text-overlay-video/text-overlay-video.component";

const TextOverlay = () => {
  const [textOverlaySubmit, setTextOverlaySubmit] = useState("");
  const [isCleared, setIsCleared] = useState(true);
  const [inputValue, setInputValue] = useState("Text");
  const [textCoordinates, setTextCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [submittedTextCoordinates, setSubmittedTextCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isTextSubmitted, setIsTextSubmitted] = useState(false);

  const handleSubmit = () => {
    setTextOverlaySubmit(inputValue);
    setSubmittedTextCoordinates({ x: textCoordinates.x, y: textCoordinates.y });
    setIsTextSubmitted(true);
  };

  const handleClearSubmit = () => {
    setIsCleared(true);
    setIsTextSubmitted(false);
    setInputValue("");
  };

  const onStopHandler = (event) => {
    const textPlacement = event.target.style.transform;
    console.log(textPlacement);
    const transformValues = textPlacement.replace(/[^\-?\d. ]/g, "").split(" ");
    setTextCoordinates({ x: transformValues[0], y: transformValues[1] });
    console.log(textCoordinates.x);
    console.log(event.clientX);
  };

  const handleAddText = () => {
    setIsCleared(false);
    setInputValue("Text here");
  };

  return (
    <div className="text-overlay-container">
      <h2>First test</h2>
      <TextOverlayVideo
        textPosition={submittedTextCoordinates}
        cldVid={textOverlaySubmit}
        clear={isCleared}
      />
      <Draggable
        bounds={{ top: -200, left: -400, right: 400, bottom: 220 }}
        onStop={(event) => {
          onStopHandler(event);
        }}
      >
        <input
          style={{
            transform: isCleared ? "translate(0px, 0px)" : "",
            display: isTextSubmitted || isCleared ? "none" : "",
          }}
          type="text"
          value={inputValue}
          className="text-input"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Draggable>

      <div className="button-container">
        <Button
          onClick={isCleared ? handleAddText : handleSubmit}
          variant="contained"
          style={{ display: isTextSubmitted ? "none" : "" }}
        >
          {isCleared ? "Add text" : "Submit"}
        </Button>
        <Button
          //   onClick={() => window.location.reload(false)}
          onClick={handleClearSubmit}
          variant="contained"
          style={{ display: isCleared ? "none" : "" }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default TextOverlay;
