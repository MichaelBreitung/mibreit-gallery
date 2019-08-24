/**
 * @class FullscreenController
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  isString
} from "../tools/typeChecks";
import {
  REGULAR_CLASS,
  FULLSCREEN_CLASS
} from "../tools/globals";
import isElementPresent from "../tools/isElementPresent";

export default class FullscreenController {
  constructor() {
    this._slideshowContainer = undefined;
    this._thumbviewContainer = undefined;
    this._isFullscreen = false;
    this._fullscreenChangedCallback = undefined;
  }

  init(
    slideshowContainer,
    thumbviewContainer,
    titleContainer,
    fullScreenChangedCallback
  ) {
    if (isElementPresent(slideshowContainer)) {
      this._slideshowContainer = slideshowContainer;

      // following are optional, so we don't check their presence
      this._thumbviewContainer = thumbviewContainer;
      this._titleContainer = titleContainer;
      this._fullscreenChangedCallback = fullScreenChangedCallback;

      return true
    }
    return false;
  }

  isFullscreen() {
    return this._isFullscreen;
  }

  toggleFullscreen = () => {
    if (this._isFullscreen) {
      $(this._slideshowContainer).appendTo(REGULAR_CLASS);
      $(this._slideshowContainer).css({
        width: this._oldWidth,
        height: this._oldHeight
      });
      if (isElementPresent(this._thumbviewContainer)) {
        $(this._thumbviewContainer).appendTo(REGULAR_CLASS);
      }
      if (isElementPresent(this._titleContainer)) {
        $(this._titleContainer).appendTo(REGULAR_CLASS);
      }
      $(FULLSCREEN_CLASS).remove();
      this._isFullscreen = false;
    } else {
      if ($(REGULAR_CLASS).length === 0) {
        this.createRegularWrapper();
      }

      this._oldWidth = $(this._slideshowContainer).css("width");
      this._oldHeight = $(this._slideshowContainer).css("height");

      $("body").append(
        `<div class="${FULLSCREEN_CLASS.substr(1)}"><div class='exit-fullscreen'></div></div>`
      );
      $(".exit-fullscreen").click(this.toggleFullscreen);
      $(this._slideshowContainer).appendTo(FULLSCREEN_CLASS);
      $(this._slideshowContainer).css({
        width: "100%",
        "flex-grow": 1
      });
      if (isElementPresent(this._thumbviewContainer)) {
        $(this._thumbviewContainer).appendTo(FULLSCREEN_CLASS);
        $(this._thumbviewContainer).css({
          "flex-grow": 0
        });
      }
      if (isElementPresent(this._titleContainer)) {
        $(this._titleContainer).appendTo(FULLSCREEN_CLASS);
        $(this._titleContainer).css({
          "flex-grow": 0
        });
      }
      this._isFullscreen = true;
    }

    if (this._fullscreenChangedCallback) {
      this._fullscreenChangedCallback(this._isFullscreen);
    }
    return this._isFullscreen;
  };

  /** attach regular wrapper, which is used as placeholder for gallery until we deactivate fullscreen again */
  createRegularWrapper() {
    $(this._slideshowContainer).wrap(`<div class="${REGULAR_CLASS.substr(1)}"></div>`);
    if (isElementPresent(this._thumbviewContainer)) {
      $(this._thumbviewContainer).appendTo(REGULAR_CLASS);
    }
    if (isElementPresent(this._titleContainer)) {
      $(this._titleContainer).appendTo(REGULAR_CLASS);
    }
  }
}