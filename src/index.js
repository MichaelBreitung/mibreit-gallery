import {
  isUndefined
} from "./tools/typeChecks";

import Slideshow from "./components/slideshow";
import Gallery from "./components/gallery";
import ImageLoader from "./components/loader";

export function createSlideshow(config) {
  if (isUndefined(config)) {
    throw Error("createSlideshow Error: No Config was provided");
  }

  const slideshow = new Slideshow();

  const error = slideshow.init(config);
  if (error) {
    throw Error("createSlideshow Error: invalid config - Error Code: " + error);
  }

  return slideshow;
}

export function createGallery(config) {
  if (isUndefined(config)) {
    throw Error("createGallery Error: No Config was provided");
  }

  const gallery = new Gallery();

  const error = gallery.init(config);
  if (error) {
    throw Error("createGallery Error: invalid config - Error Code: " + error);
  }

  return gallery;
}

// export function loadImages(config) {
//   if (isUndefined(config)) {
//     throw Error("loadImages Error: No Config was provided");
//   }

//   const imageLoader = new ImageLoader();

//   if (!imageLoader.init(config)) {
//     throw Error("imageLoader Error: invalid config");
//   }
// }