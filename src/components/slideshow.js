/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import Preloader from "./preloader";
import ImageWrapper, {
  SCALE_MODES,
  SCALE_MODE_FITASPECT
} from "./imageWrapper";
import {
  isString,
  isNumber,
} from "../tools/typeChecks";

import {
  BASE_Z_INDEX
} from "../tools/globals";

// behavior
const IMAGE_ANIMATION_TIME = 800;
const DEFAULT_IMAGE_CHANGE_INTERVAL = 3000;

// css classes
const IMAGE_ELEMENT_CLASS = ".mibreit-imageElement";

/** 
 * Builder is used to separate the configuration and buildig of the Slideshow
 * from it's behavior.
 */
export default class SlideshowBuilder {
  constructor(slideshowContainer) {
    // defaults
    this.interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this.scaleMode = SCALE_MODE_FITASPECT;
    this.imageChangedCallback = undefined;
    this.preloadLeftNr = undefined;
    this.preloadRightNr = undefined;

    this.slideshowContainer = isString(slideshowContainer) ? slideshowContainer : "";
  }
  withImageChangedCallback(imageChangedCallback) {
    this.imageChangedCallback = imageChangedCallback;
    return this;
  }
  withInterval(interval) {
    if (isNumber(interval)) {
      this.interval = interval;
    }
    return this;
  }
  withScaleMode(scaleMode) {
    if (SCALE_MODES.includes(scaleMode)) {
      this.scaleMode = scaleMode;
    }
    return this;
  }
  withPreloaderLeftSize(number) {
    if (number > 0) {
      this.preloadLeftNr = number;
    }
    return this;
  }
  withPreloaderRightSize(number) {
    if (number > 0) {
      this.preloadRightNr = number;
    }
    return this;
  }
  build() {
    return new Slideshow(this);
  }
}

class Slideshow {
  constructor(config) {
    this._config = config;

    // default initialization
    this._currentIndex = 0;
    this._imageContainers = [];
    this._imageWrappers = [];
    this._intervalId = -1;
    this._baseZIndex = BASE_Z_INDEX;
    this._preloader = undefined;
  }

  init() {
    let error_code = 0;
    if ($(this._config.slideshowContainer).length) {
      this._imageContainers = $(
        `${this._config.slideshowContainer} ${IMAGE_ELEMENT_CLASS}`
      ).has("img");

      const images = $(
        `${this._config.slideshowContainer} ${IMAGE_ELEMENT_CLASS} > img`
      );

      if (this._imageContainers.length > 0 && this._imageContainers.length === images.length) {
        this._wrapImages(images);

        // prepare the containers
        this._prepareContainers();

        // finally prepare the images
        this.reinitSize(this._config.imageScaleMode);

        // and start preloading
        this._preloader = new Preloader(this._imageWrappers, this._currentIndex, this._config.preloadLeftNr, this._config.preloadRightNr);
      } else {
        error_code = 202;
      }
    } else {
      error_code = 201;
    }
    return error_code;
  }

  reinitSize(scaleMode) {
    if ($(this._config.slideshowContainer).length) {
      if (isString(scaleMode)) {
        this._config.scaleMode = scaleMode;
      }
      const containerWidth = $(this._config.slideshowContainer).width();
      const containerHeight = $(this._config.slideshowContainer).height();

      this._imageWrappers[this._currentIndex].applyScaleMode(containerWidth, containerHeight, this._config.scaleMode);
    }
  }

  start() {
    if (this._interval != 0) {
      this._intervalId = setInterval(this.showNextImage, this._config.interval);
    }
  }

  stop() {
    if (this._intervalId !== -1) {
      clearInterval(this._intervalId);
      this._intervalId = -1;
    }
  }

  showImage = newIndex => {
    if (this._isValidIndex(newIndex) && newIndex != this._currentIndex) {
      if (this._imageWrappers[newIndex].wasLoaded()) {
        this._changeCurrentImage(newIndex);
      } else {
        this._preloader.loadImage(newIndex, () => {
          this._changeCurrentImage(newIndex);
        });
      }
    }
  };

  showNextImage = () => {
    var new_CurrentIndex =
      this._currentIndex < this._imageContainers.length - 1 ?
      this._currentIndex + 1 :
      0;

    this.showImage(new_CurrentIndex);
  };

  showPreviousImage = () => {
    var new_CurrentIndex =
      this._currentIndex > 0 ?
      this._currentIndex - 1 :
      this._imageContainers.length - 1;

    this.showImage(new_CurrentIndex);
  };

  getCurrentImageTitle() {
    if (this._isValidIndex(this._currentIndex)) {
      return this._imageWrappers[this._currentIndex].getTitle();
    } else {
      return "";
    }
  }


  // private helper methods

  _wrapImages(images) {
    for (let i = 0; i < images.length; i++) {
      this._imageWrappers.push(new ImageWrapper(images[i]));
    }
  }

  _isValidIndex(index) {
    return (
      index >= 0 &&
      index < this._imageContainers.length
    );
  }

  _prepareContainers() {
    $(this._imageContainers).css({
      opacity: 0.0
    });

    $(this._imageContainers[this._currentIndex]).css({
      opacity: 1.0,
      "z-index": this._baseZIndex
    });
  }

  _changeCurrentImage(newIndex) {
    $(this._imageContainers[newIndex]).animate({
        opacity: 1.0
      },
      IMAGE_ANIMATION_TIME
    );
    $(this._imageContainers[this._currentIndex]).animate({
        opacity: 0.0
      },
      IMAGE_ANIMATION_TIME
    );
    $(this._imageContainers[newIndex]).css({
      "z-index": this._baseZIndex + 1
    });
    $(this._imageContainers[this._currentIndex]).css({
      "z-index": this._baseZIndex
    });
    this._currentIndex = newIndex;

    this.reinitSize(this._scaleMode);

    if (this._config.imageChangedCallback !== undefined) {
      this._config.imageChangedCallback(this._currentIndex, this.getCurrentImageTitle());
    }

    this._preloader.setCurrentIndex(this._currentIndex);
  }
}