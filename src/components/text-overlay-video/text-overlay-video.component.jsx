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

const TextOverlayVideo = ({ cldVid, clear, textPosition }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
    version: "v1312461204",
  });

  const myVideo = cld.video("samples/sea-turtle");

  myVideo.resize(fill().width(960).height(540));

  useEffect(() => {
    myVideo
      .overlay(
        source(text(`${cldVid}`, new TextStyle("Arial", 50))).position(
          new Position()
            .offsetX(`${parseInt(textPosition.x) + 435}`)
            .offsetY(`${parseInt(textPosition.y) + 247}`)
        )
      )
      .resize(fill().width(960).height(540));
  }, [cldVid]);

  useEffect(() => {
    myVideo.resize(fill().width(960).height(540));
  }, [clear]);

  return (
    <div className="text-overlay-video-container">
      <AdvancedVideo cldVid={myVideo} controls overwrite invalidate />
    </div>
  );
};

export default memo(TextOverlayVideo);
