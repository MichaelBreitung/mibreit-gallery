/**
 * @class Gallery
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import $ from "jquery";
import {
  handleSwipe,
  SWIPE_RIGHT,
  SWIPE_LEFT,
  CLICK
} from "jquery-swipe-handler";
import Thumbview from "./thumbview";
import SlideshowBuilder from "./slideshow";
import ThumbviewScroller from "./thumbviewScroller";
import FullscreenController from "./fullscreenController";
import {
  isString,
  isBoolean
} from "../tools/typeChecks";
import {
  SCALE_MODE_FITASPECT
} from "./imageWrapper";
import {
  ENTER_FULLSCREEN_BUTTON,
  THUMBS_SCROLLER,
  THUMB_ELEMENT
} from "../tools/globals";

// const
const HOVER_ANIMATION_TIME = 400;

/** 
 * Builder is used to separate the configuration and building of the Gallery
 * from it's behavior.
 */
export default class GalleryBuilder extends SlideshowBuilder {
  constructor(slideshowContainer) {

    super(slideshowContainer);
    // defaults
    this.showThumbview = true;
    this.thumbviewContainer = ".mibreit-thumbs";
    this.thumbviewNext = ".mibreit-thumbview-next";
    this.thumbviewPrevious = ".mibreit-thumbview-previous";
    this.slideshowNext = ".mibreit-slideshow-next";
    this.slideshowPrevious = ".mibreit-slideshow-previous";
    this.allowFullscreen = true;
  }
  withSlideshowNextButton(button) {
    if (isString(button)) {
      this.slideshowNext = button;
    }
    return this;
  }
  withSlideshowPreviousButton(button) {
    if (isString(button)) {
      this.slideshowPrevious = button;
    }
    return this;
  }
  withShowThumbview(show) {
    if (isBoolean(show)) {
      this.showThumbview = show;
    }
    return this;
  }
  withThumbviewContainer(container) {
    if (isString(container)) {
      this.thumbviewContainer = container;
    }
    return this;
  }
  withThumbviewNextButton(button) {
    if (isString(button)) {
      this.thumbviewNext = button;
    }
    return this;
  }
  withThumbviewPreviousButton(button) {
    if (isString(button)) {
      this.thumbviewPrevious = button;
    }
    return this;
  }
  withTitleContainer(container) {
    if (isString(container)) {
      this.titleContainer = container;
    }
    return this;
  }
  withFullscreen(allow) {
    if (isBoolean(allow)) {
      this.allowFullscreen = allow;
    }
    return this;
  }

  buildGallery() {
    let validationResult = super._validate();
    if (this._validate() !== undefined) {
      throw Error("buildSlideshow Error: invalid config", validationResult);
    }

    validationResult = this._validate();

    return new Gallery(this);
  }

  // private
  _validate() {

    return undefined;
  }
}

class Gallery {
  constructor(config) {
    this._config = config;

    this._mibreitSlideshow = this._config.buildSlideshow();

    // default values are used if config does not provide alternative values

    this._scaleMode = SCALE_MODE_FITASPECT;

    this._mibreitScroller = undefined;
    this._mibreitThumbview = undefined;
    this._fullscreenController = undefined;
    this._fullscreenEnterButton = undefined;
  }

