/**
 * @class Preloader
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  isUndefined
} from "../tools/typeChecks";

export default class FullscreenController {

  constructor() {
    this._slideshowContainer = undefined;
    this._thumbviewContainer = undefined;
    this._isFullscreen = false;
  }

  init(slideshowContainer, thumbviewContainer) {
    let success = false;
    if ($(slideshowContainer).length) // thumbview is optional
    {
      this._slideshowContainer = slideshowContainer;
      this._thumbviewContainer = thumbviewContainer;

      success = true;
    }
    return success;
  }


  toggleFullscreen() {
    if (this._isFullscreen) {
      this._isFullscreen = false;
      $(".mibreit-fullscreen").remove();
    } else {
      $("body").append(
        "<div class='mibreit-fullscreen'/></div>"
      );
      this._isFullscreen = true;
    }
  }
}