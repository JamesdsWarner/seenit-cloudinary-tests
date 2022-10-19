import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, memo } from "react";
import { Position } from "@cloudinary/url-gen/qualifiers";
import "./text-overlay-video.styles.css";

import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";

const TextOverlayVideo = ({
  cldVid,
  clear,
  textPosition,
  textSize,
  fontColour,
  isTextSubmitted,
  setIsTextSubmitted,
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
  });

  const myVideo = cld.video("samples/sea-turtle");

  // useEffect(() => {

  // })

  myVideo.resize(fill().width(960).height(540)).setVersion(Math.floor(Math.random() * 10000));

  useEffect(() => {
    isTextSubmitted &&
      myVideo
        .overlay(
          source(
            text(
              `${cldVid}`,
              new TextStyle(
                "Arial",
                (textSize === "small" && 35) ||
                  (textSize === "medium" && 50) ||
                  (textSize === "large" && 75)
              )
            ).textColor(fontColour)
          ).position(
            new Position()
              .offsetX(`${parseInt(textPosition.x) + 435}`)
              .offsetY(`${parseInt(textPosition.y) + 247}`)
          )
        )
        .resize(fill().width(960).height(540))
        .setVersion(Math.floor(Math.random() * 10000));
  }, [isTextSubmitted]);

  useEffect(() => {
    myVideo.resize(fill().width(960).height(540));
  }, [clear]);

  console.log(cldVid);
  console.log(myVideo);

  return (
    <div className="text-overlay-video-container">
      <AdvancedVideo cldVid={myVideo} controls overwrite invalidate />
    </div>
  );
};

export default memo(TextOverlayVideo);
