/**
 * @class Preloader
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import {
  isUndefined
} from "../tools/typeChecks";

const PRELOAD_RIGHT_SIZE = 7;
const PRELOAD_LEFT_SIZE = 3;

export default class Preloader {
  /**
   * @param {full array of images to preload} images 
   * @param {currently active image} currentIndex 
   * @param {Optional - number of images to preload before currentIndex} preloadLeftNr 
   * @param {Optional - number of images to preload after currentIndex} preloadRightNr 
   */
  constructor(images, currentIndex, preloadLeftNr, preloadRightNr) {
    this._currentIndex = currentIndex;
    this._images = images;
    this._loadedCount = 0;
    this._preloadLeftNr = PRELOAD_LEFT_SIZE;
    if (!isUndefined(preloadLeftNr)) {
      this._preloadLeftNr = preloadLeftNr;
    }

    this._preloadRightNr = PRELOAD_RIGHT_SIZE;
    if (!isUndefined(preloadRightNr)) {
      this._preloadRightNr = preloadRightNr;
    }

    this._moveWindow();
  }

  setCurrentIndex(newIndex) {
    if (this._currentIndex != newIndex) {
      this._currentIndex = newIndex;

      this._moveWindow();
    }
  }

  _moveWindow() {
    if (this._loadedCount < this._images.length) {
      let start = this._currentIndex - this._preloadLeftNr;
      let end = this._currentIndex + this._preloadRightNr;

      // ensures that the current image is loaded first and then we fill the window to the right
      this._loadImages(
        this._currentIndex,
        end < this._images.length ? end : this._images.length
      );
      // and then from the left to current image
      this._loadImages(start >= 0 ? start : 0, this._currentIndex);
      // finally we handle overflow
      if (start < 0) {
        start = this._images.length + start;
        this._loadImages(start, this._images.length);
      }

      if (end >= this._images.length) {
        end = end - this._images.length;
        this._loadImages(0, end);
      }
    }
  }

  _loadImages(start, end) {
    for (let i = start; i < end && i < this._images.length; i++) {
      this._loadImage(this._images[i]);
    }
  }

  _loadImage(image) {
    if (image.hasAttribute("data-src")) {
      image.setAttribute("src", image.getAttribute("data-src"));
      image.removeAttribute("data-src");
      this._loadedCount++;
    }
  }
}