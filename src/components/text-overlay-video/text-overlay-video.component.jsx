import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, memo } from "react";

import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";

const TextOverlayVideo = ({ cldVid, clear }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
  });

  const myVideo = cld.video("samples/sea-turtle");

  myVideo.resize(fill().width(960).height(540));

  useEffect(() => {
    myVideo.overlay(source(text(`${cldVid}`, new TextStyle("Arial", 80)))).resize(fill().width(960).height(540));
  }, [cldVid]);

  useEffect(() => {
    myVideo.resize(fill().width(960).height(540));
  }, [clear]);

  return (
    <div className="text-overlay-container">
      <h2>First test</h2>
      <AdvancedVideo cldVid={myVideo} controls />
    </div>
  );
};

export default memo(TextOverlayVideo);
