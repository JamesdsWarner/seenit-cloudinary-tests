import FileUpload from "../file-upload/file-upload.component";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import "./ken-burns.styles.css";
import { upload, genDeliveryURL } from "../../helpers";
import SlideShowPreviewer from "../SlideShowPreviewer";

const KenBurns = () => {
  const { setKenBurnsFiles, kenBurnsFiles } = useContext(GlobalContext);
  const [fileUploads, setFileUploads] = useState(1);
  const [deliveryURL, setDeliveryURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

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
      const uploadedImgsPublicIds = await uploadMultipleImages(kenBurnsFiles);
      console.log(uploadedImgsPublicIds);
      const deliveryUrl = genDeliveryURL(uploadedImgsPublicIds);
      setDeliveryURL(deliveryUrl);
      setKenBurnsFiles([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setFileUploads(fileUploads + 1);
  };

  const handleStartOver = () => {
    setKenBurnsFiles([]);
    setFileUploads(1);
    setClear(true);
    resetFileInput();
  };

  console.log(fileUploads);

  return (
    <div className="ken-burns-container">
      <h2 className="ken-title">Ken Burns</h2>
      {deliveryURL && <SlideShowPreviewer url={deliveryURL} />}

      <FileUpload resetClear={resetClear} inputKey={inputKey} first clear={clear} />
      {fileUploads > 1 &&
        [...Array(fileUploads - 1)].map((e, i) => (
          <FileUpload resetClear={resetClear} fileNo={i + 1} key={i} />
        ))}
      <div
        className="add-another-file"
        style={{ display: kenBurnsFiles.length === fileUploads - 1 ? "none" : "" }}
        onClick={handleClick}
      >
        Click here to add another file
      </div>
      {kenBurnsFiles.length > 0 && (
        <div>
          <button onClick={buildSlideShow} className="create_slide_btn">
            {loading ? "processing" : "generate slideshow"}
          </button>
          <p onClick={handleStartOver}>Start over</p>
        </div>
      )}
    </div>
  );
};

export default KenBurns;
