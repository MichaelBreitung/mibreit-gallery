import {
  isUndefined
} from "../tools/typeChecks";

/**
 * @class ImageScaler
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default class ImageWrapper {
  constructor(image) {
    this._image = image;
    this._title = this._image.getAttribute("data-title");
    this._originalWidth = this._image.getAttribute("width");
    this._originalHeight = this._image.getAttribute("height");

    // center image
    $(this._image).wrap("<div class=\"mibreit-center-box\"></div>");

    if (this._image.hasAttribute("title")) {
      // we do this to ensure that title will not show up on hover
      var title = this._image.getAttribute("title");
      this._image.removeAttribute("title");
      this._image.setAttribute("data-title", title);
    }
  }

  /**   
   * @param {Optional callback that will be called once image loading is complete} callback 
   * 
   * @return true if loading was started, false if image was already loaded
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
        let width = parseInt(this._originalWidth);
        let height = parseInt(this._originalHeight);
        const aspect = width / height;
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
      let width = parseInt(this._originalWidth);
      let height = parseInt(this._originalHeight);
      const aspect = width / height;
      if (containerWidth / containerHeight > aspect) {
        // fit based on height
        $(this._image).css({
          width: "auto",
          height: "100%"
        });
      } else {
        // fit based on width
        $(this._image).css({
          width: "100%",
          height: "auto"
        });
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