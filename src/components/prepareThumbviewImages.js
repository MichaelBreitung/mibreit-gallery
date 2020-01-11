/**
 * @class Loader
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import ImageWrapper from "./imageWrapper";
import {
  isUndefined
} from "../tools/typeChecks";
import isElementPresent from "../tools/isElementPresent";
import {
  BASE_Z_INDEX,
  THUMB_ELEMENT,
  SCALE_MODE_EXPAND
} from "../tools/globals";

class Loader {
  init(thumbviewContainer, thumbClickCallback) {
    let thumbWrappers = null;
    if (isElementPresent(thumbviewContainer)) {
      const thumbContainers = $(
        `${thumbviewContainer} ${THUMB_ELEMENT}`
      );
      const images = $(`${thumbviewContainer} ${THUMB_ELEMENT} > img`);

      if (thumbContainers.length > 0 && thumbContainers.length === images.length) {
        thumbWrappers = this._wrapThumbs(images);

        this._ensureThumbContainerZIndex(thumbviewContainer);

        if (!isUndefined(thumbClickCallback)) {
          this._setupClickEvents(thumbContainers, thumbClickCallback);
        }

        this._setScaleModeForThumbs(thumbContainers, thumbWrappers);
        this._preloadThumbs(thumbWrappers);
      }
    }
    return thumbWrappers;
  }

  _wrapThumbs(images) {
    let thumbWrappers = [];
    for (let i = 0; i < images.length; i++) {
      thumbWrappers.push(new ImageWrapper(images[i]));
    }
    return thumbWrappers;
  }

  _ensureThumbContainerZIndex(thumbviewContainer) {
    if (!$(thumbviewContainer).has("z-index")) {
      $(thumbviewContainer).css({
        "z-index": BASE_Z_INDEX
      });
    }
  }

  _setupClickEvents(thumbContainers, thumbClickCallback) {
    for (let i = 0; i < thumbContainers.length; i++) {
      $(thumbContainers[i]).bind(
        "click", {
          id: i
        },
        function (e) {
          thumbClickCallback(e.data.id);
        }
      );
    }
  }

  _setScaleModeForThumbs(thumbContainers, thumbWrappers) {
    const thumbWidth = thumbContainers.innerWidth();
    const thumbHeight = thumbContainers.innerHeight();
    for (const wrapper of thumbWrappers) {
      wrapper.applyScaleMode(thumbWidth, thumbHeight, SCALE_MODE_EXPAND);
    }
  }

  _preloadThumbs(thumbWrappers) {
    for (const wrapper of thumbWrappers) {
      wrapper.loadImage().catch(() => { // NOTHING
      });
    }
  }
}

export default function (thumbviewContainer, thumbClickCallback) {
  const loader = new Loader();
  return loader.init(thumbviewContainer, thumbClickCallback);
}