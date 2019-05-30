/**
 * @class FullscreenController
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

  init(slideshowContainer, thumbviewContainer, titleContainer) {
    let success = false;
    if ($(slideshowContainer).length) {
      // thumbview is optional
      this._slideshowContainer = slideshowContainer;
      this._thumbviewContainer = thumbviewContainer;
      this._titleContainer = titleContainer;

      success = true;
    }
    return success;
  }

  toggleFullscreen() {
    if (this._isFullscreen) {

      $(this._slideshowContainer).appendTo(".mibreit-regular");
      $(this._slideshowContainer).css({
        width: this._oldWidth,
        height: this._oldHeight
      });
      $(this._thumbviewContainer).appendTo(".mibreit-regular");
      $(this._titleContainer).appendTo(".mibreit-regular");
      $(".mibreit-fullscreen").remove();
      this._isFullscreen = false;
    } else {
      // put slideshowContainer into fullscreen

      if ($(".mibreit-regular").length === 0) {
        // attach regular wrapper, which is used as placeholder for gallery until we
        // deactivate fullscreen again
        $(this._slideshowContainer).wrap("<div class=\"mibreit-regular\"></div>");
        $(this._thumbviewContainer).appendTo(".mibreit-regular");
        $(this._titleContainer).appendTo(".mibreit-regular");
      }

      this._oldWidth = $(this._slideshowContainer).css("width");
      this._oldHeight = $(this._slideshowContainer).css("height");

      $("body").append("<div class='mibreit-fullscreen'/></div>");
      $(this._slideshowContainer).appendTo(".mibreit-fullscreen");
      $(this._slideshowContainer).css({
        width: "100%",
        height: "80%"
      });
      $(this._thumbviewContainer).appendTo(".mibreit-fullscreen");
      $(this._titleContainer).appendTo(".mibreit-fullscreen");
      this._isFullscreen = true;
    }
    return this._isFullscreen;
  }
}