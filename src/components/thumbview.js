/**
 * @class Thumbview
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import {
  isString,
  isUndefined
} from "../tools/typeChecks";

export default class Thumbview {
  init(config) {
    let success = false;

    if (isString(config.thumbviewContainer)) {
      const thumbContainers = $(
        config.thumbviewContainer + " .mibreit-thumbElement"
      );
      const images = $(
        config.thumbviewContainer + " .mibreit-thumbElement > img"
      );

      const thumbWidth = thumbContainers.innerWidth();
      const thumbHeight = thumbContainers.innerHeight();

      if (!isUndefined(config.thumbClickCallback)) {
        this._setupClickEvents(thumbContainers, config.thumbClickCallback);
      }

      this._prepareThumbview(images, thumbWidth, thumbHeight);

      success = true;
    }
    return success;
  }

  _setupClickEvents(thumbContainers, thumbClickCallback) {
    for (let i = 0; i < thumbContainers.length; i++) {
      $(thumbContainers[i]).bind(
        "click", {
          id: i
        },
        function (e) {
          thumbClickCallback(e.data.id);
        }
      );
    }
  }

  _prepareThumbview(images, thumbWidth, thumbHeight) {
    for (let i = 0; i < images.length; i++) {
      this._prepareThumb(images[i], thumbWidth, thumbHeight);
    }
  }

  _prepareThumb(image, thumbWidth, thumbHeight) {
    if (image.hasAttribute("width") && image.hasAttribute("height")) {
      this._scaleThumb(image, thumbWidth, thumbHeight);

      this._positionThumb(image, thumbWidth, thumbHeight);
    }

    if (image.hasAttribute("data-src")) {
      image.onload = function () {
        this.removeAttribute("data-src");
      };
      image.setAttribute("src", image.getAttribute("data-src"));
    }
  }

  _scaleThumb(image, thumbWidth, thumbHeight) {
    let width = parseInt(image.getAttribute("width"));
    let height = parseInt(image.getAttribute("height"));
    const aspect = width / height;
    let scaler = 1;
    if (thumbWidth / thumbHeight > aspect) {
      // fit based on width
      scaler = thumbWidth / width;
    } else {
      // fit based on height
      scaler = thumbHeight / height;
    }
    height *= scaler;
    width *= scaler;

    image.setAttribute("width", width);
    image.setAttribute("height", height);
  }

  _positionThumb(image, thumbWidth, thumbHeight) {
    const width = parseInt(image.getAttribute("width"));
    const height = parseInt(image.getAttribute("height"));
    const x = (width + thumbWidth) / 2 - width;
    const y = (height + thumbHeight) / 2 - height;
    $(image).css({
      marginLeft: x
    });
    $(image).css({
      marginTop: y
    });
  }
}