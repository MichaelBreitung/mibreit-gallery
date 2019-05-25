/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import Preloader from "./preloader";
import {
  isString,
  isUndefined,
  isNumber,
  isBoolean,
  isObject
} from "../tools/typeChecks";

const IMAGE_ANIMATION_TIME = 800;
const BASE_Z_INDEX = 10;
const DEFAULT_IMAGE_CHANGE_INTERVAL = 3000;

export default class Slideshow {
  constructor() {
    // default initialization
    this._currentIndex = 0;
    this._imageContainers = [];
    this._images = [];
    this._interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this._intervalId = -1;
    this._baseZIndex = BASE_Z_INDEX;
    // this callback, if provided, well be called each time the image changes
    this._imageChangedCallback = undefined;

    this._preloader = undefined;
  }

  init(config) {
    let error_code = 0;
    if (isString(config.slideshowContainer)) {
      // those selectors ensure that we only have the containers and images that are connected
      // as parent - child
      this._imageContainers = $(
        config.slideshowContainer + " .mibreit-imageElement"
      ).has("img");
      this._images = $(
        config.slideshowContainer + " .mibreit-imageElement > img"
      );
      if (this._imageContainers.length > 0) {
        let margin = {
          margin: 0
        };
        if (isObject(config.imageContainerMargin)) {
          margin = config.imageContainerMargin;
        }

        let scaleMode = "none";
        if (isString(config.imageScaleMode)) {
          scaleMode = config.imageScaleMode;
        }

        const _baseZIndex = $(config.slideshowContainer).css("z-index");
        if (isNumber(_baseZIndex)) {
          this._baseZIndex = _baseZIndex;
        }

        const containerWidth = $(config.slideshowContainer).width();
        const containerHeight = $(config.slideshowContainer).height();

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
          if ($(".mibreit-slideshow-highlight").length === 0) {
            $("body").append(
              "<div class='mibreit-slideshow-highlight'/></div>"
            );
          }

          $(config.slideshowContainer).bind("mouseenter", function () {
            $(".mibreit-slideshow-highlight").animate({
                opacity: 0.75
              },
              IMAGE_ANIMATION_TIME
            );
          });

          $(config.slideshowContainer).bind("mouseleave", function () {
            $(".mibreit-slideshow-highlight").animate({
                opacity: 0.0
              },
              IMAGE_ANIMATION_TIME
            );
          });
        }

        this._prepareContainers(containerWidth, containerHeight, margin);

        this._prepare_Images(containerWidth, containerHeight, scaleMode);

        this._preloader = new Preloader(this._images, this._currentIndex, config.preloadLeftNr, config.preloadRightNr);
      } else {
        error_code = 202;
      }
    } else {
      error_code = 201;
    }
    return error_code;
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
      if (!this._images[newIndex].hasAttribute("data-src")) {
        this._changeCurrentImage(newIndex);
      } else {
        let self = this; // capture this pointer for closure
        this._images[newIndex].onload = function () {
          this.removeAttribute("data-src");
          self._changeCurrentImage(newIndex);
        };
        this._images[newIndex].setAttribute(
          "src",
          this._images[newIndex].getAttribute("data-src")
        );
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
      return this._images[this._currentIndex].getAttribute("data-title");
    } else {
      return "";
    }
  }

  // private helper methods
  _isValidIndex(index) {
    return (
      index >= 0 &&
      index < this._images.length &&
      index < this._imageContainers.length
    );
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
    for (var i = 0; i < this._images.length; i++) {
      this._prepareImage(
        this._images[i],
        containerWidth,
        containerHeight,
        scaleMode
      );
    }
  }

  _prepareImage(image, containerWidth, containerHeight, scaleMode) {
    if (image.hasAttribute("width") && image.hasAttribute("height")) {
      this._scaleImage(image, containerWidth, containerHeight, scaleMode);

      this._positionImage(image, containerWidth, containerHeight);
    }

    if (image.hasAttribute("title")) {
      // we do this to ensure that title will not show up on hover
      var title = image.getAttribute("title");
      image.removeAttribute("title");
      image.setAttribute("data-title", title);
    }
  }

  _scaleImage(image, containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case "stretch":
        image.setAttribute("width", containerWidth);
        image.setAttribute("height", containerHeight);
        break;
      case "fitaspect":
        let width = parseInt(image.getAttribute("width"));
        let height = parseInt(image.getAttribute("height"));
        const aspect = width / height;
        let scaler = 1;
        if (containerWidth / containerHeight > aspect) {
          // fit based on height
          scaler = containerHeight / height;
        } else {
          // fit based on width
          scaler = containerWidth / width;
        }
        height *= scaler;
        width *= scaler;

        image.setAttribute("width", width);
        image.setAttribute("height", height);
        break;
      case "none":
      default:
        // no scaling applied
    }
  }

  _positionImage(image, containerWidth, containerHeight) {
    const width = parseInt(image.getAttribute("width"));
    const height = parseInt(image.getAttribute("height"));

    const x = (width + containerWidth) / 2 - width;
    const y = (height + containerHeight) / 2 - height;

    $(image).css({
      left: x
    });
    $(image).css({
      top: y
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

    this._imageChanged();

    this._preloader.setCurrentIndex(this._currentIndex);
  }

  _imageChanged() {
    if (this._imageChangedCallback !== undefined) {
      const title = this._images[this._currentIndex].getAttribute("data-title");

      if (title !== null) {
        this._imageChangedCallback(this._currentIndex, title);
      }
    }
  }
}