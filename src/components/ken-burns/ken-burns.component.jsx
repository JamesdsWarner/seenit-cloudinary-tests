import FileUpload from "../file-upload/file-upload.component";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./ken-burns.styles.css";
import { upload, genDeliveryURL } from "../../helpers";
import SlideShowPreviewer from "../SlideShowPreviewer";
import ImagePreview from "../slideshow-image-preview/slideshow-image-preview.component";
import TextField from "@mui/material/TextField";

const KenBurns = () => {
  const { setKenBurnsFiles, kenBurnsFiles } = useContext(GlobalContext);
  const [fileUploads, setFileUploads] = useState(1);
  const [deliveryURL, setDeliveryURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));
  const [duration, setDuration] = useState(10);
  const [videosArray, setVideosArray] = useState([]);

  console.log("videos array", videosArray);

  const resetFileInput = () => {
    let randomString = Math.random().toString(36);
    setInputKey(randomString);
  };

  const uploadMultipleImages = async (images) => {
    var arrOfImageIds = [];
    for (const image of images) {
      arrOfImageIds.push(await upload(image));
    }
    return arrOfImageIds;
  };

  const resetClear = () => {
    setClear(false);
  };

  const buildSlideShow = async () => {
    try {
      setLoading(true);
      const uploadedImgsPublicIds = await uploadMultipleImages(videosArray);
      console.log(uploadedImgsPublicIds);
      const deliveryUrl = genDeliveryURL(uploadedImgsPublicIds, duration);
      setDeliveryURL(deliveryUrl);
      setKenBurnsFiles([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setKenBurnsFiles([]);
    setVideosArray([]);
    setFileUploads(1);
    setClear(true);
    resetFileInput();
    setDeliveryURL();
  };

  const handleTextChange = (event) => {
    setDuration(event.target.value);
    console.log(duration);
  };

  const addToArray = (event) => {
    setVideosArray([...videosArray, event.target.files[0]]);
  };

  console.log(fileUploads);

  return (
    <div className="ken-burns-container">
      <h2 className="ken-title">Ken Burns</h2>
      {deliveryURL && (
        <>
          <SlideShowPreviewer url={deliveryURL} />{" "}
          <p className="start-over" onClick={handleStartOver}>
            Start over
          </p>
        </>
      )}
      {kenBurnsFiles.map((file, i) => {
        console.log("file", file);
        return (
          <ImagePreview
            resetFileInput={resetFileInput}
            file={file}
            resetClear={resetClear}
            key={i}
            fileNo={i + 1}
          />
        );
      })}

      <FileUpload
        resetFileInput={resetFileInput}
        fileNo={kenBurnsFiles.length}
        inputKey={inputKey}
        first
        clear={clear}
        addToArray={addToArray}
      />

      <TextField
        id="outlined-basic"
        label="Duration (seconds)"
        variant="outlined"
        onChange={handleTextChange}
      />

      {kenBurnsFiles.length > 0 && (
        <div>
          <button onClick={buildSlideShow} className="create_slide_btn">
            {loading ? "processing" : "generate slideshow"}
          </button>
          <p className="start-over" onClick={handleStartOver}>
            Start over
          </p>
        </div>
      )}
    </div>
  );
};

export default KenBurns;
