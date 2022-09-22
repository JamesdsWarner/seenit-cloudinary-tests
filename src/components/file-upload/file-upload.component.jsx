import { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Cloudinary } from "@cloudinary/url-gen";

import "./file-upload.styles.css";

const FileUpload = ({ fileNo, first, clear, inputKey, resetClear }) => {
  const [file, setFile] = useState();
  const { setKenBurnsFiles, kenBurnsFiles } = useContext(GlobalContext);

  const imageElement = useRef();

  console.log(kenBurnsFiles);

  console.log(clear, first);

  useEffect(() => {
    setFile();
    resetClear();
  }, [clear]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        return reader.result;
      };
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (event) => {
    getBase64(event.target.files[0]).then((data) => setKenBurnsFiles([...kenBurnsFiles, data]));
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="file-upload-container">
      <h4>Upload file {fileNo ? fileNo + 1 : first && ""}</h4>
      <input
        type="file"
        onChange={handleChange}
        accept="image/png, image/gif, image/jpeg"
        key={inputKey || ""}
      />
      {file && (
        <div className="slideshow-image-preview-container">
          <img src={file} className="slideshow-image-preview" alt="slideshow-input-image-preview" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
