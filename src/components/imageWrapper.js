/**
 * @class ImageScaler
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  isUndefined
} from "../tools/typeChecks";

export const SCALE_MODE_STRETCH = "SCALE_MODE_STRETCH";
export const SCALE_MODE_EXPAND = "SCALE_MODE_EXPAND";
export const SCALE_MODE_FITASPECT = "SCALE_MODE_FITASPECT";
export const SCALE_MODE_NONE = "SCALE_MODE_NONE";

const DATA_SRC_ATTRIBUTE = "data-src";
const DATA_TITLE_ATTRIBUTE = "data-title";
const TITLE_ATTRIBUTE = "title";

export default class ImageWrapper {
  constructor(image) {
    this._image = image;
    this._originalWidth = parseInt(this._image.getAttribute("width"));
    this._originalHeight = parseInt(this._image.getAttribute("height"));
    this._title = "";

    // center image
    $(this._image).wrap("<div class=\"mibreit-center-box\"></div>");


    // disable drag
    $(this._image).on('dragstart', function () {
      return false;
    });

    // no context menu
    $(this._image).contextmenu(function () {
      return false;
    });

    if (this._image.hasAttribute(TITLE_ATTRIBUTE)) {
      // we do this to ensure that title will not show up on hover
      const title = this._image.getAttribute(TITLE_ATTRIBUTE);
      this._image.removeAttribute(TITLE_ATTRIBUTE);
      this._image.setAttribute(DATA_TITLE_ATTRIBUTE, title);
    }

    this._title = this._image.getAttribute(DATA_TITLE_ATTRIBUTE);
  }

  /**   
   * @param callback Optional callback that will be called once image loading is complete
   * 
   * @return {boolean} true if loading was started, false if image was already loaded
   */
  loadImage(callback) {
    if (!this.wasLoaded()) {
      if (!isUndefined(callback)) {
        this._image.onload = () => {
          callback();
        }
      }

      this._image.setAttribute(
        "src",
        this._image.getAttribute(DATA_SRC_ATTRIBUTE)
      );
      this._image.removeAttribute(DATA_SRC_ATTRIBUTE);
      return true;
    } else {
      return false;
    }
  }

  wasLoaded() {
    return !this._image.hasAttribute(DATA_SRC_ATTRIBUTE);
  }

  getTitle() {
    return this._title;
  }

  applyScaleMode(containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case SCALE_MODE_STRETCH:
        $(this._image).css({
          width: "100%",
          height: "100%"
        });
        break;
      case SCALE_MODE_EXPAND: {
        const aspect = this._originalWidth / this._originalHeight;
        if (containerWidth / containerHeight > aspect) {
          // fit based on width
          $(this._image).css({
            width: "100%",
            height: "auto"
          });
        } else {
          // fit based on height
          $(this._image).css({
            width: "auto",
            height: "100%"
          });
        }
      }
      break;
    case SCALE_MODE_FITASPECT: {
      const aspect = this._originalWidth / this._originalHeight;
      if (containerWidth / containerHeight > aspect) {
        // fit based on height
        if (containerHeight <= this._originalHeight) {
          $(this._image).css({
            width: "auto",
            height: "100%"
          });
        } else {
          $(this._image).css({
            width: "auto",
            height: "auto"
          });
        }
      } else {
        // fit based on width     
        if (containerWidth <= this._originalWidth) {
          $(this._image).css({
            width: "100%",
            height: "auto"
          });
        } else {
          $(this._image).css({
            width: "auto",
            height: "auto"
          });
        }
      }

    }
    break;
    case SCALE_MODE_NONE:
    default:
      $(this._image).css({
        width: "auto",
        height: "auto"
      });
    }

    return this._image;
  }
}