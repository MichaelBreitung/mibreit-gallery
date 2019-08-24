/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import Preloader from "./preloader";
import ImageWrapper from "./imageWrapper";
import {
  isString,
  isNumber,
  isUndefined
} from "../tools/typeChecks";

import {
  BASE_Z_INDEX,
  IMAGE_ELEMENT_CLASS,
  SCALE_MODES,
  SCALE_MODE_FITASPECT
} from "../tools/globals";

// behavior
const IMAGE_ANIMATION_TIME = 800;
const DEFAULT_IMAGE_CHANGE_INTERVAL = 3000;

/** 
 * Builder is used to separate the configuration and building of the Slideshow
 * from it's behavior.
 */
export default class SlideshowBuilder {
  constructor(slideshowContainer) {
    // defaults
    this.interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this.scaleMode = SCALE_MODE_FITASPECT;
    this.preloadLeftNr = undefined;
    this.preloadRightNr = undefined;

    this.slideshowContainer = isString(slideshowContainer) ? slideshowContainer : "";
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
  buildSlideshow() {
    const validationResult = this._validate();
    if (this._validate() !== undefined) {
      throw Error("buildSlideshow Error: " + validationResult);
    }
    return new Slideshow(this);
  }

  // private
  _validate() {
    if ($(this.slideshowContainer).length === 0) {
      return "invalid slideshowContainer";
    }
    return undefined;
  }
}

class Slideshow {
  constructor(builder) {
    this._slideshowContainer = builder.slideshowContainer;
    this._imageScaleMode = builder.scaleMode;
    this._interval = builder.interval;

    // not provided by builder
    this._currentIndex = 0;
    this._imageContainers = [];
    this._imageWrappers = [];
    this._intervalId = -1;
    this._baseZIndex = BASE_Z_INDEX;
    this._imageChangedCallback = undefined;
    this._preloader = undefined;

    this._isInitialized = this._init(builder.preloaderLeftNr, builder.preloaderRightNr);
  }

  isInitialized() {
    return this._isInitialized;
  }

  reinitSize() {
    if (!isUndefined(this._imageWrappers[this._currentIndex])) {
      this._imageWrappers[this._currentIndex].applyScaleMode($(this._slideshowContainer).width(),
        $(this._slideshowContainer).height(), this._imageScaleMode);
    }
  }

  start() {
    if (this._isInitialized) {
      this._intervalId = setInterval(this.showNextImage, this._interval);
    }
  }

  stop() {
    if (this._intervalId !== -1) {
      clearInterval(this._intervalId);
      this._intervalId = -1;
    }
  }

  setImageChangedCallback(callback) {
    this._imageChangedCallback = callback;
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

  _init(preloaderLeftNr, preloaderRightNr) {
    this._imageContainers = $(
      `${this._slideshowContainer} ${IMAGE_ELEMENT_CLASS}`
    ).has("img");

    const images = $(
      `${this._slideshowContainer} ${IMAGE_ELEMENT_CLASS} > img`
    );

    if (this._imageContainers.length > 0 && this._imageContainers.length === images.length) {
      this._wrapImages(images);

      // prepare the containers
      this._prepareContainers();

      // finally prepare the current image
      this.reinitSize();

      // make slideshow responsive
      $(window).resize(() => {
        this.reinitSize();
      });

      // and start preloading
      this._preloader = new Preloader(this._imageWrappers, this._currentIndex, preloaderLeftNr, preloaderRightNr);

      return true;
    } else {
      return false;
    }
  }

  _isValidIndex(index) {
    return (
      index >= 0 &&
      index < this._imageContainers.length
    );
  }

  _wrapImages(images) {
    for (let i = 0; i < images.length; i++) {
      this._imageWrappers.push(new ImageWrapper(images[i]));
    }
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

    this.reinitSize();

    if (this._imageChangedCallback !== undefined) {
      this._imageChangedCallback(this._currentIndex, this.getCurrentImageTitle());
    }

    this._preloader.setCurrentIndex(this._currentIndex);
  }
}