  init() {
    if (this._mibreitSlideshow.init()) {
      // fullscreen
      if (this._config.allowFullscreen) {

        $(this._config.slideshowContainer).append(`<div class="${ENTER_FULLSCREEN_BUTTON.substr(1)}"></div>`);

        this._fullscreenEnterButton = $(`${this._config.slideshowContainer} ${ENTER_FULLSCREEN_BUTTON}`);
        const fullscreenController = new FullscreenController();
        if (fullscreenController.init(this._config.slideshowContainer, this._config.thumbviewContainer,
            this._config.titleContainer, this._fullscreenChangedCallback)) {
          this._fullscreenController = fullscreenController;
        }
      }

      // thumbview
      if (this._config.showThumbview) {
        this._initThumbview();
      }

      // input
      this._initKeyAndMouseEvents();

      // title
      if (this._titleContainer !== undefined) {
        this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle());
      }
    }

  }

  _initThumbview() {
    this._mibreitThumbview = new Thumbview();

    if (
      this._mibreitThumbview.init({
        thumbClickCallback: this._thumbClickCallback,
        thumbviewContainer: this._config.thumbviewContainer
      })
    ) {
      $(`${this._config.thumbviewContainer} ${THUMB_ELEMENT}`).wrapAll(
        `<div class="${THUMBS_SCROLLER.substr(1)}" />`
      );

      this._mibreitScroller = new ThumbviewScroller();
      if (
        this._mibreitScroller.init({
          scroller: `${this._config.thumbviewContainer} ${THUMBS_SCROLLER}`,
          thumbviewContainer: this._config.thumbviewContainer,
        })
      ) {
        $(this._config.thumbviewPrevious).bind("click", this._scrollLeftCallback);
        $(this._config.thumbviewNext).bind("click", this._scrollRightCallback);
      }
    }
  }

  _initKeyAndMouseEvents() {
    $(this._config.slideshowContainer).bind("mouseenter", this._mouseEnterCallback);

    $(this._config.slideshowContainer).bind("mouseleave", this._mouseLeaveCallback);

    handleSwipe(this._config.slideshowContainer, [SWIPE_LEFT, SWIPE_RIGHT, CLICK], this._swipe);

    if (this._fullscreenEnterButton) {
      $(this._fullscreenEnterButton).bind("click", this._fullscreenEnterClickCallback);
      // consume other touch events to avoid interference with images behind
      $(this._fullscreenEnterButton).bind("mouseup mousedown touchstart touchend", (event) => {
        event.stopPropagation()
      });
    }

    $(document).bind("keydown", this._keyDownCallback);
  }

  _updateTitle(title) {
    $(this._titleContainer).html("<h3>" + title + "</h3>");
  }

  // callbacks 

  _thumbClickCallback = id => {
    this._mibreitSlideshow.showImage(id);
  };

  _fullscreenEnterClickCallback = (event) => {
    this._fullscreenController.toggleFullscreen();
    event.stopPropagation();
  }

  _scrollLeftCallback = () => {
    this._mibreitScroller.scrollLeft(6);
  }

  _scrollRightCallback = () => {
    this._mibreitScroller.scrollRight(6);
  }

  _mouseEnterCallback = () => {
    $(this._config.slideshowNext).animate({
        opacity: 0.4
      },
      HOVER_ANIMATION_TIME
    );
    $(this._config.slideshowPrevious).animate({
        opacity: 0.4
      },
      HOVER_ANIMATION_TIME
    );
    this._handleFullscreenEnterButtonOpacity(true);
  }

  _mouseLeaveCallback = () => {
    $(this._config.slideshowNext).animate({
        opacity: 0.0
      },
      HOVER_ANIMATION_TIME
    );
    $(this._config.slideshowPrevious).animate({
        opacity: 0.0
      },
      HOVER_ANIMATION_TIME
    );
    this._handleFullscreenEnterButtonOpacity(false);
  }

  _swipe = (direction, x, y) => {
    switch (direction) {
      case SWIPE_LEFT:
        this._mibreitSlideshow.showNextImage();
        break;
      case SWIPE_RIGHT:
        this._mibreitSlideshow.showPreviousImage();
        break;
      case CLICK:
        this._containerClickedCallback(x, $(this._config.slideshowContainer).width());
        break;
      default:
    }
  }

  _imageChangedCallback = (id, title) => {
    if (this._mibreitScroller !== undefined) {
      this._mibreitScroller.scrollTo(id);
    }
    if (this._titleContainer !== undefined) {
      this._updateTitle(title);
    }
  };

  _fullscreenChangedCallback = (fullscreen) => {
    if (fullscreen) {
      this._mibreitSlideshow.reinitSize(SCALE_MODE_FITASPECT);
      $(window).resize(() => {
        this._mibreitSlideshow.reinitSize(SCALE_MODE_FITASPECT);
      });
      $(this._fullscreenEnterButton).css({
        opacity: 0.0,
      });
    } else {
      this._mibreitSlideshow.reinitSize(this._scaleMode);
      $(window).off("resize");
    }
  }

  _handleFullscreenEnterButtonOpacity(show) {
    if (this._fullscreenEnterButton) {
      if (show && !this._fullscreenController.isFullscreen()) {
        $(this._fullscreenEnterButton).animate({
            opacity: 0.4
          },
          HOVER_ANIMATION_TIME
        );
      } else {
        $(this._fullscreenEnterButton).animate({
            opacity: 0.0
          },
          HOVER_ANIMATION_TIME
        );
      }
    }
  }

  _containerClickedCallback = (relativeX, containerWidth) => {
    if (relativeX < containerWidth / 2) {
      this._mibreitSlideshow.showPreviousImage();
    } else if (relativeX > containerWidth / 2) {
      this._mibreitSlideshow.showNextImage();
    }
  };

  _keyDownCallback = event => {
    const key = event.which;
    if (key === 37) {
      // left arrow
      this._mibreitSlideshow.showPreviousImage();
    } else if (key === 39) {
      // right arrow
      this._mibreitSlideshow.showNextImage();
    } else if (key === 27) {
      // escape      
      if (this._fullscreenController && this._fullscreenController.isFullscreen()) {
        this._fullscreenController.toggleFullscreen();
      }
    } else if (key === 70) {
      // f -> toggle fullscreen
      if (this._fullscreenController) {
        this._fullscreenController.toggleFullscreen();
      }
    }
  };
}