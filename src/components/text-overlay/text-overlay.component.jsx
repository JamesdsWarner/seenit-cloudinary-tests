import React from "react";
import "./text-overlay.styles.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextOverlayVideo from "../text-overlay-video/text-overlay-video.component";

const TextOverlay = () => {
  const [textOverlay, setTextOverlay] = useState("");
  const [textOverlaySubmit, setTextOverlaySubmit] = useState("");
  const [isCleared, setIsCleared] = useState(false);

  const handleChange = (event) => {
    setTextOverlay(event.target.value);
  };

  const handleSubmit = () => {
    setTextOverlaySubmit(textOverlay);
  };

  const handleClearSubmit = () => {
    setIsCleared(!isCleared);
  };

  return (
    <div className="text-overlay-container">
      <TextOverlayVideo cldVid={textOverlaySubmit} clear={isCleared} />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChange} />
      <Button onClick={handleSubmit} variant="text">
        Submit
      </Button>
      <Button onClick={handleClearSubmit} variant="text">
        Clear
      </Button>
    </div>
  );
};

export default TextOverlay;
