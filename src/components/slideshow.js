/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import Preloader from "./preloader";
import ImageWrapper, {
  SCALE_MODE_FITASPECT
} from "./imageWrapper";
import {
  isString,
  isUndefined,
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

export default class Slideshow {
  constructor() {
    // default initialization
    this._currentIndex = 0;
    this._slideshowContainer = undefined;
    this._imageContainers = [];
    this._imageWrappers = [];
    this._interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this._intervalId = -1;
    this._baseZIndex = BASE_Z_INDEX;
    this._scaleMode = SCALE_MODE_FITASPECT;

    this._imageChangedCallback = undefined;
    this._preloader = undefined;
  }

  init(config) {
    let error_code = 0;
    if (isString(config.slideshowContainer) && $(config.slideshowContainer).length) {

      this._slideshowContainer = config.slideshowContainer;

      this._imageContainers = $(
        `${config.slideshowContainer} ${IMAGE_ELEMENT_CLASS}`
      ).has("img");

      const images = $(
        `${config.slideshowContainer} ${IMAGE_ELEMENT_CLASS} > img`
      );

      if (this._imageContainers.length > 0 && this._imageContainers.length === images.length) {
        this._wrapImages(images);

        const _baseZIndex = $(config.slideshowContainer).css("z-index");
        if (isNumber(_baseZIndex)) {
          this._baseZIndex = _baseZIndex;
        }

        if (isNumber(config.interval)) {
          this._interval = config.interval;
        }

        if (!isUndefined(config.imageChangedCallback)) {
          this._imageChangedCallback = config.imageChangedCallback;
        }

        // prepare the containers
        this._prepareContainers();

        // finally prepare the images
        this.reinitSize(config.imageScaleMode);

        // and start preloading
        this._preloader = new Preloader(this._imageWrappers, this._currentIndex, config.preloadLeftNr, config.preloadRightNr);
      } else {
        error_code = 202;
      }
    } else {
      error_code = 201;
    }
    return error_code;
  }

  reinitSize(scaleMode) {
    if (isString(this._slideshowContainer) && $(this._slideshowContainer).length) {
      if (isString(scaleMode)) {
        this._scaleMode = scaleMode;
      }
      const containerWidth = $(this._slideshowContainer).width();
      const containerHeight = $(this._slideshowContainer).height();

      this._imageWrappers[this._currentIndex].applyScaleMode(containerWidth, containerHeight, scaleMode);
    }
  }

  start() {
    if (this._interval != 0) {
      this._intervalId = setInterval(this.showNextImage, this._interval);
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

    if (this._imageChangedCallback !== undefined) {
      this._imageChangedCallback(this._currentIndex, this.getCurrentImageTitle());
    }

    this._preloader.setCurrentIndex(this._currentIndex);
  }
}