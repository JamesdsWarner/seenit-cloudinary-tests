import FileUpload from "../file-upload/file-upload.component";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./ken-burns.styles.css";
import { upload, genDeliveryURL } from "../../helpers";
import SlideShowPreviewer from "../SlideShowPreviewer";
import ImagePreview from "../slideshow-image-preview/slideshow-image-preview.component";

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
      />

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
