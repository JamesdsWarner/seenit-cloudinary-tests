import { AdvancedVideo } from "@cloudinary/react";

const Filters = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbq4xtolf",
    },
    url: {
      analytics: false,
    },
  });

  const cloudVideo = cld.video("samples/landscape-selfie").resize(fill().width(960).height(540));

  return (
    <>
      <AdvancedVideo cldVid={cloudVideo} controls overwrite />
    </>
  );
};

export default Filters;
