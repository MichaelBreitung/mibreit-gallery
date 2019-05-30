import "./css/mibreit-gallery.css";
import "./css/mibreit-slideshow.css";
import "./css/mibreit-thumbview.css";

import "./images/next-image.png";
import "./images/previous-image.png";
import "./images/next.png";
import "./images/previous.png";
import "./images/image-placeholder-transparent.png";
import "./images/exit-fullscreen.png";

import {
  isUndefined
} from "./tools/typeChecks";

import Slideshow from "./components/slideshow";
import Gallery from "./components/gallery";

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