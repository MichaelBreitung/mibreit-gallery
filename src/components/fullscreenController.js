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

  init(slideshowContainer, thumbviewContainer) {
    let success = false;
    if ($(slideshowContainer).length) {
      // thumbview is optional
      this._slideshowContainer = slideshowContainer;
      this._thumbviewContainer = thumbviewContainer;

      success = true;
    }
    return success;
  }

  toggleFullscreen() {
    if (this._isFullscreen) {
      let slideshow = $(".mibreit-fullscreen").detach();
      slideshow.appendTo("content");
      slideshow.css({
        width: this._oldWidth,
        height: this._oldHeight
      })
      $(".mibreit-fullscreen").remove();
      this._isFullscreen = false;
    } else {
      // put slideshowContainer into fullscreen

      this._oldWidth = $(this._slideshowContainer).css("width");
      this._oldHeight = $(this._slideshowContainer).css("height");
      let slideshow = $(this._slideshowContainer).detach();
      $("body").append("<div class='mibreit-fullscreen'/></div>");


      slideshow.appendTo(".mibreit-fullscreen");
      slideshow.css({
        width: "100%",
        height: "100%"
      })
      this._isFullscreen = true;
    }
    return this._isFullscreen;
  }
}