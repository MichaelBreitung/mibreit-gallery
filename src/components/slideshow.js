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
  isUndefined,
  isNumber,
  isBoolean,
  isObject
} from "../tools/typeChecks";

import {
  BASE_Z_INDEX
} from "../tools/globals";

const IMAGE_ANIMATION_TIME = 800;
const DEFAULT_IMAGE_CHANGE_INTERVAL = 3000;

export default class Slideshow {
  constructor() {
    // default initialization
    this._currentIndex = 0;
    this._slideshowContainer = undefined;
    this._imageContainers = [];
    this._imageWrappers = [];
    this._imageMargin = {
      margin: 0
    };
    this._imageScaleMode = "none";
    this._interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this._intervalId = -1;
    this._baseZIndex = BASE_Z_INDEX;

    this._imageChangedCallback = undefined;
    this._preloader = undefined;
  }

  init(config) {
    let error_code = 0;
    if (isString(config.slideshowContainer) && $(config.slideshowContainer).length) {

      this._slideshowContainer = config.slideshowContainer;

      this._imageContainers = $(
        config.slideshowContainer + " .mibreit-imageElement"
      ).has("img");

      const images = $(
        config.slideshowContainer + " .mibreit-imageElement > img"
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

        if (
          isBoolean(config.slideshowHighlighting) &&
          config.slideshowHighlighting === true
        ) {
          this._prepareHighlighting();
        }

        // finally prepare the images
        this.reinitSize(config.imageContainerMargin, config.imageScaleMode);

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

  reinitSize(margin, scaleMode) {
    if (isString(this._slideshowContainer) && $(this._slideshowContainer).length) {
      if (isObject(margin)) {
        this._imageMargin = margin;
      }

      if (isString(scaleMode)) {
        this._imageScaleMode = scaleMode;
      }
      const containerWidth = $(this._slideshowContainer).width();
      const containerHeight = $(this._slideshowContainer).height();
      this._prepareContainers(containerWidth, containerHeight, this._imageMargin);
      this._prepare_Images(containerWidth, containerHeight, this._imageScaleMode);
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

  _prepareHighlighting() {
    if ($(".mibreit-slideshow-highlight").length === 0) {
      $("body").append(
        "<div class='mibreit-slideshow-highlight'/></div>"
      );
    }

    $(this._slideshowContainer).bind("mouseenter", function () {
      $(".mibreit-slideshow-highlight").animate({
          opacity: 0.75
        },
        IMAGE_ANIMATION_TIME
      );
    });

    $(this._slideshowContainer).bind("mouseleave", function () {
      $(".mibreit-slideshow-highlight").animate({
          opacity: 0.0
        },
        IMAGE_ANIMATION_TIME
      );
    });
  }

  _prepareContainers(width, height, marginObj) {
    $(this._imageContainers).css({
      width: width,
      height: height,
      opacity: 0.0
    });

    $(this._imageContainers).css(marginObj);

    $(this._imageContainers[this._currentIndex]).css({
      opacity: 1.0,
      "z-index": this._baseZIndex
    });
  }

  _prepare_Images(containerWidth, containerHeight, scaleMode) {
    for (var i = 0; i < this._imageWrappers.length; i++) {
      this._imageWrappers[i].reScale(containerWidth, containerHeight, scaleMode);

      this._imageWrappers[i].centerInContainer();
    }
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

    if (this._imageChangedCallback !== undefined) {
      this._imageChangedCallback(this._currentIndex, this.getCurrentImageTitle());
    }

    this._preloader.setCurrentIndex(this._currentIndex);
  }
}