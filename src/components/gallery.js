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
  ENTER_FULLSCREEN_BUTTON
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

    this.thumbviewContainer = ".mibreit-thumbview";
    this.thumbviewNext = ".mibreit-thumbview-next";
    this.thumbviewPrevious = ".mibreit-thumbview-previous";
    this.slideshowNext = ".mibreit-slideshow-next";
    this.slideshowPrevious = ".mibreit-slideshow-previous";
    this.titleContainer = undefined;
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
    return new Gallery(this);
  }
}

class Gallery {
  constructor(builder) {
    this._mibreitSlideshow = builder.withImageChangedCallback(this._imageChangedCallback).buildSlideshow();
    this._slideshowContainer = builder.slideshowContainer;
    this._slideshowPrevious = builder.slideshowPrevious;
    this._slideshowNext = builder.slideshowNext;
    this._thumbviewContainer = builder.thumbviewContainer;
    this._thumbviewPrevious = builder.thumbviewPrevious;
    this._thumbviewNext = builder.thumbviewNext;
    this._allowFullscreen = builder.allowFullscreen;
    this._titleContainer = builder.titleContainer;

    // not provided by builder    
    this._mibreitScroller = undefined;
    this._fullscreenController = undefined;
    this._fullscreenEnterButton = undefined;
  }

  init() {
    if (this._mibreitSlideshow.isInitialized()) {
      // fullscreen
      if (this._allowFullscreen) {
        this._initFullscreen();
      }

      // thumbview
      this._initThumbview();

      // input
      this._initKeyAndMouseEvents();

      // title
      if (this._titleContainer !== undefined) {
        this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle());
      }
      return true;
    } else {
      return false;
    }
  }

  // private helpers

  _initFullscreen() {
    $(this._slideshowContainer).append(`<div class="${ENTER_FULLSCREEN_BUTTON.substr(1)}"></div>`);

    this._fullscreenEnterButton = $(`${this._slideshowContainer} ${ENTER_FULLSCREEN_BUTTON}`);
    const fullscreenController = new FullscreenController();
    if (fullscreenController.init(this._slideshowContainer, this._thumbviewContainer,
        this._titleContainer, this._fullscreenChangedCallback)) {
      this._fullscreenController = fullscreenController;
    }
  }

  _initThumbview() {
    if (new Thumbview().init(this._thumbviewContainer, this._thumbClickCallback)) {
      this._mibreitScroller = new ThumbviewScroller();
      if (this._mibreitScroller.init(this._thumbviewContainer)) {
        $(this._thumbviewPrevious).bind("click", this._scrollLeftCallback);
        $(this._thumbviewNext).bind("click", this._scrollRightCallback);
      }
    }
  }

  _initKeyAndMouseEvents() {
    $(this._slideshowContainer).bind("mouseenter", this._mouseEnterCallback);

    $(this._slideshowContainer).bind("mouseleave", this._mouseLeaveCallback);

    handleSwipe(this._slideshowContainer, [SWIPE_LEFT, SWIPE_RIGHT, CLICK], this._swipe);

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

  _handleFullscreenEnterButtonOpacity(show) {
    if (this._fullscreenEnterButton) {
      $(this._fullscreenEnterButton).animate({
          opacity: show && !this._fullscreenController.isFullscreen() ? 0.4 : 0.0
        },
        HOVER_ANIMATION_TIME
      );
    }
  }

  _handlePreviousNextButtonsOpacity(show) {
    $(this._slideshowNext).animate({
        opacity: show ? 0.4 : 0.0
      },
      HOVER_ANIMATION_TIME
    );
    $(this._slideshowPrevious).animate({
        opacity: show ? 0.4 : 0.0
      },
      HOVER_ANIMATION_TIME
    );
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
    this._handlePreviousNextButtonsOpacity(true);
    this._handleFullscreenEnterButtonOpacity(true);
  }

  _mouseLeaveCallback = () => {
    this._handlePreviousNextButtonsOpacity(false);
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
        this._containerClickedCallback(x, $(this._slideshowContainer).width());
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
    this._mibreitSlideshow.reinitSize();
    if (fullscreen) {
      $(this._fullscreenEnterButton).css({
        opacity: 0.0,
      });
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