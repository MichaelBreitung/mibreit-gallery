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

  if (!slideshow.init(config)) {
    throw Error("createSlideshow Error: invalid config");
  }

  return slideshow;
}

export function createGallery(config) {
  if (isUndefined(config)) {
    throw Error("createGallery Error: No Config was provided");
  }

  const gallery = new Gallery();

  if (!gallery.init(config)) {
    throw Error("createGallery Error: invalid config");
  }

  return gallery;
}