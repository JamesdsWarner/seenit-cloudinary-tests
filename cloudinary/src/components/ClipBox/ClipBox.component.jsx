import { AdvancedVideo } from "@cloudinary/react";
import "./ClipBox.styles.css";

const ClipBox = ({ clipPreviewVideo }) => {
  return (
    <div className="clip-box-container">
      <AdvancedVideo cldVid={clipPreviewVideo} controls overwrite />
      <h3>Clip</h3>
    </div>
  );
};

export default ClipBox;
