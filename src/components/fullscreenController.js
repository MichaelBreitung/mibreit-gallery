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
    this._isFullscreen = false;
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