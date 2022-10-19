import React from "react";
import "./text-overlay.styles.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextOverlayVideo from "../text-overlay-video/text-overlay-video.component";
import { Hidden } from "@mui/material";

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
  const [textSize, setTextSize] = useState("medium");
  const [inputLength, setInputLength] = useState(9);
  const [fontColour, setFontColour] = useState("black");

  const handleChange = (event) => {
    setTextSize(event.target.value);
    console.log(textSize);
  };

  const handleSubmit = () => {
    setTextOverlaySubmit(inputValue);
    setSubmittedTextCoordinates({ x: textCoordinates.x, y: textCoordinates.y });
    setIsTextSubmitted(true);
    setIsCleared(false);
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

  console.log("input length", inputLength);

  console.log("font colour", fontColour);

  console.log("cleared?", isCleared);

  return (
    <div className="text-overlay-container">
      <h2>First test</h2>
      <TextOverlayVideo
        textPosition={submittedTextCoordinates}
        cldVid={textOverlaySubmit}
        clear={isCleared}
        textSize={textSize}
        fontColour={fontColour}
        isTextSubmitted={isTextSubmitted}
        // setIsTextSubmitted={setIsTextSubmitted}
      />
      <div className="draggable-container">
        <Draggable
          bounds={{ top: -200, left: -340, right: 340, bottom: 180 }}
          onStop={(event) => {
            onStopHandler(event);
          }}
          styles={{ overflow: "hidden" }}
        >
          <input
            style={{
              transform: isCleared ? "translate(0px, 0px)" : "",
              display: isTextSubmitted || isCleared ? "none" : "",
              fontSize:
                (textSize === "small" && "35px") ||
                (textSize === "medium" && "50px") ||
                (textSize === "large" && "75px"),
              color: fontColour,
            }}
            type="text"
            value={inputValue}
            className="text-input"
            onChange={(e) => {
              setInputValue(e.target.value);
              setInputLength(e.target.value.length);
            }}
          />
        </Draggable>
      </div>

      <FormControl
        className="text-size-selector-control"
        style={{ display: isTextSubmitted || isCleared ? "none" : "" }}
        fullWidth
      >
        <InputLabel id="demo-simple-select-label">Text size</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={textSize}
          label="Size"
          onChange={handleChange}
          className="size-selector"
        >
          <MenuItem value={"small"}>Small</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"large"}>Large</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: isTextSubmitted || isCleared ? "none" : "" }}>
        <label for="colours">Change font colour</label>
        <select onChange={(event) => setFontColour(event.target.value)} id="colours">
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

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
