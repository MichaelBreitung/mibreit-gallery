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
   * @param {array of ImageWrapper objects, which contain the images to preload} imageWrappers
   * @param {currently active image} currentIndex
   * @param {Optional - number of images to preload before currentIndex} preloadLeftNr
   * @param {Optional - number of images to preload after currentIndex} preloadRightNr
   */
  constructor(imageWrappers, currentIndex, preloadLeftNr, preloadRightNr) {
    this._currentIndex = currentIndex;
    this._imageWrappers = imageWrappers;
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

  loadImage(index, callback) {
    if (
      this._loadedCount < this._imageWrappers.length &&
      index >= 0 &&
      index < this._imageWrappers.length
    ) {
      if (this._imageWrappers[index].loadImage(callback)) {
        this._loadedCount++;
      }
    }
  }

  _moveWindow() {
    if (this._loadedCount < this._imageWrappers.length) {
      let start = this._currentIndex - this._preloadLeftNr;
      let end = this._currentIndex + this._preloadRightNr;

      // ensures that the current image is loaded first and then we fill the window to the right
      this._loadImages(
        this._currentIndex,
        end < this._imageWrappers.length ? end : this._imageWrappers.length
      );
      // and then from the left to current image
      this._loadImages(start >= 0 ? start : 0, this._currentIndex);
      // finally we handle overflow
      if (start < 0) {
        start = this._imageWrappers.length + start;
        this._loadImages(start, this._imageWrappers.length);
      }

      if (end >= this._imageWrappers.length) {
        end = end - this._imageWrappers.length;
        this._loadImages(0, end);
      }
    }
  }

  _loadImages(start, end) {
    for (let i = start; i < end && i < this._imageWrappers.length; i++) {
      this._loadImage(this._imageWrappers[i]);
    }
  }

  _loadImage(image) {
    if (image.loadImage()) {
      this._loadedCount++;
    }
  }
}