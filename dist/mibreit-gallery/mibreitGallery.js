var mibreitGallery=function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=8)}([function(t,e){t.exports=jQuery},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/next-image.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/previous-image.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/next.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/previous.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/image-placeholder-transparent.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/exit-fullscreen.png"},function(t,e,i){t.exports=i.p+"mibreit-gallery/images/fullscreen.png"},function(t,e,i){"use strict";i.r(e);i(9),i(14),i(16),i(1),i(2),i(3),i(4),i(5),i(6),i(7);function s(t){return void 0===t||void 0===t}function r(t){return"string"==typeof t||t instanceof String}function n(t){return"number"==typeof t&&isFinite(t)}var h=i(0),a=i.n(h);const o="SWIPE_LEFT",l="SWIPE_RIGHT",_="SWIPE_UP",d="SWIPE_DOWN",u="CLICK",c=30,g=1e3;function m(t,e,i){let s=void 0,r=void 0;function n(t){return t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.pageX,y:t.pageY}}$(t).bind("mousedown touchstart",t=>{s=Date.now(),r=n(t),"touchstart"===t.type&&(e.includes(_)||e.includes(d))&&t.preventDefault()}),$(t).bind("mouseup touchend",h=>{if(s&&Date.now()-s<g){const a=n(h),g=function(t,e){const i=e.x-t.x,s=e.y-t.y,r=[];return i>c?r.push(l):i<-c&&r.push(o),s>c?r.push(d):s<-c&&r.push(_),r}(r,a);let m=!1,p=!1;for(let t of g)e.includes(t)&&(i(t),m=!0);g.length||(i(u,a.x-$(t).offset().left,a.y-$(t).offset().top),p=!0),(m||p)&&(h.cancelable&&"touchend"===h.type&&h.preventDefault(),h.stopPropagation()),s=void 0}})}function p(t){return r(t)&&$(t).length>0}const w=10,b=".mibreit-imageElement",C=".mibreit-thumbs",v=".mibreit-thumbs-scroller",f=".mibreit-thumbElement",I=".mibreit-regular",x=".mibreit-fullscreen",S=".mibreit-enter-fullscreen-button",y=".mibreit-slideshow-next",E=".mibreit-slideshow-previous",P=".mibreit-thumbview-next",k=".mibreit-thumbview-previous",T="data-src",N="data-title",A="title",W="SCALE_MODE_STRETCH",M="SCALE_MODE_EXPAND",F="SCALE_MODE_FITASPECT",O="SCALE_MODE_NONE",L=[W,M,F,O];class z{init(t,e){let i=!1;if(p(t)){const r=a()(`${t} ${f}`),h=a()(`${t} ${f} > img`);if(r.length>0&&r.length===h.length){const o=r.innerWidth(),l=r.innerHeight();let _=a()(t).css("z-index");n(_)||(_=w),this._elevateThumbContainers(t,_),s(e)||this._setupClickEvents(r,e),this._prepareThumbview(h,o,l),i=!0}}return i}_elevateThumbContainers(t,e){a()(t).css({"z-index":w})}_setupClickEvents(t,e){for(let i=0;i<t.length;i++)a()(t[i]).bind("click",{id:i},function(t){e(t.data.id)})}_prepareThumbview(t,e,i){for(let s=0;s<t.length;s++)this._prepareThumb(t[s],e,i)}_prepareThumb(t,e,i){t.hasAttribute("width")&&t.hasAttribute("height")&&(this._scaleThumb(t,e,i),this._positionThumb(t,e,i)),t.hasAttribute(T)&&(t.onload=function(){this.removeAttribute(T)},t.setAttribute("src",t.getAttribute(T))),a()(t).contextmenu(function(){return!1})}_scaleThumb(t,e,i){let s=parseInt(t.getAttribute("width")),r=parseInt(t.getAttribute("height"));let n=1;r*=n=e/i>s/r?e/s:i/r,s*=n,t.setAttribute("width",s),t.setAttribute("height",r)}_positionThumb(t,e,i){const s=parseInt(t.getAttribute("width")),r=parseInt(t.getAttribute("height")),n=(s+e)/2-s,h=(r+i)/2-r;a()(t).css({marginLeft:n}),a()(t).css({marginTop:h})}}const R=7,D=3;class B{constructor(t,e,i,r){this._currentIndex=e,this._imageWrappers=t,this._loadedCount=0,this._preloadLeftNr=D,s(i)||(this._preloadLeftNr=i),this._preloadRightNr=R,s(r)||(this._preloadRightNr=r),this._moveWindow()}setCurrentIndex(t){this._currentIndex!=t&&(this._currentIndex=t,this._moveWindow())}loadImage(t,e){this._loadedCount<this._imageWrappers.length&&t>=0&&t<this._imageWrappers.length&&this._imageWrappers[t].loadImage(e)&&this._loadedCount++}_moveWindow(){if(this._loadedCount<this._imageWrappers.length){let t=this._currentIndex-this._preloadLeftNr,e=this._currentIndex+this._preloadRightNr;this._loadImages(this._currentIndex,e<this._imageWrappers.length?e:this._imageWrappers.length),this._loadImages(t>=0?t:0,this._currentIndex),t<0&&(t=this._imageWrappers.length+t,this._loadImages(t,this._imageWrappers.length)),e>=this._imageWrappers.length&&(e-=this._imageWrappers.length,this._loadImages(0,e))}}_loadImages(t,e){for(let i=t;i<e&&i<this._imageWrappers.length;i++)this._loadImage(this._imageWrappers[i])}_loadImage(t){t.loadImage()&&this._loadedCount++}}class V{constructor(t){if(this._image=t,this._originalWidth=parseInt(this._image.getAttribute("width")),this._originalHeight=parseInt(this._image.getAttribute("height")),this._title="",$(this._image).wrap('<div class="mibreit-center-box"></div>'),$(this._image).on("dragstart",function(){return!1}),$(this._image).contextmenu(function(){return!1}),this._image.hasAttribute(A)){const t=this._image.getAttribute(A);this._image.removeAttribute(A),this._image.setAttribute(N,t)}this._title=this._image.getAttribute(N)}loadImage(t){return!this.wasLoaded()&&(s(t)||(this._image.onload=(()=>{t()})),this._image.setAttribute("src",this._image.getAttribute(T)),this._image.removeAttribute(T),!0)}wasLoaded(){return!this._image.hasAttribute(T)}getTitle(){return this._title}applyScaleMode(t,e,i){switch(i){case W:$(this._image).css({width:"100%",height:"100%"});break;case M:t/e>this._originalWidth/this._originalHeight?$(this._image).css({width:"100%",height:"auto"}):$(this._image).css({width:"auto",height:"100%"});break;case F:t/e>this._originalWidth/this._originalHeight?e<=this._originalHeight?$(this._image).css({width:"auto",height:"100%"}):$(this._image).css({width:"auto",height:"auto"}):t<=this._originalWidth?$(this._image).css({width:"100%",height:"auto"}):$(this._image).css({width:"auto",height:"auto"});break;case O:default:$(this._image).css({width:"auto",height:"auto"})}return this._image}}const H=800,j=3e3;class G{constructor(t){this.interval=j,this.scaleMode=F,this.preloadLeftNr=void 0,this.preloadRightNr=void 0,this.slideshowContainer=t}withInterval(t){return n(t)&&(this.interval=t),this}withScaleMode(t){return L.includes(t)&&(this.scaleMode=t),this}withPreloaderLeftSize(t){return t>0&&(this.preloadLeftNr=t),this}withPreloaderRightSize(t){return t>0&&(this.preloadRightNr=t),this}buildSlideshow(){const t=this._validate();if(void 0!==this._validate())throw Error("buildSlideshow Error: "+t);return new X(this)}_validate(){if(!p(this.slideshowContainer))return"invalid slideshowContainer"}}class X{constructor(t){this.showImage=(t=>{this._isValidIndex(t)&&t!=this._currentIndex&&(this._imageWrappers[t].wasLoaded()?this._changeCurrentImage(t):this._preloader.loadImage(t,()=>{this._changeCurrentImage(t)}))}),this.showNextImage=(()=>{var t=this._currentIndex<this._imageContainers.length-1?this._currentIndex+1:0;this.showImage(t)}),this.showPreviousImage=(()=>{var t=this._currentIndex>0?this._currentIndex-1:this._imageContainers.length-1;this.showImage(t)}),this._slideshowContainer=t.slideshowContainer,this._imageScaleMode=t.scaleMode,this._interval=t.interval,this._currentIndex=0,this._imageContainers=[],this._imageWrappers=[],this._intervalId=-1,this._baseZIndex=w,this._imageChangedCallback=void 0,this._preloader=void 0,this._isInitialized=this._init(t.preloaderLeftNr,t.preloaderRightNr)}isInitialized(){return this._isInitialized}reinitSize(){s(this._imageWrappers[this._currentIndex])||this._imageWrappers[this._currentIndex].applyScaleMode(a()(this._slideshowContainer).width(),a()(this._slideshowContainer).height(),this._imageScaleMode)}start(){this._isInitialized&&(this._intervalId=setInterval(this.showNextImage,this._interval))}stop(){-1!==this._intervalId&&(clearInterval(this._intervalId),this._intervalId=-1)}setImageChangedCallback(t){this._imageChangedCallback=t}getCurrentImageTitle(){return this._isValidIndex(this._currentIndex)?this._imageWrappers[this._currentIndex].getTitle():""}_init(t,e){this._imageContainers=a()(`${this._slideshowContainer} ${b}`).has("img");const i=a()(`${this._slideshowContainer} ${b} > img`);return this._imageContainers.length>0&&this._imageContainers.length===i.length&&(this._wrapImages(i),this._prepareContainers(),this.reinitSize(),a()(window).resize(()=>{this.reinitSize()}),this._preloader=new B(this._imageWrappers,this._currentIndex,t,e),!0)}_isValidIndex(t){return t>=0&&t<this._imageContainers.length}_wrapImages(t){for(let e=0;e<t.length;e++)this._imageWrappers.push(new V(t[e]))}_prepareContainers(){a()(this._imageContainers).css({opacity:0}),a()(this._imageContainers[this._currentIndex]).css({opacity:1,"z-index":this._baseZIndex})}_changeCurrentImage(t){a()(this._imageContainers[t]).animate({opacity:1},H),a()(this._imageContainers[this._currentIndex]).animate({opacity:0},H),a()(this._imageContainers[t]).css({"z-index":this._baseZIndex+1}),a()(this._imageContainers[this._currentIndex]).css({"z-index":this._baseZIndex}),this._currentIndex=t,this.reinitSize(),void 0!==this._imageChangedCallback&&this._imageChangedCallback(this._currentIndex,this.getCurrentImageTitle()),this._preloader.setCurrentIndex(this._currentIndex)}}class Z{constructor(){this._allowMovement=!1,this._nrOfImages=0,this._nrVisibleImages=0,this._midPositionId=0,this._startPositionId=0,this._stepSize=!1}init(t){let e=!1;if(p(t)){const i=a()(`${t} ${f}`);i.length>0&&(i.wrapAll(`<div class="${v.substr(1)}" />`),a()(v).wrap(`<div class="${C.substr(1)}" />`),"flex"===a()(C).css("display")&&a()(C).css({display:"block"}),this._scroller=a()(`${t} ${v}`),this._stepSize=i.outerWidth(!0),this._nrOfImages=i.length,this._nrVisibleImages=Math.floor(this._scroller.width()/this._stepSize),this._scroller.css({width:this._nrVisibleImages*this._stepSize}),this._nrOfImages<=this._nrVisibleImages?(this._allowMovement=!1,this._scroller.css({left:(this._scroller.width()-this._stepSize*this._nrOfImages)/2})):(this._allowMovement=!0,this._midPositionId=Math.floor(this._nrVisibleImages/2)),e=!0)}return e}scrollTo(t){if(this._allowMovement){var e=t-this._midPositionId;e<0?this._startPositionId=0:e<=this._nrOfImages-this._nrVisibleImages?this._startPositionId=e:this._startPositionId=this._nrOfImages-this._nrVisibleImages,this._moveScroller()}}scrollRight(t){if(this._allowMovement){var e=this._startPositionId+t,i=this._nrOfImages-this._nrVisibleImages;this._startPositionId==i?this._startPositionId=0:this._startPositionId=e>i?i:e,this._moveScroller()}}scrollLeft(t){if(this._allowMovement){var e=this._startPositionId-t;0==this._startPositionId?this._startPositionId=this._nrOfImages-this._nrVisibleImages:this._startPositionId=e<0?0:e,this._moveScroller()}}_moveScroller(){!1!==this._scroller&&this._scroller.animate({left:-this._startPositionId*this._stepSize},800)}}class K{constructor(){this.toggleFullscreen=(()=>(this._isFullscreen?($(this._slideshowContainer).appendTo(I),$(this._slideshowContainer).css({width:this._oldWidth,height:this._oldHeight}),p(this._thumbviewContainer)&&$(this._thumbviewContainer).appendTo(I),p(this._titleContainer)&&$(this._titleContainer).appendTo(I),$(x).remove(),this._isFullscreen=!1):(0===$(I).length&&this.createRegularWrapper(),this._oldWidth=$(this._slideshowContainer).css("width"),this._oldHeight=$(this._slideshowContainer).css("height"),$("body").append(`<div class="${x.substr(1)}"><div class='exit-fullscreen'></div></div>`),$(".exit-fullscreen").click(this.toggleFullscreen),$(this._slideshowContainer).appendTo(x),$(this._slideshowContainer).css({width:"100%","flex-grow":1}),p(this._thumbviewContainer)&&($(this._thumbviewContainer).appendTo(x),$(this._thumbviewContainer).css({"flex-grow":0})),p(this._titleContainer)&&($(this._titleContainer).appendTo(x),$(this._titleContainer).css({"flex-grow":0})),this._isFullscreen=!0),this._fullscreenChangedCallback&&this._fullscreenChangedCallback(this._isFullscreen),this._isFullscreen)),this._slideshowContainer=void 0,this._thumbviewContainer=void 0,this._isFullscreen=!1,this._fullscreenChangedCallback=void 0}init(t,e,i,s){return!!p(t)&&(this._slideshowContainer=t,this._thumbviewContainer=e,this._titleContainer=i,this._fullscreenChangedCallback=s,!0)}isFullscreen(){return this._isFullscreen}createRegularWrapper(){$(this._slideshowContainer).wrap(`<div class="${I.substr(1)}"></div>`),p(this._thumbviewContainer)&&$(this._thumbviewContainer).appendTo(I),p(this._titleContainer)&&$(this._titleContainer).appendTo(I)}}const Y=400;class Q extends G{constructor(t){super(t),this.thumbviewContainer=void 0,this.titleContainer=void 0,this.allowFullscreen=!0}withThumbviewContainer(t){return r(t)&&(this.thumbviewContainer=t),this}withTitleContainer(t){return r(t)&&(this.titleContainer=t),this}withFullscreen(t){return"boolean"==typeof t&&(this.allowFullscreen=t),this}buildGallery(){const t=this._validate();if(void 0!==this._validate())throw Error("buildGallery Error: "+t);return new U(this)}_validate(){return r(this._thumviewContainer)&&!a()(this._thumbviewContainer).length?"invalid thumbview class":r(this._titleContainer)&&!a()(this._titleContainer).length?"invalid title class":void 0}}class U{constructor(t){this._thumbClickCallback=(t=>{this._mibreitSlideshow.showImage(t)}),this._fullscreenEnterClickCallback=(t=>{this._fullscreenController.toggleFullscreen(),t.stopPropagation()}),this._scrollLeftCallback=(()=>{this._mibreitScroller.scrollLeft(6)}),this._scrollRightCallback=(()=>{this._mibreitScroller.scrollRight(6)}),this._mouseEnterCallback=(()=>{this._handlePreviousNextButtonsOpacity(!0),this._handleFullscreenEnterButtonOpacity(!0)}),this._mouseLeaveCallback=(()=>{this._handlePreviousNextButtonsOpacity(!1),this._handleFullscreenEnterButtonOpacity(!1)}),this._swipe=((t,e,i)=>{switch(t){case o:this._mibreitSlideshow.showNextImage();break;case l:this._mibreitSlideshow.showPreviousImage();break;case u:this._containerClickedCallback(e,a()(this._slideshowContainer).width())}}),this._imageChangedCallback=((t,e)=>{void 0!==this._mibreitScroller&&this._mibreitScroller.scrollTo(t),void 0!==this._titleContainer&&this._updateTitle(e)}),this._fullscreenChangedCallback=(t=>{this._mibreitSlideshow.reinitSize(),t&&a()(this._fullscreenEnterButton).css({opacity:0})}),this._containerClickedCallback=((t,e)=>{t<e/2?this._mibreitSlideshow.showPreviousImage():t>e/2&&this._mibreitSlideshow.showNextImage()}),this._keyDownCallback=(t=>{const e=t.which;37===e?this._mibreitSlideshow.showPreviousImage():39===e?this._mibreitSlideshow.showNextImage():27===e?this._fullscreenController&&this._fullscreenController.isFullscreen()&&this._fullscreenController.toggleFullscreen():70===e&&this._fullscreenController&&this._fullscreenController.toggleFullscreen()}),this._mibreitSlideshow=t.buildSlideshow(),this._slideshowContainer=t.slideshowContainer,this._thumbviewContainer=t.thumbviewContainer,this._allowFullscreen=t.allowFullscreen,this._titleContainer=t.titleContainer,this._mibreitScroller=void 0,this._fullscreenController=void 0,this._fullscreenEnterButton=void 0,this._slideshowPrevious=void 0,this._slideshowNext=void 0,this._thumbviewPrevious=void 0,this._thumbviewNext=void 0}init(){return!!this._mibreitSlideshow.isInitialized()&&(this._mibreitSlideshow.setImageChangedCallback(this._imageChangedCallback),this._allowFullscreen&&this._initFullscreen(),void 0!==this._thumbviewContainer&&this._initThumbview(),void 0!==this._titleContainer&&this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle()),this._initNavigationButtons(),this._initKeyAndMouseEvents(),!0)}startSlideshow(){this._mibreitSlideshow.start()}stopSlideshow(){this._mibreitSlideshow.stop()}_initFullscreen(){a()(this._slideshowContainer).append(`<div class="${S.substr(1)}"></div>`),this._fullscreenEnterButton=a()(`${this._slideshowContainer} ${S}`);const t=new K;t.init(this._slideshowContainer,this._thumbviewContainer,this._titleContainer,this._fullscreenChangedCallback)&&(this._fullscreenController=t)}_initNavigationButtons(){a()(this._slideshowContainer).append(`<div class="${y.substr(1)}"></div>`),this._slideshowNext=a()(`${this._slideshowContainer} ${y}`),a()(this._slideshowContainer).append(`<div class="${E.substr(1)}"></div>`),this._slideshowPrevious=a()(`${this._slideshowContainer} ${E}`)}_initThumbview(){(new z).init(this._thumbviewContainer,this._thumbClickCallback)&&(this._mibreitScroller=new Z,this._mibreitScroller.init(this._thumbviewContainer)&&(a()(this._thumbviewContainer).prepend(`<div class="${k.substr(1)}"></div>`),this._thumbviewPrevious=a()(`${this._thumbviewContainer} ${k}`),a()(this._thumbviewContainer).append(`<div class="${P.substr(1)}"></div>`),this._thumbviewNext=a()(`${this._thumbviewContainer} ${P}`),a()(this._thumbviewPrevious).bind("click",this._scrollLeftCallback),a()(this._thumbviewNext).bind("click",this._scrollRightCallback)))}_initKeyAndMouseEvents(){a()(this._slideshowContainer).bind("mouseenter",this._mouseEnterCallback),a()(this._slideshowContainer).bind("mouseleave",this._mouseLeaveCallback),m(this._slideshowContainer,[o,l,u],this._swipe),this._fullscreenEnterButton&&(a()(this._fullscreenEnterButton).bind("click",this._fullscreenEnterClickCallback),a()(this._fullscreenEnterButton).bind("mouseup mousedown touchstart touchend",t=>{t.stopPropagation()})),a()(document).bind("keydown",this._keyDownCallback)}_updateTitle(t){a()(this._titleContainer).html("<h3>"+t+"</h3>")}_handleFullscreenEnterButtonOpacity(t){this._fullscreenEnterButton&&a()(this._fullscreenEnterButton).animate({opacity:t&&!this._fullscreenController.isFullscreen()?.4:0},Y)}_handlePreviousNextButtonsOpacity(t){void 0!==this._slideshowNext&&a()(this._slideshowNext).animate({opacity:t?.4:0},Y),void 0!==this._slideshowPrevious&&a()(this._slideshowPrevious).animate({opacity:t?.4:0},Y)}}function q(t){if(s(t))throw Error("createSlideshow Error: No Config was provided");const e=new Q(t.slideshowContainer).withInterval(t.interval).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).buildSlideshow();if(!e.isInitialized())throw Error("createSlideshow Error: invalid html structure");return e}function J(t){if(s(t))throw Error("createGallery Error: No Config was provided");const e=new Q(t.slideshowContainer).withInterval(t.interval).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).withFullscreen(t.allowFullscreen).withThumbviewContainer(t.thumbviewContainer).withTitleContainer(t.titleContainer).buildGallery();if(!e.init())throw Error("createGallery Error: invalid html structure");return e}i.d(e,"createSlideshow",function(){return q}),i.d(e,"createGallery",function(){return J}),i.d(e,"SCALE_MODE_STRETCH",function(){return W}),i.d(e,"SCALE_MODE_FITASPECT",function(){return F}),i.d(e,"SCALE_MODE_NONE",function(){return O}),i.d(e,"SCALE_MODE_EXPAND",function(){return M})},function(t,e){},,,,,function(t,e){},,function(t,e){}]);