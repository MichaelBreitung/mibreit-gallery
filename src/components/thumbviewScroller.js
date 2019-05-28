/**
 * @class Thumbview
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import {
  isString,
  isUndefined
} from "../tools/typeChecks";

export default class ThumbviewScroller {
  constructor() {
    this._allowMovement = false;
    this._nrOfImages = 0;
    this._nrVisibleImages = 0;
    this._midPositionId = 0;
    this._startPositionId = 0;
    this._stepSize = false;
  }

  init(config) {
    let success = false;

    if (isString(config.thumbviewContainer) && $(config.thumbviewContainer).length &&
      isString(config.scroller) && $(config.scroller).length) {
      let thumbContainers = $(config.thumbviewContainer + " .mibreit-thumbElement");
      if (thumbContainers.length > 0) {
        this.scroller = $(config.scroller);

        this._stepSize = thumbContainers.outerWidth(true);
        this._nrOfImages = thumbContainers.length;
        this._nrVisibleImages = Math.floor(this.scroller.width() / this._stepSize);

        // ensure that scroller width is an even multiple of _stepsize
        this.scroller.css({
          width: this._nrVisibleImages * this._stepSize
        });

        if (this._nrOfImages <= this._nrVisibleImages) {
          this._allowMovement = false;
          this.scroller.css({
            left: (this.scroller.width() - this._stepSize * this._nrOfImages) / 2
          });
        } else {
          this._allowMovement = true;
          this._midPositionId = Math.floor(this._nrVisibleImages / 2);
        }

        success = true;
      }
    }
    return success;
  }

  /**
   * moves the specified thumb to start of scroller
   * @param id - id of thumb to palce at start of scroller
   */
  scrollTo(id) {
    if (this._allowMovement) {
      var newPosId = id - this._midPositionId;
      if (newPosId < 0) {
        this._startPositionId = 0;
      } else if (newPosId <= this._nrOfImages - this._nrVisibleImages) {
        this._startPositionId = newPosId;
      } else {
        this._startPositionId = this._nrOfImages - this._nrVisibleImages;
      }
      this._moveScroller();
    }
  }

  scrollRight(numberOfElements) {
    if (this._allowMovement) {
      var newPosId = this._startPositionId + numberOfElements;
      var maxPos = this._nrOfImages - this._nrVisibleImages;

      if (this._startPositionId == maxPos) {
        this._startPositionId = 0;
      } else if (newPosId > maxPos) {
        this._startPositionId = maxPos;
      } else {
        this._startPositionId = newPosId;
      }

      this._moveScroller();
    }
  }

  scrollLeft(numberOfElements) {
    if (this._allowMovement) {
      var newPosId = this._startPositionId - numberOfElements;

      if (this._startPositionId == 0) {
        this._startPositionId = this._nrOfImages - this._nrVisibleImages;
      } else if (newPosId < 0) {
        this._startPositionId = 0;
      } else {
        this._startPositionId = newPosId;
      }

      this._moveScroller();
    }
  }

  _moveScroller() {
    if (this.scroller !== false) {
      this.scroller.animate({
          left: -this._startPositionId * this._stepSize
        },
        800
      );
    }
  }
}