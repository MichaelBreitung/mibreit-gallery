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

  centerInContainer(containerWidth, containerHeight) {
    const width = parseInt(this._image.getAttribute("width"));
    const height = parseInt(this._image.getAttribute("height"));

    const x = (width + containerWidth) / 2 - width;
    const y = (height + containerHeight) / 2 - height;

    $(this._image).css({
      left: x
    });
    $(this._image).css({
      top: y
    });
  }

  reScale(containerWidth, containerHeight, scaleMode) {
    switch (scaleMode) {
      case "stretch":
        this._image.setAttribute("width", containerWidth);
        this._image.setAttribute("height", containerHeight);
        break;
      case "expand": {
        let width = parseInt(this._originalWidth);
        let height = parseInt(this._originalHeight);
        const aspect = width / height;
        let scaler = 1;
        if (containerWidth / containerHeight > aspect) {
          // fit based on height
          scaler = height / containerHeight;
        } else {
          // fit based on width
          scaler = width / containerWidth;
        }
        height *= scaler;
        width *= scaler;

        this._image.setAttribute("width", width);
        this._image.setAttribute("height", height);
      }

      break;
    case "fitaspect": {
      let width = parseInt(this._originalWidth);
      let height = parseInt(this._originalHeight);
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

      this._image.setAttribute("width", width);
      this._image.setAttribute("height", height);
    }
    break;
    case "none":
    default:
      this._image.setAttribute("width", this._originalWidth);
      this._image.setAttribute("height", this._originalHeight);
    }

    return this._image;
  }
}