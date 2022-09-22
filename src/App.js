import TextOverlay from "./components/text-overlay/text-overlay.component";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import KenBurns from "./components/ken-burns/ken-burns.component";
import { useState } from "react";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  const [radioValue, setRadioValue] = useState("Text overlay");

  const handleRadio = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <GlobalProvider>
      <div className="App">
        {radioValue === "Text overlay" && <TextOverlay />}
        {radioValue === "Ken burns" && <KenBurns />}
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
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
