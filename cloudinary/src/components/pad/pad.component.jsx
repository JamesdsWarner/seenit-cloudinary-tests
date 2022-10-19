// import { color } from "@mui/system";
import { Color } from "@cloudinary/url-gen/qualifiers";
import { useEffect, useState } from "react";
import { Cloudinary, CloudinaryVideo } from "@cloudinary/url-gen";
import { blurred, color } from "@cloudinary/url-gen/qualifiers/background";
import { AdvancedVideo } from "@cloudinary/react";
import { fill, pad, fillPad, aspectRatio } from "@cloudinary/url-gen/actions/resize";
import { vignette } from "@cloudinary/url-gen/actions/effect";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { brightness } from "@cloudinary/url-gen/actions/adjust";
import { by3dLut } from "@cloudinary/url-gen/actions/adjust";
import "./pad.styles.css";

const Pad = () => {
  const [orientation, setOrientation] = useState("landscape");
  const [newOrientation, setNewOrientation] = useState("landscape");
  const [isBlurred, setIsBlurred] = useState(false);
  const [submittedOrientation, setSubmittedOrientation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVignetteSelected, setIsVignetteSelected] = useState(false);
  const [isBlackAndWhiteSelected, setIsBlackAndWhiteSelected] = useState(false);
  const [isBrightnessSelected, setIsBrightnessSelected] = useState(false);
  const [videoBrightness, setVideoBrightness] = useState(0);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
  });

  const myLandscapePadVideo = cld
    .video("samples/landscape-selfie")
    .resize(fill().width(960).height(540));
  // myLandscapePadVideo.resize(fill().width(960).height(540));

  const [cloudVideo, setCloudVideo] = useState(myLandscapePadVideo);

  const myPortraitPadVideo = cld
    .video("samples/puppy-portrait")
    .resize(fill().width(540).height(960));
  // myPortraitPadVideo.resize(fill().width(540).height(960));

  useEffect(() => {
    if (orientation === "landscape") {
      setCloudVideo(myLandscapePadVideo);
    } else if (orientation === "portrait") {
      setCloudVideo(myPortraitPadVideo);
    }
  }, [orientation]);

  useEffect(() => {
    if (submittedOrientation === "landscape") {
      setCloudVideo(
        cld
          .video(
            orientation === "landscape"
              ? "samples/landscape-selfie"
              : orientation === "portrait"
              ? "samples/puppy-portrait"
              : null
          )

          // .video(orientation === "landscape" ? "samples/sea-turtle" : "samples/puppy-portrait")
          .resize(
            pad()
              .width(960)
              .height(540)
              .background(isBlurred ? blurred().intensity(800).brightness(0.1) : color("black"))
          )
        // .adjust(by3dLut("Color_Punch_Warm_jgakrv.3DL"))

        // .effect(vignette())
        // .adjust(brightness().level(videoBrightness))
      );
    } else if (submittedOrientation === "portrait") {
      setCloudVideo(
        cld
          .video(
            orientation === "landscape"
              ? "samples/landscape-selfie"
              : orientation === "portrait"
              ? "samples/puppy-portrait"
              : null
          )
          .resize(
            orientation === "portrait"
              ? pad().background(
                  isBlurred ? blurred().intensity(800).brightness(0.1) : color("black")
                )
              : orientation === "landscape"
              ? fillPad().width(540).height(960).gravity(autoGravity())
              : null
          )
          .effect(vignette())
      );
    } else if (!submittedOrientation) {
      if (orientation === "landscape") {
        setCloudVideo(myLandscapePadVideo.resize(fill().width(960).height(540)));
      } else if (orientation === "portrait") {
        setCloudVideo(myPortraitPadVideo.resize(fill().width(540).height(960)));
      }
    }
  }, [submittedOrientation]);

  // useEffect(() => {

  // }, [])

  const handleOrientationSubmit = () => {
    if (submittedOrientation) {
      setSubmittedOrientation("");
      changeSelected();
      setNewOrientation("landscape");
      setIsSubmitted(false);
      myLandscapePadVideo = cld.video("samples/sea-turtle");
      myPortraitPadVideo = cld.video("samples/puppy-portrait");
    } else {
      setIsSubmitted(true);

      setSubmittedOrientation(newOrientation);
      console.log(newOrientation, "new orientation");
    }
  };

  const handleChangeBlurred = () => {
    setIsBlurred(!isBlurred);
    setSubmittedOrientation("");
  };

  const handleChangeBlackAndWhite = () => {};

  const getBrightness = (brightness) => {
    const brightnesses = {
      darkest: -20,
      darker: -10,
      normal: 0,
      brighter: 15,
      brightest: 30,
    };

    return brightnesses[brightness.toLowerCase()];
  };

  const handleChangeBrightness = (event) => {
    setIsBrightnessSelected(!isBrightnessSelected);
    const newBrightness = getBrightness(event.target.value);
    setVideoBrightness(newBrightness);
  };

  const handleChangeVignette = () => {
    setIsVignetteSelected(!isVignetteSelected);
    setSubmittedOrientation("");
  };

  const changeSelected = () => {
    const select = document.querySelector("#orientation");
    select.value = "landscape";
  };

  const handleChangedOrientation = (event) => {
    setNewOrientation(event.target.value);
  };
  console.log(newOrientation, "new orientation");
  console.log(orientation, "orientation");
  console.log(submittedOrientation, "submitted");
  console.log(brightness);

  return (
    <>
      <h2>Change orientation and add padding</h2>
      <select onChange={(event) => setOrientation(event.target.value)} id="video-orientation">
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
      </select>
      <AdvancedVideo
        // style={{ filter: submittedOrientation ? "none" : `brightness(${videoBrightness}%)` }}
        cldVid={cloudVideo}
        controls
        overwrite
      />

      <div style={{ display: submittedOrientation ? "none" : "" }}>
        <label for="orientation-pad">Choose orientation</label>
        <select onChange={(event) => handleChangedOrientation(event)} id="orientation">
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>

      <div style={{ display: submittedOrientation ? "none" : "" }}>
        <input
          type="checkbox"
          id="blurred"
          name="blurred"
          value="Blurred"
          onChange={handleChangeBlurred}
        />
        <label for="blurred">Blurred</label>{" "}
        <input
          type="checkbox"
          id="black-and-white"
          name="black-and-white"
          value="black-and-white"
          onChange={handleChangeBlurred}
        />
        <label for="black-and-white">Black & white</label>{" "}
        <input
          type="checkbox"
          id="brightness"
          name="brightness"
          value="Brightness"
          onChange={handleChangeBlurred}
        />
        <label for="orientation-pad">Choose orientation</label>
        <select onChange={(event) => handleChangeBrightness(event)} id="orientation">
          <option value="darkest">Darkest</option>
          <option value="darker">Darker</option>
          <option value="normal" selected="selected">
            Normal
          </option>
          <option value="brighter">Brighter</option>
          <option value="brightest">Brightest</option>
        </select>
        <label for="brightness">Brightness</label>{" "}
        {/* <div className="slidecontainer" style={{ display: submittedOrientation ? "none" : "" }}>
          <input
            type="range"
            min="25"
            max="150"
            value={videoBrightness}
            className="slider"
            id="myRange"
            onChange={handleChangeBrightness}
          />
          {videoBrightness}
        </div> */}
        {/* <input
          type="checkbox"
          id="vignette"
          name="vignette"
          value="Vignette"
          onChange={handleChangeVignette}
        />
        <label for="vignette">Vignette</label>{" "} */}
      </div>
      <button onClick={handleOrientationSubmit}>{submittedOrientation ? "Reset" : "Submit"}</button>
    </>
  );
};

export default Pad;
