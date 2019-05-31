/**
 * @class FullscreenController
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default class FullscreenController {
  constructor() {
    this._slideshowContainer = undefined;
    this._thumbviewContainer = undefined;
    this._isFullscreen = false;
    this._fullscreenChangedCallback = undefined;
  }

  init(slideshowContainer, thumbviewContainer, titleContainer, fullScreenChangedCallback) {
    let success = false;
    if ($(slideshowContainer).length) {
      // thumbview is optional
      this._slideshowContainer = slideshowContainer;
      this._thumbviewContainer = thumbviewContainer;
      this._titleContainer = titleContainer;
      this._fullscreenChangedCallback = fullScreenChangedCallback;

      success = true;
    }
    return success;
  }

  isFullscreen() {
    return this._isFullscreen;
  }

  toggleFullscreen = () => {
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

      $("body").append("<div class='mibreit-fullscreen'><div class='exit-fullscreen'></div></div>");
      $(".exit-fullscreen").click(this.toggleFullscreen);
      $(this._slideshowContainer).appendTo(".mibreit-fullscreen");
      $(this._slideshowContainer).css({
        width: "100%",
        "flex-grow": 1,
      });
      $(this._thumbviewContainer).appendTo(".mibreit-fullscreen");
      $(this._thumbviewContainer).css({
        "flex-grow": 0,
      });
      $(this._titleContainer).appendTo(".mibreit-fullscreen");
      $(this._titleContainer).css({
        "flex-grow": 0,
      });
      this._isFullscreen = true;
    }

    if (this._fullscreenChangedCallback) {
      this._fullscreenChangedCallback(this._isFullscreen);
    }
    return this._isFullscreen;
  }
}