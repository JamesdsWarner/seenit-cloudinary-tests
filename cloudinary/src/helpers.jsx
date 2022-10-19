import axios from "axios";
import { cloudinary, CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { concatenate, trim } from "@cloudinary/url-gen/actions/videoEdit";
import { Concatenate } from "@cloudinary/url-gen/qualifiers/concatenate";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { VideoSources } from "@cloudinary/html";

const cloudName = "dbq4xtolf";

const imagesToKenBurns = {};

const upload = async (imgFileB64) => {
  const imageData = new FormData();
  imageData.append("file", imgFileB64);
  imageData.append("upload_preset", "kenburns");
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload/`,
    // `https://res.cloudinary.com/${cloudName}/image/upload/${imgFileB64.name}`
    imageData
  );

  const imageDetails = res.data;
  console.log(res, imageData, "this");

  console.log("public ids", imageDetails.public_id);
  return imageDetails.public_id;
};

const genDeliveryURL = (arrOfAsetIds, duration) => {
  const slideDuration = Math.floor(duration / arrOfAsetIds.length) * 1000;
  const templateID = "slideshow_i2o0w9_mhxhzv";
  const globalSettings = `w_960;h_540;du_${duration}`;
  const slideSettings = `sdur_${slideDuration};tdur_1500;transition_s:fade`;

  console.log(arrOfAsetIds);
  // ;transformation_s:e_zoompan:mode_ztr;maxzoom_6.5;du_10
  // res.cloudinary.com/demo/image/upload//e_loop/docs/hotel-pool.gif

  const individualSlides = arrOfAsetIds.map((id) => "(media_v:" + id + ";type_s:video)").join(";");

  return `https://res.cloudinary.com/${cloudName}/video/upload/fn_render:${globalSettings};vars_(${slideSettings};slides_(${individualSlides}))/${templateID}.mp4`;
};

const createSlideshow = async (arrOfAsetIds, duration) => {
  console.log("Duration", duration);
  const result = await axios.post("http://localhost:8001/slideshow", {
    duration: duration,
    arrOfAsetIds: arrOfAsetIds,
  });

  try {
    return result.data;

    console.log("data", result.data);
  } catch (err) {
    console.log(err);
  }
};

// const upload = async (imgFileB64) => {
//   console.log(imgFileB64);
//   const result = await axios.post("http://localhost:8001", {
//     image: imgFileB64,
//   });
//   try {
//     console.log("data", result.data);

//     return result.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export { upload, genDeliveryURL, createSlideshow };
