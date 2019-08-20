/**
 * @class ImageScaler
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  isUndefined
} from "../tools/typeChecks";

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

    if (this._image.hasAttribute("title")) {
      // we do this to ensure that title will not show up on hover
      const title = this._image.getAttribute("title");
      this._image.removeAttribute("title");
      this._image.setAttribute("data-title", title);
    }

    this._title = this._image.getAttribute("data-title");
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
        this._image.getAttribute("data-src")
      );
      this._image.removeAttribute("data-src");
      return true;
    } else {
      return false;
    }
  }

  wasLoaded() {
    return !this._image.hasAttribute("data-src");
  }

  getTitle() {
    return this._title;
  }

  applyScaleMode(containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case "stretch":
        $(this._image).css({
          width: "100%",
          height: "100%"
        });
        break;
      case "expand": {
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
    case "fitaspect": {
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
    case "none":
    default:
      $(this._image).css({
        width: "auto",
        height: "auto"
      });
    }

    return this._image;
  }
}