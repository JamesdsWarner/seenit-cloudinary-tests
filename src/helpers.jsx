import axios from "axios";

const cloudName = "dbq4xtolf";

const upload = async (imgFileB64) => {
  const imageData = new FormData();
  imageData.append("file", imgFileB64);
  imageData.append("upload_preset", "kenburns");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    imageData
  );
  const imageDetails = res.data;
  console.log("public ids", imageDetails.public_id);
  return imageDetails.public_id;
};

const genDeliveryURL = (arrOfAsetIds) => {
  const templateID = "slideshow_i2o0w9_mhxhzv";
  const globalSettings = `w_960;h_540;du_10`;
  const slideSettings = `tdur_1500;transition_s:fade`;

  const individualSlides = arrOfAsetIds.map((id) => "(media_i:" + id + ")").join(";");

  return `https://res.cloudinary.com/${cloudName}/video/upload/fn_render:${globalSettings};vars_(${slideSettings};slides_(${individualSlides}))/${templateID}.mp4`;
};

export { upload, genDeliveryURL };
