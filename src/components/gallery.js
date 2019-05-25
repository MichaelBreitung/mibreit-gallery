/**
 * @class Slideshow
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import $ from "jquery";
import Thumbview from "./thumbview";
import Slideshow from "./slideshow";
import ThumbviewScroller from "./thumbviewScroller";
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

    this._mibreitScroller = undefined;
    this._mibreitThumbview = undefined;
    this._mibreitSlideshow = undefined;
  }

  init(config) {
    let error_code = 0;
    const self = this;
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
    if (isBoolean(config.slideshowHighlighting)) {
      this._slideshowHighlighting = config.slideshowHighlighting;
    }

    error_code = this._initSlideshow(config);

    if (
      error_code === 0
    ) {
      if (this._showThumbview) {
        this._initThumbview(config);
      }

      $(this._slideshowContainer).bind("mouseenter", function () {
        $(self._slideshowNext).animate({
            opacity: 0.4
          },
          HOVER_ANIMATION_TIME
        );
        $(self._slideshowPrevious).animate({
            opacity: 0.4
          },
          HOVER_ANIMATION_TIME
        );
      });

      $(this._slideshowContainer).bind("mouseleave", function () {
        $(self._slideshowNext).animate({
            opacity: 0.0
          },
          HOVER_ANIMATION_TIME
        );
        $(self._slideshowPrevious).animate({
            opacity: 0.0
          },
          HOVER_ANIMATION_TIME
        );
      });

      $(this._slideshowContainer).bind("click", function (event) {
        var offset = $(this).offset();
        var relativeX = event.pageX - offset.left;
        self._containerClickedCallback(relativeX, $(this).width());
      });

      $(document).bind("keydown", function (event) {
        self._keyDownCallback(event.which);
      });

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
      imageScaleMode: "fitaspect",
      imageChangedCallback: this._imageChangedCallback,
      slideshowHighlighting: this._slideshowHighlighting,
      ...config
    });
  }

  _initThumbview(config) {
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
        !this._mibreitScroller.init({
          scroller: this._thumbviewContainer + " .mibreit-thumbs-scroller",
          ...config
        })
      ) {

        $(this._thumbviewPrevious).bind("click", function () {
          self._mibreitScroller.scrollLeft(6);
        });

        $(this._thumbviewNext).bind("click", function () {
          self._mibreitScroller.scrollRight(6);
        });
      }
    }
  }

  _updateTitle(title) {
    $(this._titleContainer).html("<h3>" + title + "</h3>");
  }

  _thumbClickCallback = id => {
    this._mibreitSlideshow.showImage(id);
  };

  _imageChangedCallback = (id, title) => {
    if (this._mibreitScroller !== undefined) {
      this._mibreitScroller.scrollTo(id);
    }
    if (this._titleContainer !== undefined) {
      this._updateTitle(title);
    }
  };

  _containerClickedCallback = (relativeX, containerWidth) => {
    if (relativeX < containerWidth / 2) {
      this._mibreitSlideshow.showPreviousImage();
    } else {
      this._mibreitSlideshow.showNextImage();
    }
  };

  _keyDownCallback = key => {
    if (key == 37) {
      // left arrow
      this._mibreitSlideshow.showPreviousImage();
    } else if (key == 39) {
      // right arrow
      this._mibreitSlideshow.showNextImage();
    }
  };
}