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
  THUMB_ELEMENT,
  NR_OF_VISIBLE_THUMBS
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
      const visibleWidth = $(thumbviewContainer).width() - parseInt($(":root").css("font-size")) * 2.5; // leave space for buttons, which take 2.5rem    
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
            display: "block",
            width: `${visibleWidth}px`
          });
        }

        this._scroller = $(`${thumbviewContainer} ${THUMBS_SCROLLER}`);

        this._stepSize = visibleWidth / NR_OF_VISIBLE_THUMBS;

        this._nrOfImages = thumbContainers.length;
        this._nrVisibleImages = Math.floor(visibleWidth / this._stepSize);

        if (this._nrOfImages <= this._nrVisibleImages) {
          this._allowMovement = false;
          this._scroller.css({
            left: (this._scroller.width() - this._stepSize * this._nrOfImages) / 2
          });
        } else {
          this._allowMovement = true;
          this._midPositionId = Math.floor(this._nrVisibleImages / 2);
        }

        const margin = parseInt($(thumbContainers[0]).css("margin-left")) + parseInt($(thumbContainers[0]).css("margin-right"));

        this._resizeThumbs(thumbContainers, margin);

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
      this._scroller.stop();
      this._scroller.animate({
          left: -this._startPositionId * this._stepSize
        },
        600
      );
    }
  }

  _resizeThumbs(thumbs, margin) {
    for (const thumb of thumbs) {
      $(thumb).css({
        width: `${this._stepSize-margin}px`,
        height: `${this._stepSize-margin}px`
      });
    };
  }
}