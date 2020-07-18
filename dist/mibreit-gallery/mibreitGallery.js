var mibreitGallery=function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=8)}([function(t,e){t.exports=jQuery},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/next-image.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/previous-image.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/next.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/previous.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/image-placeholder-transparent.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/exit-fullscreen.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/fullscreen.png"},function(t,e,i){"use strict";i.r(e);i(9),i(14),i(16),i(1),i(2),i(3),i(4),i(5),i(6),i(7);function s(t){return void 0===t||void 0===t}function r(t){return"string"==typeof t||t instanceof String}function n(t){return"number"==typeof t&&isFinite(t)}var h=i(0),a=i.n(h);function o(t,e,i){let s=void 0,r=void 0,n=!1;const h=()=>{n=!0};function a(t){return t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.pageX,y:t.pageY}}$(t).bind("mousedown touchstart",t=>{s=Date.now(),r=a(t),"touchstart"===t.type&&(e.includes("SWIPE_UP")||e.includes("SWIPE_DOWN"))&&t.preventDefault(),n=!1,$(window).bind("scroll",h)}),$(t).bind("mouseup touchend",o=>{if(("mouseup"!==o.type||1===o.which)&&s&&Date.now()-s<700){const h=a(o),l=function(t,e){const i=e.x-t.x,s=e.y-t.y,r=[];i>50?r.push("SWIPE_RIGHT"):i<-50&&r.push("SWIPE_LEFT");s>50?r.push("SWIPE_DOWN"):s<-50&&r.push("SWIPE_UP");return r}(r,h);let _=!1,d=!1;for(let t of l)e.includes(t)&&(i(t),_=!0);l.length||n||(i("CLICK",h.x-$(t).offset().left,h.y-$(t).offset().top),d=!0),(_||d)&&(o.cancelable&&"touchend"===o.type&&o.preventDefault(),o.stopPropagation()),s=void 0}$(window).unbind("scroll",h)})}const l=".mibreit-thumbs",_=".mibreit-regular",d=["SCALE_MODE_STRETCH","SCALE_MODE_EXPAND","SCALE_MODE_FITASPECT","SCALE_MODE_NONE"];class u{constructor(t,e){if(this._image=t,this._scaleMode="SCALE_MODE_FITASPECT",this._originalWidth=parseInt(this._image.getAttribute("width")),this._originalHeight=parseInt(this._image.getAttribute("height")),e&&$(this._image).css({maxWidth:`${this._originalWidth}px`,maxHeight:`${this._originalHeight}px`}),this._onLoadCallbackInternal=void 0,this._state=this._image.hasAttribute("data-src")?"IMAGE_INACTIVE":"IMAGE_LOADED",$(this._image).wrap('<div class="mibreit-center-box"></div>'),$(this._image).on("dragstart",(function(){return!1})),$(this._image).contextmenu((function(){return!1})),this._image.hasAttribute("title")){const t=this._image.getAttribute("title");this._image.removeAttribute("title"),this._image.setAttribute("data-title",t)}this._title=this._image.getAttribute("data-title")}loadImage(){return new Promise((t,e)=>{this._isInactive()?(this._image.onload=()=>{this._image.removeAttribute("data-src"),this._state="IMAGE_LOADED",this._onLoadCallbackInternal&&this._onLoadCallbackInternal(),t()},this._state="IMAGE_LOADING",this._image.setAttribute("src",this._image.getAttribute("data-src"))):e(this.wasLoaded())})}wasLoaded(){return"IMAGE_LOADED"===this._state}getTitle(){return this._title}getUrl(){return this._image.hasAttribute("data-src")?this._image.getAttribute("data-src"):this._image.getAttribute("src")}applyScaleMode(t,e,i){if(n(t)&&n(e))switch(r(i)&&(this._scaleMode=i),this._scaleMode){case"SCALE_MODE_STRETCH":this._applyStretch();break;case"SCALE_MODE_EXPAND":this._applyExpand(t,e);break;case"SCALE_MODE_FITASPECT":this._applyFitAspect(t,e);break;case"SCALE_MODE_NONE":default:this._applyNone(t,e)}}startZoomAnimation(t,e){$(this._image).css({transition:`transform ${e/1e3}s linear`,transform:`scale(${t/100})`})}resetZoom(){$(this._image).css({transition:"none",transform:"scale(1.0)"})}_applyStretch(){$(this._image).css({width:"100%",height:"100%"})}_applyExpand(t,e){const i=this._originalWidth/this._originalHeight;t/e>i?$(this._image).css({width:`${t}px`,height:`${t/i}px`}):$(this._image).css({width:`${e*i}px`,height:`${e}px`}),this._centerImage(t,e)}_applyFitAspect(t,e){t/e>this._originalWidth/this._originalHeight?e<=this._originalHeight?$(this._image).css({width:"auto",height:"100%"}):$(this._image).css({width:"auto",height:"auto"}):t<=this._originalWidth?$(this._image).css({width:"100%",height:"auto"}):$(this._image).css({width:"auto",height:"auto"}),this._resetImagePosition()}_applyNone(t,e){$(this._image).css({width:`${this._originalWidth}px`,height:`${this._originalHeight}px`}),this._centerImage(t,e)}_resetImagePosition(){$(this._image).css({marginLeft:"auto"}),$(this._image).css({marginTop:"auto"})}_centerImage(t,e){if("IMAGE_LOADED"!=this._state)this._onLoadCallbackInternal=()=>{this._centerImage(t,e)};else{const i=$(this._image).width(),s=$(this._image).height(),r=(i+t)/2-i,n=(s+e)/2-s;$(this._image).css({marginLeft:r}),$(this._image).css({marginTop:n})}}_isInactive(){return"IMAGE_INACTIVE"===this._state}}function c(t){return r(t)&&$(t).length>0}class m{constructor(){this._thumbWrappers=void 0,this._thumbContainers=void 0,this._currentThumbWidth=0,this._currentThumbHeight=0}init(t,e){if(c(t)){this._thumbContainers=a()(`${t} .mibreit-thumbElement`);const i=a()(`${t} .mibreit-thumbElement > img`);this._thumbContainers.length>0&&this._thumbContainers.length===i.length&&(this._thumbWrappers=this._wrapThumbs(i),this._ensureThumbContainerZIndex(t),s(e)||this._setupClickEvents(e),this._setScaleModeForThumbs(),this._preloadThumbs(),a()(window).resize(()=>{this._setScaleModeForThumbs()}))}}reinitSize(){this._thumbWrappers&&this._setScaleModeForThumbs()}_wrapThumbs(t){let e=[];for(let i=0;i<t.length;i++)e.push(new u(t[i]));return e}_ensureThumbContainerZIndex(t){a()(t).has("z-index")||a()(t).css({"z-index":10})}_setupClickEvents(t){for(let e=0;e<this._thumbContainers.length;e++)a()(this._thumbContainers[e]).bind("click",{id:e},(function(e){t(e.data.id)}))}_setScaleModeForThumbs(){const t=this._thumbContainers.innerWidth(),e=this._thumbContainers.innerHeight();if(this._currentThumbHeight!==e||this._currentThumbWidth!==t){this._currentThumbHeight=e,this._currentThumbWidth=t;for(const i of this._thumbWrappers)i.applyScaleMode(t,e,"SCALE_MODE_EXPAND")}}_preloadThumbs(){for(const t of this._thumbWrappers)t.loadImage().catch(()=>{})}}class g{constructor(t,e,i,r){this._currentIndex=e,this._imageWrappers=t,this._loadedCount=this._getLoadedCount(t),this._preloadLeftNr=3,s(i)||(this._preloadLeftNr=i),this._preloadRightNr=7,s(r)||(this._preloadRightNr=r)}setCurrentIndex(t){this._currentIndex!=t&&(this._currentIndex=t,this._moveWindow())}loadImage(t){return new Promise((e,i)=>{t>=0&&t<this._imageWrappers.length?this._imageWrappers[t].loadImage().then(()=>{this._loadedCount++,e(!0)}).catch(t=>{e(t)}):i()})}_moveWindow(){if(this._loadedCount<this._imageWrappers.length){let t=this._currentIndex-this._preloadLeftNr,e=this._currentIndex+this._preloadRightNr;this._loadImages(this._currentIndex,e<this._imageWrappers.length?e:this._imageWrappers.length),this._loadImages(t>=0?t:0,this._currentIndex),t<0&&(t=this._imageWrappers.length+t,this._loadImages(t,this._imageWrappers.length)),e>=this._imageWrappers.length&&(e-=this._imageWrappers.length,this._loadImages(0,e))}}_loadImages(t,e){for(let i=t;i<e&&i<this._imageWrappers.length;i++)this.loadImage(i)}_getLoadedCount(t){let e=0;for(const i of t)i.wasLoaded()&&e++;return e}}class b{constructor(t){this.showImage=t=>{this._isValidIndex(t)&&(this._imageWrappers[t].wasLoaded()?this._changeCurrentImage(t):this._preloader.loadImage(t).then(e=>{this._preloader.setCurrentIndex(this._currentIndex),this._changeCurrentImage(t)}).catch(()=>{throw new Error("Error in Slideshow#showImage")}))},this.showNextImage=()=>{var t=this._currentIndex<this._imageContainers.length-1?this._currentIndex+1:0;this.showImage(t)},this.showPreviousImage=()=>{var t=this._currentIndex>0?this._currentIndex-1:this._imageContainers.length-1;this.showImage(t)},this._slideshowContainer=t.slideshowContainer,this._imageScaleMode=t.scaleMode,this._interval=t.interval,this._zoom=t.zoom,this._currentIndex=-1,this._imageContainers=[],this._imageWrappers=[],this._intervalId=-1,this._baseZIndex=10,this._imageChangedCallback=void 0,this._preloader=void 0,this._isInitialized=this._init(t.preloaderLeftNr,t.preloaderRightNr)}isInitialized(){return this._isInitialized}reinitSize(){if(!s(this._imageWrappers[this._currentIndex])){const t=a()(this._slideshowContainer).width();let e=a()(this._slideshowContainer).height();0===e&&(e=a()(this._slideshowContainer).outerHeight()),this._imageWrappers[this._currentIndex].applyScaleMode(t,e,this._imageScaleMode)}}start(){this._isInitialized&&(this._intervalId=setInterval(this.showNextImage,this._interval))}stop(){-1!==this._intervalId&&(clearInterval(this._intervalId),this._intervalId=-1)}setImageChangedCallback(t){this._imageChangedCallback=t}getCurrentImageTitle(){return this._isValidIndex(this._currentIndex)?this._imageWrappers[this._currentIndex].getTitle():""}getCurrentImageUrl(){return this._isValidIndex(this._currentIndex)?this._imageWrappers[this._currentIndex].getUrl():""}_init(t,e){this._imageContainers=a()(`${this._slideshowContainer} .mibreit-imageElement`).has("img");const i=a()(`${this._slideshowContainer} .mibreit-imageElement > img`);return this._imageContainers.length>0&&this._imageContainers.length===i.length&&(this._wrapImages(i),this._prepareContainers(),this.reinitSize(),a()(window).resize(()=>{this.reinitSize()}),this._preloader=new g(this._imageWrappers,this._currentIndex,t,e),this.showImage(0),!0)}_isValidIndex(t){return t>=0&&t<this._imageContainers.length}_wrapImages(t){for(let e=0;e<t.length;e++)this._imageWrappers.push(new u(t[e],!0))}_prepareContainers(){a()(this._imageContainers).css({opacity:0}),a()(this._imageContainers[this._currentIndex]).css({opacity:1,"z-index":this._baseZIndex})}_changeCurrentImage(t){if(t!=this._currentIndex){if(a()(this._imageContainers[t]).animate({opacity:1},800),a()(this._imageContainers[t]).css({"z-index":this._baseZIndex+1}),n(this._zoom)&&this._imageWrappers[t].startZoomAnimation(this._zoom,this._interval+800),-1!=this._currentIndex){const t=this._currentIndex;a()(this._imageContainers[this._currentIndex]).animate({opacity:0},800,"swing",()=>{n(this._zoom)&&this._imageWrappers[t].resetZoom()}),a()(this._imageContainers[this._currentIndex]).css({"z-index":this._baseZIndex})}this._currentIndex=t,this.reinitSize(),void 0!==this._imageChangedCallback&&this._imageChangedCallback(this._currentIndex,this.getCurrentImageTitle())}}}class p{constructor(){this._allowMovement=!1,this._nrOfImages=0,this._nrVisibleImages=0,this._midPositionId=0,this._startPositionId=0,this._stepSize=1,this._thumbviewContainer=void 0,this._scroller=void 0,this._thumbContainers=[],this._newVisibleWidth=0}init(t){return!!(c(t)&&(this._thumbviewContainer=t,this._thumbContainers=a()(`${t} .mibreit-thumbElement`),this._nrOfImages=this._thumbContainers.length,this._nrOfImages>0))&&(this._thumbContainers.wrapAll(`<div class="${".mibreit-thumbs-scroller".substr(1)}" />`),a()(".mibreit-thumbs-scroller").wrap(`<div class="${l.substr(1)}" />`),"flex"===a()(l).css("display")&&a()(l).css({display:"block"}),this._scroller=a()(`${t} .mibreit-thumbs-scroller`),this._resizeNeeded(),window.addEventListener("orientationchange",()=>{setTimeout(()=>{this._resizeNeeded()},100)}),a()(window).resize(()=>{this._resizeNeeded()}),!0)}reinitSize(){this._scroller&&this._resizeNeeded()}scrollTo(t){if(this._allowMovement){var e=t-this._midPositionId;e<0?this._startPositionId=0:e<=this._nrOfImages-this._nrVisibleImages?this._startPositionId=e:this._startPositionId=this._nrOfImages-this._nrVisibleImages,this._moveScroller(!0)}}scrollRight(t){if(this._allowMovement){var e=this._startPositionId+t,i=this._nrOfImages-this._nrVisibleImages;this._startPositionId==i?this._startPositionId=0:this._startPositionId=e>i?i:e,this._moveScroller(!0)}}scrollLeft(t){if(this._allowMovement){var e=this._startPositionId-t;0==this._startPositionId?this._startPositionId=this._nrOfImages-this._nrVisibleImages:this._startPositionId=e<0?0:e,this._moveScroller(!0)}}_moveScroller(t){this._scroller&&(this._scroller.stop(),t?this._scroller.animate({left:-this._startPositionId*this._stepSize},600):this._scroller.css({left:-this._startPositionId*this._stepSize}))}_resizeNeeded(){const t=a()(this._thumbviewContainer).width()-4.5*parseFloat(a()(":root").css("font-size"));this._newVisibleWidth!==t&&(this._newVisibleWidth=t,a()(l).css({width:`${this._newVisibleWidth}px`}),this._stepSize=this._newVisibleWidth/6,this._nrVisibleImages=Math.floor(this._newVisibleWidth/this._stepSize),this._nrOfImages<=this._nrVisibleImages?(this._allowMovement=!1,this._scroller.css({left:(this._scroller.width()-this._stepSize*this._nrOfImages)/2})):(this._allowMovement=!0,this._midPositionId=Math.floor(this._nrVisibleImages/2)),this._resizeThumbs(),this._moveScroller(!1))}_resizeThumbs(){const t=parseFloat(a()(this._thumbContainers[0]).css("margin-left"))+parseFloat(a()(this._thumbContainers[0]).css("margin-right"));for(const e of this._thumbContainers)a()(e).css({width:`${this._stepSize-t}px`,height:`${this._stepSize-t}px`})}}class C{constructor(){this.toggleFullscreen=()=>(this._isFullscreen?($(this._slideshowContainer).appendTo(_),$(this._slideshowContainer).removeClass("width-100"),$(this._slideshowContainer).removeClass("flex-grow-1"),c(this._thumbviewContainer)&&($(this._thumbviewContainer).appendTo(_),$(this._thumbviewContainer).removeClass("flex-grow-0")),c(this._titleContainer)&&($(this._titleContainer).appendTo(_),$(this._titleContainer).removeClass("flex-grow-0")),$(".mibreit-fullscreen").remove(),this._isFullscreen=!1):(this._isFullscreen=!0,0===$(_).length&&this.createRegularWrapper(),$("body").append(`<div class="${".mibreit-fullscreen".substr(1)}"><div class='exit-fullscreen'></div></div>`),$(".exit-fullscreen").click(this.toggleFullscreen),$(this._slideshowContainer).appendTo(".mibreit-fullscreen"),$(this._slideshowContainer).addClass("width-100"),$(this._slideshowContainer).addClass("flex-grow-1"),c(this._thumbviewContainer)&&($(this._thumbviewContainer).appendTo(".mibreit-fullscreen"),$(this._thumbviewContainer).addClass("flex-grow-0")),c(this._titleContainer)&&($(this._titleContainer).appendTo(".mibreit-fullscreen"),$(this._titleContainer).addClass("flex-grow-0"))),this._fullscreenChangedCallback&&this._fullscreenChangedCallback(this._isFullscreen),this._isFullscreen),this._slideshowContainer=void 0,this._thumbviewContainer=void 0,this._isFullscreen=!1,this._fullscreenChangedCallback=void 0}init(t,e,i,s){return!!c(t)&&(this._slideshowContainer=t,this._thumbviewContainer=e,this._titleContainer=i,this._fullscreenChangedCallback=s,!0)}isFullscreen(){return this._isFullscreen}createRegularWrapper(){$(this._slideshowContainer).wrap(`<div class="${_.substr(1)}"></div>`),c(this._thumbviewContainer)&&$(this._thumbviewContainer).appendTo(_),c(this._titleContainer)&&$(this._titleContainer).appendTo(_)}}class w extends class{constructor(t){this.interval=3e3,this.zoom=void 0,this.scaleMode="SCALE_MODE_FITASPECT",this.preloadLeftNr=void 0,this.preloadRightNr=void 0,this.slideshowContainer=t}withInterval(t){return n(t)&&(this.interval=t),this}withZoom(t){return n(t)&&(this.zoom=t),this}withScaleMode(t){return d.includes(t)&&(this.scaleMode=t),this}withPreloaderLeftSize(t){return t>0&&(this.preloadLeftNr=t),this}withPreloaderRightSize(t){return t>0&&(this.preloadRightNr=t),this}buildSlideshow(){const t=this._validate();if(void 0!==this._validate())throw Error("buildSlideshow Error: "+t);return new b(this)}_validate(){if(!c(this.slideshowContainer))return"invalid slideshowContainer"}}{constructor(t){super(t),this.thumbviewContainer=void 0,this.titleContainer=void 0,this.allowFullscreen=!0}withThumbviewContainer(t){return r(t)&&(this.thumbviewContainer=t),this}withTitleContainer(t){return r(t)&&(this.titleContainer=t),this}withFullscreen(t){return"boolean"==typeof t&&(this.allowFullscreen=t),this}buildGallery(){const t=this._validate();if(!s(t))throw Error("buildGallery Error: "+t);return new v(this)}_validate(){return r(this._thumviewContainer)&&!a()(this._thumbviewContainer).length?"invalid thumbview class":r(this._titleContainer)&&!a()(this._titleContainer).length?"invalid title class":void 0}}class v{constructor(t){this._thumbClickCallback=t=>{this._mibreitSlideshow.showImage(t)},this._fullscreenEnterClickCallback=t=>{this._fullscreenController.toggleFullscreen(),t.stopPropagation()},this._scrollLeftCallback=()=>{this._mibreitScroller.scrollLeft(6)},this._scrollRightCallback=()=>{this._mibreitScroller.scrollRight(6)},this._mouseEnterCallback=()=>{this._handlePreviousNextButtonsOpacity(!0),this._handleFullscreenEnterButtonOpacity(!0)},this._mouseLeaveCallback=()=>{this._handlePreviousNextButtonsOpacity(!1),this._handleFullscreenEnterButtonOpacity(!1)},this._swipe=(t,e,i)=>{switch(t){case"SWIPE_LEFT":this._mibreitSlideshow.showNextImage();break;case"SWIPE_RIGHT":this._mibreitSlideshow.showPreviousImage();break;case"CLICK":this._containerClickedCallback(e,a()(this._slideshowContainer).width())}},this._imageChangedCallback=(t,e)=>{s(this._mibreitScroller)||this._mibreitScroller.scrollTo(t),s(this._titleContainer)||this._updateTitle(e),s(this._externalImageChangedCallback)||this._externalImageChangedCallback(t)},this._fullscreenChangedCallback=t=>{this._mibreitSlideshow.reinitSize(),this._mibreitScroller.reinitSize(),this._mibreitThumbManager.reinitSize(),t&&(a()(this._fullscreenEnterButton).stop(),a()(this._fullscreenEnterButton).css({opacity:0}))},this._containerClickedCallback=(t,e)=>{t<e/2?this._mibreitSlideshow.showPreviousImage():t>e/2&&this._mibreitSlideshow.showNextImage()},this._keyDownCallback=t=>{const e=t.which;37===e?this._mibreitSlideshow.showPreviousImage():39===e?this._mibreitSlideshow.showNextImage():27===e?this._fullscreenController&&this._fullscreenController.isFullscreen()&&this._fullscreenController.toggleFullscreen():70===e&&this._fullscreenController&&this._fullscreenController.toggleFullscreen()},this._mibreitSlideshow=t.buildSlideshow(),this._slideshowContainer=t.slideshowContainer,this._thumbviewContainer=t.thumbviewContainer,this._allowFullscreen=t.allowFullscreen,this._titleContainer=t.titleContainer,this._mibreitScroller=void 0,this._mibreitThumbManager=void 0,this._fullscreenController=void 0,this._fullscreenEnterButton=void 0,this._slideshowPrevious=void 0,this._slideshowNext=void 0,this._thumbviewPrevious=void 0,this._thumbviewNext=void 0,this._externalImageChangedCallback=void 0}init(){return!!this._mibreitSlideshow.isInitialized()&&(this._mibreitSlideshow.setImageChangedCallback(this._imageChangedCallback),this._allowFullscreen&&this._initFullscreen(),s(this._thumbviewContainer)||this._initThumbview(),s(this._titleContainer)||this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle()),this._initNavigationButtons(),this._initKeyAndMouseEvents(),!0)}startSlideshow(){this._mibreitSlideshow.start()}stopSlideshow(){this._mibreitSlideshow.stop()}setImageChangedCallback(t){this._externalImageChangedCallback=t}getCurrentImageTitle(){return this._mibreitSlideshow.getCurrentImageTitle()}getCurrentImageUrl(){return this._mibreitSlideshow.getCurrentImageUrl()}_initFullscreen(){a()(this._slideshowContainer).append(`<div class="${".mibreit-enter-fullscreen-button".substr(1)}"></div>`),this._fullscreenEnterButton=a()(`${this._slideshowContainer} .mibreit-enter-fullscreen-button`);const t=new C;t.init(this._slideshowContainer,this._thumbviewContainer,this._titleContainer,this._fullscreenChangedCallback)&&(this._fullscreenController=t)}_initNavigationButtons(){a()(this._slideshowContainer).append(`<div class="${".mibreit-slideshow-next".substr(1)}"></div>`),this._slideshowNext=a()(`${this._slideshowContainer} .mibreit-slideshow-next`),a()(this._slideshowContainer).append(`<div class="${".mibreit-slideshow-previous".substr(1)}"></div>`),this._slideshowPrevious=a()(`${this._slideshowContainer} .mibreit-slideshow-previous`)}_initThumbview(){this._mibreitScroller=new p,this._mibreitScroller.init(this._thumbviewContainer)&&(this._mibreitThumbManager=new m,this._mibreitThumbManager.init(this._thumbviewContainer,this._thumbClickCallback),a()(this._thumbviewContainer).prepend(`<div class="${".mibreit-thumbview-previous".substr(1)}"></div>`),this._thumbviewPrevious=a()(`${this._thumbviewContainer} .mibreit-thumbview-previous`),a()(this._thumbviewContainer).append(`<div class="${".mibreit-thumbview-next".substr(1)}"></div>`),this._thumbviewNext=a()(`${this._thumbviewContainer} .mibreit-thumbview-next`),a()(this._thumbviewPrevious).bind("click",this._scrollLeftCallback),a()(this._thumbviewNext).bind("click",this._scrollRightCallback))}_initKeyAndMouseEvents(){a()(this._slideshowContainer).bind("mouseenter",this._mouseEnterCallback),a()(this._slideshowContainer).bind("mouseleave",this._mouseLeaveCallback),o(this._slideshowContainer,["SWIPE_LEFT","SWIPE_RIGHT","CLICK"],this._swipe),this._fullscreenEnterButton&&(a()(this._fullscreenEnterButton).bind("click",this._fullscreenEnterClickCallback),a()(this._fullscreenEnterButton).bind("mouseup mousedown touchstart touchend",t=>{t.stopPropagation()})),a()(document).bind("keydown",this._keyDownCallback)}_updateTitle(t){a()(this._titleContainer).html("<h3>"+t+"</h3>")}_handleFullscreenEnterButtonOpacity(t){this._fullscreenEnterButton&&a()(this._fullscreenEnterButton).animate({opacity:t&&!this._fullscreenController.isFullscreen()?.4:0},400)}_handlePreviousNextButtonsOpacity(t){s(this._slideshowNext)||a()(this._slideshowNext).animate({opacity:t?.4:0},400),s(this._slideshowPrevious)||a()(this._slideshowPrevious).animate({opacity:t?.4:0},400)}}function I(t){if(s(t))throw Error("createSlideshow Error: No Config was provided");const e=new w(t.slideshowContainer).withInterval(t.interval).withZoom(t.zoom).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).buildSlideshow();if(!e.isInitialized())throw Error("createSlideshow Error: invalid html structure");return e}function f(t){if(s(t))throw Error("createGallery Error: No Config was provided");const e=new w(t.slideshowContainer).withInterval(t.interval).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).withFullscreen(t.allowFullscreen).withThumbviewContainer(t.thumbviewContainer).withTitleContainer(t.titleContainer).buildGallery();if(!e.init())throw Error("createGallery Error: invalid html structure");return e}i.d(e,"createSlideshow",(function(){return I})),i.d(e,"createGallery",(function(){return f})),i.d(e,"SCALE_MODE_STRETCH",(function(){return"SCALE_MODE_STRETCH"})),i.d(e,"SCALE_MODE_FITASPECT",(function(){return"SCALE_MODE_FITASPECT"})),i.d(e,"SCALE_MODE_NONE",(function(){return"SCALE_MODE_NONE"})),i.d(e,"SCALE_MODE_EXPAND",(function(){return"SCALE_MODE_EXPAND"}))},function(t,e){},,,,,function(t,e){},,function(t,e){}]);