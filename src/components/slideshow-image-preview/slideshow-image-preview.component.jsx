import "./slideshow-image-preview.styles.css";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect } from "react";

const ImagePreview = ({ file, resetClear, clear, fileNo }) => {
  const { setKenBurnsFiles, kenBurnsFiles } = useContext(GlobalContext);

  const handleRemoveImage = () => {
    setKenBurnsFiles(kenBurnsFiles.filter((fileToRemove) => fileToRemove !== file));
    console.log(kenBurnsFiles);
  };

  useEffect(() => {
    resetClear();
  }, [clear]);

  console.log("imagepreview", file);

  return (
    <div className="slideshow-image-preview-container">
      <h4>{fileNo}</h4>
      <img src={file} className="slideshow-image-preview" alt="slideshow-input-image-preview" />
      <p onClick={handleRemoveImage} className="cancel-ken-burns-image">
        &#10006;
      </p>
    </div>
  );
};

export default ImagePreview;
