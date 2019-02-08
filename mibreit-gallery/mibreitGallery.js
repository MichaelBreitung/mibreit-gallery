var mibreitGallery=function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=1)}([function(t,i){t.exports=jQuery},function(t,i,e){"use strict";function s(t){return void 0===t||void 0===t}function r(t){return"string"==typeof t||t instanceof String}function n(t){return"number"==typeof t&&isFinite(t)}function h(t){return"boolean"==typeof t}function o(t){return t&&"object"==typeof t&&t.constructor===Object}e.r(i);var a=e(0),l=e.n(a);const m=800,c=10,u=3e3;class d{constructor(t){this.showImage=(t=>{this._isValidIndex(t)&&!this._images[t].hasAttribute("data-src")&&t!=this._currentIndex&&(l()(this._imageContainers[t]).animate({opacity:1},m),l()(this._imageContainers[this._currentIndex]).animate({opacity:0},m),l()(this._imageContainers[t]).css({"z-index":this._baseZIndex+1}),l()(this._imageContainers[this._currentIndex]).css({"z-index":this._baseZIndex}),this._currentIndex=t,this._imageChanged())}),this.showNextImage=(()=>{var t=this._currentIndex<this._imageContainers.length-1?this._currentIndex+1:0;this.showImage(t)}),this.showPreviousImage=(()=>{var t=this._currentIndex>0?this._currentIndex-1:this._imageContainers.length-1;this.showImage(t)}),this._currentIndex=0,this._imageContainers=[],this._images=[],this._interval=u,this._intervalId=-1,this._baseZIndex=c,this._imageChangedCallback=void 0}init(t){let i=!1;if(r(t.slideshowContainer)&&(this._imageContainers=l()(t.slideshowContainer+" .mibreit-imageElement").has("img"),this._images=l()(t.slideshowContainer+" .mibreit-imageElement > img"),this._imageContainers.length>0)){let e={margin:0};o(t.imageContainerMargin)&&(e=t.imageContainerMargin);let a="none";r(t._imageScaleMode)&&(a=t._imageScaleMode);const c=l()(t.slideshowContainer).css("z-index");n(c)&&(this._baseZIndex=c);const u=l()(t.slideshowContainer).width(),d=l()(t.slideshowContainer).height();n(t.interval)&&(this._interval=t.interval),s(t._imageChangedCallback)||(this._imageChangedCallback=t._imageChangedCallback),h(t.slideshowHighlighting)&&!0===t.slideshowHighlighting&&(0===l()(".mibreit-slideshow-highlight").length&&l()("body").append("<div class='mibreit-slideshow-highlight'/></div>"),l()(t.slideshowContainer).bind("mouseenter",function(){l()(".mibreit-slideshow-highlight").animate({opacity:.75},m)}),l()(t.slideshowContainer).bind("mouseleave",function(){l()(".mibreit-slideshow-highlight").animate({opacity:0},m)})),this._prepareContainers(u,d,e),this._prepare_Images(u,d,a),this._imageChanged(),i=!0}return i}start(){0!=this._interval&&(this._intervalId=setInterval(this.showNextImage,this._interval))}stop(){-1!==this._intervalId&&(clearInterval(this._intervalId),this._intervalId=-1)}_isValidIndex(t){return t>=0&&t<this._images.length&&t<this._imageContainers.length}_prepareContainers(t,i,e){l()(this._imageContainers).css({width:t,height:i,opacity:0}),l()(this._imageContainers).css(e),l()(this._imageContainers[this._currentIndex]).css({opacity:1,"z-index":this._baseZIndex})}_prepare_Images(t,i,e){for(var s=0;s<this._images.length;s++)this._prepareImage(this._images[s],t,i,e)}_prepareImage(t,i,e,s){if(t.hasAttribute("width")&&t.hasAttribute("height")&&(this._scaleImage(t,i,e,s),this._positionImage(t,i,e)),t.hasAttribute("title")){var r=t.getAttribute("title");t.removeAttribute("title"),t.setAttribute("data-title",r)}t.hasAttribute("data-src")&&(t.onload=function(){this.removeAttribute("data-src")},t.setAttribute("src",t.getAttribute("data-src")))}_scaleImage(t,i,e,s){switch(s){case"stretch":t.setAttribute("width",i),t.setAttribute("height",e);break;case"fitaspect":let r=parseInt(t.getAttribute("width")),n=parseInt(t.getAttribute("height"));let h=1;n*=h=i/e>r/n?e/n:i/r,r*=h,t.setAttribute("width",r),t.setAttribute("height",n)}}_positionImage(t,i,e){const s=parseInt(t.getAttribute("width")),r=parseInt(t.getAttribute("height")),n=(s+i)/2-s,h=(r+e)/2-r;l()(t).css({left:n}),l()(t).css({top:h})}_imageChanged(){if(void 0!==this._imageChangedCallback){const t=this._images[this._currentIndex].getAttribute("data-title");null!==t&&this._imageChangedCallback(this._currentIndex,t)}}}class _{init(t){let i=!1;if(r(t.thumbviewContainer)){const e=l()(t.thumbviewContainer+" .mibreit-thumbElement"),r=l()(t.thumbviewContainer+" .mibreit-thumbElement > img"),n=e.innerWidth(),h=e.innerHeight();s(t.thumbClickCallback)||this._setupClickEvents(e,t.thumbClickCallback),this._prepareThumbview(r,n,h),i=!0}return i}_setupClickEvents(t,i){for(let e=0;e<t.length;e++)l()(t[e]).bind("click",{id:e},function(t){i(t.data.id)})}_prepareThumbview(t,i,e){for(let s=0;s<t.length;s++)this._prepareThumb(t[s],i,e)}_prepareThumb(t,i,e){t.hasAttribute("width")&&t.hasAttribute("height")&&(this._scaleThumb(t,i,e),this._positionThumb(t,i,e)),t.hasAttribute("data-src")&&(t.onload=function(){this.removeAttribute("data-src")},t.setAttribute("src",t.getAttribute("data-src")))}_scaleThumb(t,i,e){let s=parseInt(t.getAttribute("width")),r=parseInt(t.getAttribute("height"));let n=1;r*=n=i/e>s/r?i/s:e/r,s*=n,t.setAttribute("width",s),t.setAttribute("height",r)}_positionThumb(t,i,e){const s=parseInt(t.getAttribute("width")),r=parseInt(t.getAttribute("height")),n=(s+i)/2-s,h=(r+e)/2-r;l()(t).css({marginLeft:n}),l()(t).css({marginTop:h})}}class b{constructor(){this._allowMovement=!1,this._nrOfImages=0,this._nrVisibleImages=0,this._midPositionId=0,this._startPositionId=0,this._stepSize=!1}init(t){let i=!1;return r(t.thumbviewContainer)&&r(t.scroller)&&(thumbContainers=l()(t.thumbviewContainerClassName+" .mibreit-thumbElement"),this.scroller=l()(t.scroller),this._stepSize=thumbContainers.outerWidth(!0),this._nrOfImages=thumbContainers.length,this._nrVisibleImages=Math.floor(this.scroller.width()/this._stepSize),this.scroller.css({width:this._nrVisibleImages*this._stepSize}),this._nrOfImages<=this._nrVisibleImages?(this._allowMovement=!1,this.scroller.css({left:(this.scroller.width()-this._stepSize*this._nrOfImages)/2})):(this._allowMovement=!0,this._midPositionId=Math.floor(this._nrVisibleImages/2)),i=!0),i}scrollTo(t){if(this._allowMovement){var i=t-this._midPositionId;i<0?this._startPositionId=0:i<=this._nrOfImages-this._nrVisibleImages?this._startPositionId=i:this._startPositionId=this._nrOfImages-this._nrVisibleImages,this._moveScroller()}}scrollRight(t){if(this._allowMovement){var i=this._startPositionId+t,e=this._nrOfImages-this._nrVisibleImages;this._startPositionId==e?this._startPositionId=0:this._startPositionId=i>e?e:i,this._moveScroller()}}scrollLeft(t){if(this._allowMovement){var i=this._startPositionId-t;0==this._startPositionId?this._startPositionId=this._nrOfImages-this._nrVisibleImages:this._startPositionId=i<0?0:i,this._moveScroller()}}_moveScroller(){!1!==this.scroller&&this.scroller.animate({left:-this._startPositionId*this._stepSize},800)}}var g=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t};const w=400;class v{constructor(){this._thumbClickCallback=(t=>{this._mibreitSlideshow.showImage(t)}),this._imageChangedCallback=((t,i)=>{void 0!==this._mibreitScroller&&this._mibreitScroller.scrollTo(t),void 0!==this._titleContainer&&l()(this._titleContainer).html("<h3>"+i+"</h3>")}),this._containerClickedCallback=((t,i)=>{t<i/2?this._mibreitSlideshow.showPreviousImage():this._mibreitSlideshow.showNextImage()}),this._keyDownCallback=(t=>{37==t?this._mibreitSlideshow.showPreviousImage():39==t&&this._mibreitSlideshow.showNextImage()}),this._slideshowContainer=".mibreit-slideshow",this._thumbviewContainer=".mibreit-thumbs",this._titleContainer=void 0,this._thumbviewNext=".mibreit-thumbview-next",this._thumbviewPrevious=".mibreit-thumbview-previous",this._slideshowNext=".mibreit-slideshow-next",this._slideshowPrevious=".mibreit-slideshow-previous",this._showThumbview=!0,this._slideshowHighlighting=!1,this._mibreitScroller=void 0,this._mibreitThumbview=void 0,this._mibreitSlideshow=void 0}init(t){let i=!1;const e=this;return r(t.slideshowContainer)&&(this._slideshowContainer=t.slideshowContainer),r(t.thumbviewContainer)&&(this._thumbviewContainer=t.thumbviewContainer),h(t.showThumbView)&&(this._showThumbview=t.showThumbView),r(t.thumbviewNext)&&(this._thumbviewNext=t.thumbviewNext),r(t.thumbviewPrevious)&&(this._thumbviewPrevious=t.thumbviewPrevious),r(t.slideshowNext)&&(this._slideshowNext=t.slideshowNext),r(t.slideshowPrevious)&&(this._slideshowPrevious=t.slideshowPrevious),r(t.titleContainer)&&(this._titleContainer=t.titleContainer),h(t.slideshowHighlighting)&&(this._slideshowHighlighting=t.slideshowHighlighting),this._showThumbview&&(this._mibreitThumbview=new _,this._mibreitThumbview.init({thumbClickCallback:this._thumbClickCallback,thumbviewContainer:this._thumbviewContainer})&&(l()(this._thumbviewContainer+" .mibreit-thumbElement").wrapAll("<div class='mibreit-thumbs-scroller' />"),this._mibreitScroller=new b,this._mibreitScroller.init(g({scroller:this.thumbviewContainer+" .mibreit-thumbs-scroller"},t))&&(l()(this._thumbviewPrevious).bind("click",function(){e._mibreitScroller.scrollLeft(6)}),l()(this._thumbviewNext).bind("click",function(){e._mibreitScroller.scrollRight(6)})))),this._mibreitSlideshow=new d,this._mibreitSlideshow.init(g({imageScaleMode:"fitaspect",interval:4e3,imageChangedCallback:this._imageChangedCallback,slideshowHighlighting:this._slideshowHighlighting},t))&&(l()(this._slideshowContainer).bind("mouseenter",function(){l()(e._slideshowNext).animate({opacity:.4},w),l()(e._slideshowPrevious).animate({opacity:.4},w)}),l()(this._slideshowContainer).bind("mouseleave",function(){l()(e._slideshowNext).animate({opacity:0},w),l()(e._slideshowPrevious).animate({opacity:0},w)}),l()(this._slideshowContainer).bind("click",function(t){var i=l()(this).offset(),s=t.pageX-i.left;e._containerClickedCallback(s,l()(this).width())}),l()(document).bind("keydown",function(t){e._keyDownCallback(t.which)}),i=!0),i}}function C(t){if(s(t))throw Error("createSlideshow Error: No Config was provided");const i=new d;if(!i.init(t))throw Error("createSlideshow Error: invalid config");return i}function f(t){if(s(t))throw Error("createGallery Error: No Config was provided");const i=new v;if(!i.init(t))throw Error("createGallery Error: invalid config");return i}e.d(i,"createSlideshow",function(){return C}),e.d(i,"createGallery",function(){return f})}]);