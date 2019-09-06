/**
 * @class Thumbview
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import isElementPresent from "../tools/isElementPresent";
import {
  THUMBS,
  THUMBS_SCROLLER,
  THUMB_ELEMENT
} from "../tools/globals";

export default class ThumbviewScroller {
  constructor() {
    this._allowMovement = false;
    this._nrOfImages = 0;
    this._nrVisibleImages = 0;
    this._midPositionId = 0;
    this._startPositionId = 0;
    this._stepSize = 1;
  }

  init(thumbviewContainer) {
    let success = false;

    if (isElementPresent(thumbviewContainer)) {
      const thumbContainers = $(`${thumbviewContainer} ${THUMB_ELEMENT}`);
      if (thumbContainers.length > 0) {
        thumbContainers.wrapAll(
          `<div class="${THUMBS_SCROLLER.substr(1)}" />`
        );
        $(THUMBS_SCROLLER).wrap(
          `<div class="${THUMBS.substr(1)}" />`
        );

        if ($(THUMBS).css("display") === "flex") {
          $(THUMBS).css({
            display: "block"
          });
        }

        this._scroller = $(`${thumbviewContainer} ${THUMBS_SCROLLER}`);

        this._stepSize = thumbContainers.outerWidth(true);
        this._nrOfImages = thumbContainers.length;
        this._nrVisibleImages = Math.floor(this._scroller.width() / this._stepSize);

        // ensure that scroller width is an even multiple of _stepsize
        this._scroller.css({
          width: this._nrVisibleImages * this._stepSize
        });

        if (this._nrOfImages <= this._nrVisibleImages) {
          this._allowMovement = false;
          this._scroller.css({
            left: (this._scroller.width() - this._stepSize * this._nrOfImages) / 2
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
    if (this._scroller !== false) {
      this._scroller.animate({
          left: -this._startPositionId * this._stepSize
        },
        800
      );
    }
  }
}