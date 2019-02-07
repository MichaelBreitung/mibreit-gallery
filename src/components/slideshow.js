/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
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
  constructor(config) {
    // default initialization
    this._currentIndex = 0;
    this._imageContainers = [];
    this._images = [];
    this._interval = DEFAULT_IMAGE_CHANGE_INTERVAL;
    this._intervalId = 0;
    this._baseZIndex = BASE_Z_INDEX;
    // this callback, if provided, well be called each time the image changes
    this._imageChangedCallback = false;
  }

  init(config) {
    let success = false;
    if (isString(config.slideshowContainer)) {

      let margin = {
        margin: 0
      };
      let scaleMode = "none";

      const _baseZIndex = $(config.slideshowContainer).css("z-index");
      if (isNumber(_baseZIndex)) {
        this._baseZIndex = _baseZIndex;
      }

      const containerWidth = $(config.slideshowContainer).width();
      const containerHeight = $(config.slideshowContainer).height();
      this._imageContainers = $(config.slideshowContainer + " .mibreit-imageElement");

      this._images = $(config.slideshowContainer + " .mibreit-imageElement > img");

      this.nrOf_Images = this._imageContainers.length;

      if (isObject(config.imageContainerMargin)) {
        margin = config.imageContainerMargin;
      }

      if (isString(config._imageScaleMode)) {
        scaleMode = config._imageScaleMode;
      }

      if (isNumber(config.interval)) {
        this._interval = config.interval;
      }

      if (!isUndefined(config._imageChangedCallback)) {
        this._imageChangedCallback = config._imageChangedCallback;
      }

      if (isBoolean(config.slideshowHighlighting) && config.slideshowHighlighting === true) {
        if ($(".mibreit-slideshow-highlight").length === 0) {
          $("body").append("<div class='mibreit-slideshow-highlight'/></div>");
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
      // 2) initialization
      if (this.nrOf_Images > 0) {
        this._prepareContainers(containerWidth, containerHeight, margin);

        this._prepare_Images(containerWidth, containerHeight, scaleMode);

        // make sure the title callback is called
        this._imageChanged();

        success = true;
      }
    }
    return success;
  }

  start() {
    if (this._interval != 0) {
      this._intervalId = setInterval(this.showNextImage, this._interval);
    }
  };

  stop() {
    clearInterval(this._intervalId);
  }

  showImage = (newIndex) => {
    if (!this._images[newIndex].hasAttribute("data-src") && newIndex != this._currentIndex &&
      newIndex < this._imageContainers.length && newIndex >= 0) {
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
    }
  };

  showNextImage = () => {
    var new_CurrentIndex = this._currentIndex < this._imageContainers.length - 1 ? this._currentIndex + 1 : 0;

    this.showImage(new_CurrentIndex);
  };

  showPreviousImage = () => {
    var new_CurrentIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._imageContainers.length - 1;

    this.showImage(new_CurrentIndex);
  };

  // private helper methods
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
      this._prepareImage(this._images[i], containerWidth, containerHeight, scaleMode);
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

    if (image.hasAttribute("data-src")) {
      image.onload = function () {
        this.removeAttribute("data-src");
      };
      image.setAttribute("src", image.getAttribute("data-src"));
    }
  }

  _scaleImage(image, containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case "stretch":
        image.setAttribute("width", containerWidth);
        image.setAttribute("height", containerHeight);
        break;
      case "fitaspect":
        var width = parseInt(image.getAttribute("width"));
        var height = parseInt(image.getAttribute("height"));
        var aspect = width / height;
        var scaler = 1;
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
    var width = parseInt(image.getAttribute("width"));
    var height = parseInt(image.getAttribute("height"));
    var x = (width + containerWidth) / 2 - width;
    var y = (height + containerHeight) / 2 - height;
    $(image).css({
      left: x
    });
    $(image).css({
      top: y
    });
  }

  _imageChanged() {
    if (this._imageChangedCallback !== false) {
      var title = this._images[this._currentIndex].getAttribute("data-title");

      if (title !== null) {
        this._imageChangedCallback(this._currentIndex, title);
      }
    }
  }
}