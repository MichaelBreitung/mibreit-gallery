import "./css/mibreit-gallery.css";
import "./css/mibreit-slideshow.css";
import "./css/mibreit-thumbview.css";

import "./images/next-image.png";
import "./images/previous-image.png";
import "./images/next.png";
import "./images/previous.png";
import "./images/image-placeholder-transparent.png";
import "./images/exit-fullscreen.png";
import "./images/fullscreen.png";

import {
  isUndefined
} from "./tools/typeChecks";

import GalleryBuilder from "./components/gallery";

export {
  SCALE_MODE_STRETCH,
  SCALE_MODE_FITASPECT,
  SCALE_MODE_NONE,
  SCALE_MODE_EXPAND
}
from "./components/imageWrapper";

export function createSlideshow(config) {
  if (isUndefined(config)) {
    throw Error("createSlideshow Error: No Config was provided");
  }

  const slideshowBuilder = new GalleryBuilder(config.slideshowContainer)
    .withInterval(config.interval)
    .withPreloaderLeftSize(config.preloaderLeftNr)
    .withPreloaderRightSize(config.preloaderRightNr)
    .withImageChangedCallback(config.imageChangedCallback)
    .withScaleMode(config.imageScaleMode);

  const slideshow = slideshowBuilder.buildSlideshow();

  if (!slideshow.init()) {
    throw Error("createSlideshow Error: invalid html structure");
  }

  return slideshow;
}

export function createGallery(config) {
  if (isUndefined(config)) {
    throw Error("createGallery Error: No Config was provided");
  }

  const galleryBuilder = new GalleryBuilder(config.slideshowContainer)
    .withInterval(config.interval)
    .withPreloaderLeftSize(config.preloaderLeftNr)
    .withPreloaderRightSize(config.preloaderRightNr)
    .withImageChangedCallback(config.imageChangedCallback)
    .withScaleMode(config.imageScaleMode)
    .withFullscreen(config.allowFullscreen)
    .withPreloaderLeftSize(config.preloaderLeftNr)
    .withPreloaderRightSize(config.preloaderRightNr)
    .withThumbviewContainer(config.thumbviewContainer)
    .withShowThumbview(config.showThumbView)
    .withSlideshowNextButton(config.slideshowNext)
    .withSlideshowPreviousButton(config.slideshowPrevious)
    .withThumbviewNextButton(config.thumbviewNext)
    .withThumbviewPreviousButton(config.thumbviewPrevious)
    .withTitleContainer(config.titleContainer);

  const gallery = galleryBuilder.buildGallery();

  gallery.init();

  return gallery;
}