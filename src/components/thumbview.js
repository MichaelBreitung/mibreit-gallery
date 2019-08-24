/**
 * @class Thumbview
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import {
  isNumber,
  isUndefined
} from "../tools/typeChecks";
import isElementPresent from "../tools/isElementPresent";
import {
  BASE_Z_INDEX,
  THUMB_ELEMENT,
  DATA_SRC_ATTRIBUTE
} from "../tools/globals";

export default class Thumbview {
  init(thumbviewContainer, thumbClickCallback) {
    let success = false;

    if (isElementPresent(thumbviewContainer)) {
      const thumbContainers = $(
        `${thumbviewContainer} ${THUMB_ELEMENT}`
      );
      const images = $(`${thumbviewContainer} ${THUMB_ELEMENT} > img`);

      if (thumbContainers.length > 0 && thumbContainers.length === images.length) {

        const thumbWidth = thumbContainers.innerWidth();
        const thumbHeight = thumbContainers.innerHeight();

        let _baseZIndex = $(thumbviewContainer).css("z-index");
        if (!isNumber(_baseZIndex)) {
          _baseZIndex = BASE_Z_INDEX;
        }
        this._elevateThumbContainers(thumbviewContainer, _baseZIndex);

        if (!isUndefined(thumbClickCallback)) {
          this._setupClickEvents(thumbContainers, thumbClickCallback);
        }

        this._prepareThumbview(images, thumbWidth, thumbHeight);

        success = true;
      }
    }
    return success;
  }

  _elevateThumbContainers(thumbContainer, zIndex) {

    $(thumbContainer).css({
      "z-index": BASE_Z_INDEX
    });

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

    if (image.hasAttribute(DATA_SRC_ATTRIBUTE)) {
      image.onload = function () {
        this.removeAttribute(DATA_SRC_ATTRIBUTE);
      };
      image.setAttribute("src", image.getAttribute(DATA_SRC_ATTRIBUTE));
    }

    // no context menu
    $(image).contextmenu(function () {
      return false;
    });
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