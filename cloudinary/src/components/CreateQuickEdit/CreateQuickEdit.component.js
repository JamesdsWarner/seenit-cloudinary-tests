import TextOverlay from "../text-overlay/text-overlay.component";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import KenBurns from "../ken-burns/ken-burns.component";
import Pad from "../pad/pad.component";
import ClipBox from "../ClipBox/ClipBox.component";
import { useState } from "react";
import "./CreateQuickEdit.styles.css";

const CreateQuickEdit = () => {
  const [radioValue, setRadioValue] = useState("Text overlay");

  const handleRadio = (event) => {
    setRadioValue(event.target.value);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
  });

  const myFirstClip = cld.video("samples/landscape-selfie").resize(fill().width(960).height(540));

  const mySecondClip = cld.video("quiet-portrait").resize(fill().width(540).height(960));

  return (
    <div className="create-quick-edit-container">
      <header>
        <div className="quick-edit-header">
          <h1>Create Quick Edit</h1>
        </div>
      </header>
      <div className="create-quick-edit-inner">
        <h2 className="quick-edit-second-header">Video setup</h2>
        <ClipBox />
        {radioValue === "Text overlay" && <TextOverlay />}
        {radioValue === "Ken burns" && <KenBurns />}
        {radioValue === "Pad" && <Pad />}
        <div className="radio-container">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select effect</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(event) => handleRadio(event)}
              defaultValue="Text overlay"
            >
              <FormControlLabel value="Text overlay" control={<Radio />} label="Text overlay" />
              <FormControlLabel value="Ken burns" control={<Radio />} label="Ken burns" />
              <FormControlLabel value="Pad" control={<Radio />} label="Pad" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default CreateQuickEdit;
