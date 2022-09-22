import { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { Cloudinary } from "@cloudinary/url-gen";

import "./file-upload.styles.css";

const FileUpload = ({ fileNo, first, clear, inputKey, resetFileInput, addToArray }) => {
  const [file, setFile] = useState();
  const { setKenBurnsFiles, kenBurnsFiles } = useContext(GlobalContext);

  console.log(kenBurnsFiles);

  console.log("fileupload", file);

  console.log(clear, first);

  const handleChange = (event) => {
    setKenBurnsFiles([...kenBurnsFiles, URL.createObjectURL(event.target.files[0])]);
    setFile(URL.createObjectURL(event.target.files[0]));
    addToArray(event);
    resetFileInput();
  };

  return (
    <div className="file-upload-container">
      <h4>{file && "Image file " + fileNo ? fileNo + 1 : first && "1"}</h4>
      <input
        type="file"
        onChange={handleChange}
        accept="image/png, image/gif, image/jpeg"
        key={inputKey || ""}
      />
    </div>
  );
};

export default FileUpload;
