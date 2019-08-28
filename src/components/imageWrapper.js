/**
 * @class ImageScaler
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import * as globals from "../tools/globals";

const IMAGE_INACTIVE = "IMAGE_INACTIVE";
const IMAGE_LOADING = "IMAGE_LOADING";
const IMAGE_LOADED = "IMAGE_LOADED";

export default class ImageWrapper {
  constructor(image) {
    this._image = image;
    this._originalWidth = parseInt(this._image.getAttribute("width"));
    this._originalHeight = parseInt(this._image.getAttribute("height"));
    this._title = "";
    this._state = (!this._image.hasAttribute("data-src")) ? IMAGE_LOADED : IMAGE_INACTIVE;

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

    if (this._image.hasAttribute(globals.TITLE_ATTRIBUTE)) {
      // we do this to ensure that title will not show up on hover
      const title = this._image.getAttribute(globals.TITLE_ATTRIBUTE);
      this._image.removeAttribute(globals.TITLE_ATTRIBUTE);
      this._image.setAttribute(globals.DATA_TITLE_ATTRIBUTE, title);
    }

    this._title = this._image.getAttribute(globals.DATA_TITLE_ATTRIBUTE);
  }

  /**     
   * @return {Promise} Promise that will resolve once the image is loaded 
   *         and reject, if image was already loaded (with true) or is currently loading (with false)
   */
  loadImage() {
    return new Promise((resolve, reject) => {
      if (this._isInactive()) {
        this._image.onload = () => {
          this._image.removeAttribute(globals.DATA_SRC_ATTRIBUTE);
          this._state = IMAGE_LOADED;
          resolve();
        }
        this._state = IMAGE_LOADING;

        this._image.setAttribute(
          "src",
          this._image.getAttribute(globals.DATA_SRC_ATTRIBUTE)
        );
      } else {
        reject(this.wasLoaded());
      }
    });
  }

  wasLoaded() {
    return this._state === IMAGE_LOADED;
  }

  getTitle() {
    return this._title;
  }

  applyScaleMode(containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case globals.SCALE_MODE_STRETCH:
        $(this._image).css({
          width: "100%",
          height: "100%"
        });
        break;
      case globals.SCALE_MODE_EXPAND: {
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
    case globals.SCALE_MODE_FITASPECT: {
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
    case globals.SCALE_MODE_NONE:
    default:
      $(this._image).css({
        width: "auto",
        height: "auto"
      });
    }

    return this._image;
  }

  // private helpers
  _isInactive() {
    return this._state === IMAGE_INACTIVE;
  }
}