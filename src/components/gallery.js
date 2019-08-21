/**
 * @class Slideshow
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
import Slideshow from "./slideshow";
import ThumbviewScroller from "./thumbviewScroller";
import FullscreenController from "./fullscreenController";
import {
  isString,
  isBoolean
} from "../tools/typeChecks";

// const
const HOVER_ANIMATION_TIME = 400;

export default class Gallery {
  constructor() {
    // default values are used if config does not provide alternative values
    this._slideshowContainer = ".mibreit-slideshow";
    this._thumbviewContainer = ".mibreit-thumbs";
    this._titleContainer = "";
    this._thumbviewNext = ".mibreit-thumbview-next";
    this._thumbviewPrevious = ".mibreit-thumbview-previous";
    this._slideshowNext = ".mibreit-slideshow-next";
    this._slideshowPrevious = ".mibreit-slideshow-previous";
    this._showThumbview = true;
    this._slideshowHighlighting = false;
    this._scaleMode = "fitaspect";

    this._mibreitScroller = undefined;
    this._mibreitThumbview = undefined;
    this._mibreitSlideshow = undefined;
    this._fullscreenController = undefined;
    this._fullscreenEnterButton = undefined;
  }

  init(config) {
    let error_code = 0;

    if (isString(config.slideshowContainer)) {
      this._slideshowContainer = config.slideshowContainer;
    } else {
      config.slideshowContainer = this._slideshowContainer;
    }
    if (isString(config.thumbviewContainer)) {
      this._thumbviewContainer = config.thumbviewContainer;
    } else {
      config.thumbviewContainer = this._thumbviewContainer;
    }
    if (isBoolean(config.showThumbView)) {
      this._showThumbview = config.showThumbView;
    }
    if (isString(config.thumbviewNext)) {
      this._thumbviewNext = config.thumbviewNext;
    } else {
      config.thumbviewNext = this._thumbviewNext;
    }
    if (isString(config.thumbviewPrevious)) {
      this._thumbviewPrevious = config.thumbviewPrevious;
    } else {
      config.thumbviewPrevious = this._thumbviewPrevious;
    }
    if (isString(config.slideshowNext)) {
      this._slideshowNext = config.slideshowNext;
    } else {
      config.slideshowNext = this._slideshowNext;
    }
    if (isString(config.slideshowPrevious)) {
      this._slideshowPrevious = config.slideshowPrevious;
    } else {
      config.slideshowPrevious = this._slideshowPrevious;
    }
    if (isString(config.titleContainer)) {
      this._titleContainer = config.titleContainer;
    }
    if (isString(config.imageScaleMode)) {
      this._scaleMode = config.imageScaleMode;
    } else {
      config.imageScaleMode = this._scaleMode;
    }
    if (isBoolean(config.allowFullscreen)) {
      $(this._slideshowContainer).append("<div class=\"mibreit-enter-fullscreen-button\"></div>");
      this._fullscreenEnterButton = $(config.slideshowContainer + " .mibreit-enter-fullscreen-button");
      const fullscreenController = new FullscreenController();
      if (fullscreenController.init(config.slideshowContainer, config.thumbviewContainer,
          config.titleContainer, this._fullscreenChangedCallback)) {
        this._fullscreenController = fullscreenController;
      }
    }
    if (isBoolean(config.slideshowHighlighting)) {
      this._slideshowHighlighting = config.slideshowHighlighting;
    }

    error_code = this._initSlideshow(config);

    if (error_code === 0) {

      if (this._showThumbview) {
        this._initThumbview();
      }

      this._initKeyAndMouseEvents();

      // initial update of title
      if (this._titleContainer !== undefined) {
        this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle());
      }
    }

    return error_code;
  }

  _initSlideshow(config) {
    this._mibreitSlideshow = new Slideshow();

    return this._mibreitSlideshow.init({
      imageChangedCallback: this._imageChangedCallback,
      slideshowHighlighting: this._slideshowHighlighting,
      ...config
    });
  }

  _initThumbview() {
    this._mibreitThumbview = new Thumbview();

    if (
      this._mibreitThumbview.init({
        thumbClickCallback: this._thumbClickCallback,
        thumbviewContainer: this._thumbviewContainer
      })
    ) {
      $(this._thumbviewContainer + " .mibreit-thumbElement").wrapAll(
        "<div class='mibreit-thumbs-scroller' />"
      );

      this._mibreitScroller = new ThumbviewScroller();
      if (
        this._mibreitScroller.init({
          scroller: this._thumbviewContainer + " .mibreit-thumbs-scroller",
          thumbviewContainer: this._thumbviewContainer,
        })
      ) {
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
    $(this._slideshowNext).animate({
        opacity: 0.4
      },
      HOVER_ANIMATION_TIME
    );
    $(this._slideshowPrevious).animate({
        opacity: 0.4
      },
      HOVER_ANIMATION_TIME
    );
    if (this._fullscreenEnterButton) {
      if (!this._fullscreenController.isFullscreen()) {
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

  _mouseLeaveCallback = () => {
    $(this._slideshowNext).animate({
        opacity: 0.0
      },
      HOVER_ANIMATION_TIME
    );
    $(this._slideshowPrevious).animate({
        opacity: 0.0
      },
      HOVER_ANIMATION_TIME
    );
    if (this._fullscreenEnterButton) {
      $(this._fullscreenEnterButton).animate({
          opacity: 0.0
        },
        HOVER_ANIMATION_TIME
      );
    }
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
    if (fullscreen) {
      this._mibreitSlideshow.reinitSize("fitaspect");
      $(window).resize(() => {
        this._mibreitSlideshow.reinitSize("fitaspect");
      });
      $(this._fullscreenEnterButton).css({
        opacity: 0.0,
      });
    } else {
      this._mibreitSlideshow.reinitSize(this._scaleMode);
      $(window).off("resize");
    }
  }

  _containerClickedCallback = (relativeX, containerWidth) => {
    if (relativeX < containerWidth / 3) {
      this._mibreitSlideshow.showPreviousImage();
    } else if (relativeX > containerWidth * 2 / 3) {
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