var mibreitGallery=function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=8)}([function(t,i){t.exports=jQuery},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/next-image.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/previous-image.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/next.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/previous.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/image-placeholder-transparent.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/exit-fullscreen.png"},function(t,i,e){t.exports=e.p+"mibreit-gallery/images/fullscreen.png"},function(t,i,e){"use strict";e.r(i);e(9),e(14),e(16),e(1),e(2),e(3),e(4),e(5),e(6),e(7);function s(t){return void 0===t||void 0===t}function r(t){return"string"==typeof t||t instanceof String}var n=e(0),h=e.n(n);const a="SWIPE_LEFT",o="SWIPE_RIGHT",l="SWIPE_UP",_="SWIPE_DOWN",d="CLICK",c=50,u=700;function g(t,i,e){let s=void 0,r=void 0,n=!1;const h=()=>{n=!0};function g(t){return t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.pageX,y:t.pageY}}$(t).bind("mousedown touchstart",t=>{s=Date.now(),r=g(t),"touchstart"===t.type&&(i.includes(l)||i.includes(_))&&t.preventDefault(),n=!1,$(window).bind("scroll",h)}),$(t).bind("mouseup touchend",m=>{if(s&&Date.now()-s<u){const h=g(m),u=function(t,i){const e=i.x-t.x,s=i.y-t.y,r=[];return e>c?r.push(o):e<-c&&r.push(a),s>c?r.push(_):s<-c&&r.push(l),r}(r,h);let p=!1,w=!1;for(let t of u)i.includes(t)&&(e(t),p=!0);u.length||n||(e(d,h.x-$(t).offset().left,h.y-$(t).offset().top),w=!0),(p||w)&&(m.cancelable&&"touchend"===m.type&&m.preventDefault(),m.stopPropagation()),s=void 0}$(window).unbind("scroll",h)})}const m=10,p=".mibreit-imageElement",w=".mibreit-thumbs",b=".mibreit-thumbs-scroller",C=".mibreit-thumbElement",v=".mibreit-regular",f=".mibreit-fullscreen",I=".mibreit-enter-fullscreen-button",x=".mibreit-slideshow-next",S=".mibreit-slideshow-previous",y=".mibreit-thumbview-next",E=".mibreit-thumbview-previous",P="data-src",k="data-title",T="title",N="SCALE_MODE_STRETCH",L="SCALE_MODE_EXPAND",M="SCALE_MODE_FITASPECT",W="SCALE_MODE_NONE",F=[N,L,M,W],A="IMAGE_INACTIVE",O="IMAGE_LOADING",z="IMAGE_LOADED";class D{constructor(t,i){if(this._image=t,this._originalWidth=parseInt(this._image.getAttribute("width")),this._originalHeight=parseInt(this._image.getAttribute("height")),i&&$(this._image).css({maxWidth:`${this._originalWidth}px`,maxHeight:`${this._originalHeight}px`}),this._onLoadCallbackInternal=void 0,this._state=this._image.hasAttribute("data-src")?A:z,$(this._image).wrap('<div class="mibreit-center-box"></div>'),$(this._image).on("dragstart",function(){return!1}),$(this._image).contextmenu(function(){return!1}),this._image.hasAttribute(T)){const t=this._image.getAttribute(T);this._image.removeAttribute(T),this._image.setAttribute(k,t)}this._title=this._image.getAttribute(k)}loadImage(){return new Promise((t,i)=>{this._isInactive()?(this._image.onload=(()=>{this._image.removeAttribute(P),this._state=z,this._onLoadCallbackInternal&&this._onLoadCallbackInternal(),t()}),this._state=O,this._image.setAttribute("src",this._image.getAttribute(P))):i(this.wasLoaded())})}wasLoaded(){return this._state===z}getTitle(){return this._title}applyScaleMode(t,i,e){switch(e){case N:this._applyStretch();break;case L:this._applyExpand(t,i);break;case M:this._applyFitAspect(t,i);break;case W:default:this._applyNone(t,i)}}_applyStretch(){$(this._image).css({width:"100%",height:"100%"})}_applyExpand(t,i){const e=this._originalWidth/this._originalHeight;t/i>e?$(this._image).css({width:`${t}px`,height:`${t/e}px`}):$(this._image).css({width:`${i*e}px`,height:`${i}px`}),this._centerImage(t,i)}_applyFitAspect(t,i){t/i>this._originalWidth/this._originalHeight?i<=this._originalHeight?$(this._image).css({width:"auto",height:"100%"}):$(this._image).css({width:"auto",height:"auto"}):t<=this._originalWidth?$(this._image).css({width:"100%",height:"auto"}):$(this._image).css({width:"auto",height:"auto"}),this._resetImagePosition()}_applyNone(t,i){$(this._image).css({width:`${this._originalWidth}px`,height:`${this._originalHeight}px`}),this._centerImage(t,i)}_resetImagePosition(){$(this._image).css({marginLeft:"auto"}),$(this._image).css({marginTop:"auto"})}_centerImage(t,i){if(this._state!=z)this._onLoadCallbackInternal=(()=>{this._centerImage(t,i)});else{const e=$(this._image).width(),s=$(this._image).height(),r=(e+t)/2-e,n=(s+i)/2-s;$(this._image).css({marginLeft:r}),$(this._image).css({marginTop:n})}}_isInactive(){return this._state===A}}function R(t){return r(t)&&$(t).length>0}class B{init(t,i){let e=!1;if(R(t)){const r=h()(`${t} ${C}`),n=h()(`${t} ${C} > img`);if(r.length>0&&r.length===n.length){const h=this._wrapThumbs(n);this._ensureThumbContainerZIndex(t),s(i)||this._setupClickEvents(r,i),this._setScaleModeForThumbs(r,h),this._preloadThumbs(h),e=!0}}return e}_wrapThumbs(t){let i=[];for(let e=0;e<t.length;e++)i.push(new D(t[e]));return i}_ensureThumbContainerZIndex(t){h()(t).has("z-index")||h()(t).css({"z-index":m})}_setupClickEvents(t,i){for(let e=0;e<t.length;e++)h()(t[e]).bind("click",{id:e},function(t){i(t.data.id)})}_setScaleModeForThumbs(t,i){const e=t.innerWidth(),s=t.innerHeight();for(const t of i)t.applyScaleMode(e,s,L)}_preloadThumbs(t){for(const i of t)i.loadImage().catch(()=>{})}}const H=7,V=3;class G{constructor(t,i,e,r){this._currentIndex=i,this._imageWrappers=t,this._loadedCount=this._getLoadedCount(t),this._preloadLeftNr=V,s(e)||(this._preloadLeftNr=e),this._preloadRightNr=H,s(r)||(this._preloadRightNr=r)}setCurrentIndex(t){this._currentIndex!=t&&(this._currentIndex=t,this._moveWindow())}loadImage(t){return new Promise((i,e)=>{t>=0&&t<this._imageWrappers.length?this._imageWrappers[t].loadImage().then(()=>{this._loadedCount++,i(!0)}).catch(t=>{i(t)}):e()})}_moveWindow(){if(this._loadedCount<this._imageWrappers.length){let t=this._currentIndex-this._preloadLeftNr,i=this._currentIndex+this._preloadRightNr;this._loadImages(this._currentIndex,i<this._imageWrappers.length?i:this._imageWrappers.length),this._loadImages(t>=0?t:0,this._currentIndex),t<0&&(t=this._imageWrappers.length+t,this._loadImages(t,this._imageWrappers.length)),i>=this._imageWrappers.length&&(i-=this._imageWrappers.length,this._loadImages(0,i))}}_loadImages(t,i){for(let e=t;e<i&&e<this._imageWrappers.length;e++)this.loadImage(e)}_getLoadedCount(t){let i=0;for(const e of t)e.wasLoaded()&&i++;return i}}const j=800,Z=3e3;class X{constructor(t){this.interval=Z,this.scaleMode=M,this.preloadLeftNr=void 0,this.preloadRightNr=void 0,this.slideshowContainer=t}withInterval(t){var i;return"number"==typeof(i=t)&&isFinite(i)&&(this.interval=t),this}withScaleMode(t){return F.includes(t)&&(this.scaleMode=t),this}withPreloaderLeftSize(t){return t>0&&(this.preloadLeftNr=t),this}withPreloaderRightSize(t){return t>0&&(this.preloadRightNr=t),this}buildSlideshow(){const t=this._validate();if(void 0!==this._validate())throw Error("buildSlideshow Error: "+t);return new K(this)}_validate(){if(!R(this.slideshowContainer))return"invalid slideshowContainer"}}class K{constructor(t){this.showImage=(t=>{this._isValidIndex(t)&&(this._imageWrappers[t].wasLoaded()?this._changeCurrentImage(t):this._preloader.loadImage(t).then(i=>{this._preloader.setCurrentIndex(this._currentIndex),this._changeCurrentImage(t)}).catch(()=>{throw new Error("Error in Slideshow#showImage")}))}),this.showNextImage=(()=>{var t=this._currentIndex<this._imageContainers.length-1?this._currentIndex+1:0;this.showImage(t)}),this.showPreviousImage=(()=>{var t=this._currentIndex>0?this._currentIndex-1:this._imageContainers.length-1;this.showImage(t)}),this._slideshowContainer=t.slideshowContainer,this._imageScaleMode=t.scaleMode,this._interval=t.interval,this._currentIndex=-1,this._imageContainers=[],this._imageWrappers=[],this._intervalId=-1,this._baseZIndex=m,this._imageChangedCallback=void 0,this._preloader=void 0,this._isInitialized=this._init(t.preloaderLeftNr,t.preloaderRightNr)}isInitialized(){return this._isInitialized}reinitSize(){s(this._imageWrappers[this._currentIndex])||this._imageWrappers[this._currentIndex].applyScaleMode(h()(this._slideshowContainer).width(),h()(this._slideshowContainer).height(),this._imageScaleMode)}start(){this._isInitialized&&(this._intervalId=setInterval(this.showNextImage,this._interval))}stop(){-1!==this._intervalId&&(clearInterval(this._intervalId),this._intervalId=-1)}setImageChangedCallback(t){this._imageChangedCallback=t}getCurrentImageTitle(){return this._isValidIndex(this._currentIndex)?this._imageWrappers[this._currentIndex].getTitle():""}_init(t,i){this._imageContainers=h()(`${this._slideshowContainer} ${p}`).has("img");const e=h()(`${this._slideshowContainer} ${p} > img`);return this._imageContainers.length>0&&this._imageContainers.length===e.length&&(this._wrapImages(e),this._prepareContainers(),this.reinitSize(),h()(window).resize(()=>{this.reinitSize()}),this._preloader=new G(this._imageWrappers,this._currentIndex,t,i),this.showImage(0),!0)}_isValidIndex(t){return t>=0&&t<this._imageContainers.length}_wrapImages(t){for(let i=0;i<t.length;i++)this._imageWrappers.push(new D(t[i],!0))}_prepareContainers(){h()(this._imageContainers).css({opacity:0}),h()(this._imageContainers[this._currentIndex]).css({opacity:1,"z-index":this._baseZIndex})}_changeCurrentImage(t){t!=this._currentIndex&&(h()(this._imageContainers[t]).animate({opacity:1},j),h()(this._imageContainers[this._currentIndex]).animate({opacity:0},j),h()(this._imageContainers[t]).css({"z-index":this._baseZIndex+1}),h()(this._imageContainers[this._currentIndex]).css({"z-index":this._baseZIndex}),this._currentIndex=t,this.reinitSize(),void 0!==this._imageChangedCallback&&this._imageChangedCallback(this._currentIndex,this.getCurrentImageTitle()))}}class Y{constructor(){this._allowMovement=!1,this._nrOfImages=0,this._nrVisibleImages=0,this._midPositionId=0,this._startPositionId=0,this._stepSize=1}init(t){let i=!1;if(R(t)){const e=h()(`${t} ${C}`);e.length>0&&(e.wrapAll(`<div class="${b.substr(1)}" />`),h()(b).wrap(`<div class="${w.substr(1)}" />`),"flex"===h()(w).css("display")&&h()(w).css({display:"block"}),this._scroller=h()(`${t} ${b}`),this._stepSize=e.outerWidth(!0),this._nrOfImages=e.length,this._nrVisibleImages=Math.floor(this._scroller.width()/this._stepSize),this._scroller.css({width:this._nrVisibleImages*this._stepSize}),this._nrOfImages<=this._nrVisibleImages?(this._allowMovement=!1,this._scroller.css({left:(this._scroller.width()-this._stepSize*this._nrOfImages)/2})):(this._allowMovement=!0,this._midPositionId=Math.floor(this._nrVisibleImages/2)),i=!0)}return i}scrollTo(t){if(this._allowMovement){var i=t-this._midPositionId;i<0?this._startPositionId=0:i<=this._nrOfImages-this._nrVisibleImages?this._startPositionId=i:this._startPositionId=this._nrOfImages-this._nrVisibleImages,this._moveScroller()}}scrollRight(t){if(this._allowMovement){var i=this._startPositionId+t,e=this._nrOfImages-this._nrVisibleImages;this._startPositionId==e?this._startPositionId=0:this._startPositionId=i>e?e:i,this._moveScroller()}}scrollLeft(t){if(this._allowMovement){var i=this._startPositionId-t;0==this._startPositionId?this._startPositionId=this._nrOfImages-this._nrVisibleImages:this._startPositionId=i<0?0:i,this._moveScroller()}}_moveScroller(){!1!==this._scroller&&this._scroller.animate({left:-this._startPositionId*this._stepSize},800)}}class Q{constructor(){this.toggleFullscreen=(()=>(this._isFullscreen?($(this._slideshowContainer).appendTo(v),$(this._slideshowContainer).css({width:this._oldWidth,height:this._oldHeight}),R(this._thumbviewContainer)&&$(this._thumbviewContainer).appendTo(v),R(this._titleContainer)&&$(this._titleContainer).appendTo(v),$(f).remove(),this._isFullscreen=!1):(0===$(v).length&&this.createRegularWrapper(),this._oldWidth=$(this._slideshowContainer).css("width"),this._oldHeight=$(this._slideshowContainer).css("height"),$("body").append(`<div class="${f.substr(1)}"><div class='exit-fullscreen'></div></div>`),$(".exit-fullscreen").click(this.toggleFullscreen),$(this._slideshowContainer).appendTo(f),$(this._slideshowContainer).css({width:"100%","flex-grow":1}),R(this._thumbviewContainer)&&($(this._thumbviewContainer).appendTo(f),$(this._thumbviewContainer).css({"flex-grow":0})),R(this._titleContainer)&&($(this._titleContainer).appendTo(f),$(this._titleContainer).css({"flex-grow":0})),this._isFullscreen=!0),this._fullscreenChangedCallback&&this._fullscreenChangedCallback(this._isFullscreen),this._isFullscreen)),this._slideshowContainer=void 0,this._thumbviewContainer=void 0,this._isFullscreen=!1,this._fullscreenChangedCallback=void 0}init(t,i,e,s){return!!R(t)&&(this._slideshowContainer=t,this._thumbviewContainer=i,this._titleContainer=e,this._fullscreenChangedCallback=s,!0)}isFullscreen(){return this._isFullscreen}createRegularWrapper(){$(this._slideshowContainer).wrap(`<div class="${v.substr(1)}"></div>`),R(this._thumbviewContainer)&&$(this._thumbviewContainer).appendTo(v),R(this._titleContainer)&&$(this._titleContainer).appendTo(v)}}const U=400;class q extends X{constructor(t){super(t),this.thumbviewContainer=void 0,this.titleContainer=void 0,this.allowFullscreen=!0}withThumbviewContainer(t){return r(t)&&(this.thumbviewContainer=t),this}withTitleContainer(t){return r(t)&&(this.titleContainer=t),this}withFullscreen(t){return"boolean"==typeof t&&(this.allowFullscreen=t),this}buildGallery(){const t=this._validate();if(void 0!==this._validate())throw Error("buildGallery Error: "+t);return new J(this)}_validate(){return r(this._thumviewContainer)&&!h()(this._thumbviewContainer).length?"invalid thumbview class":r(this._titleContainer)&&!h()(this._titleContainer).length?"invalid title class":void 0}}class J{constructor(t){this._thumbClickCallback=(t=>{this._mibreitSlideshow.showImage(t)}),this._fullscreenEnterClickCallback=(t=>{this._fullscreenController.toggleFullscreen(),t.stopPropagation()}),this._scrollLeftCallback=(()=>{this._mibreitScroller.scrollLeft(6)}),this._scrollRightCallback=(()=>{this._mibreitScroller.scrollRight(6)}),this._mouseEnterCallback=(()=>{this._handlePreviousNextButtonsOpacity(!0),this._handleFullscreenEnterButtonOpacity(!0)}),this._mouseLeaveCallback=(()=>{this._handlePreviousNextButtonsOpacity(!1),this._handleFullscreenEnterButtonOpacity(!1)}),this._swipe=((t,i,e)=>{switch(t){case a:this._mibreitSlideshow.showNextImage();break;case o:this._mibreitSlideshow.showPreviousImage();break;case d:this._containerClickedCallback(i,h()(this._slideshowContainer).width())}}),this._imageChangedCallback=((t,i)=>{void 0!==this._mibreitScroller&&this._mibreitScroller.scrollTo(t),void 0!==this._titleContainer&&this._updateTitle(i)}),this._fullscreenChangedCallback=(t=>{this._mibreitSlideshow.reinitSize(),t&&h()(this._fullscreenEnterButton).css({opacity:0})}),this._containerClickedCallback=((t,i)=>{t<i/2?this._mibreitSlideshow.showPreviousImage():t>i/2&&this._mibreitSlideshow.showNextImage()}),this._keyDownCallback=(t=>{const i=t.which;37===i?this._mibreitSlideshow.showPreviousImage():39===i?this._mibreitSlideshow.showNextImage():27===i?this._fullscreenController&&this._fullscreenController.isFullscreen()&&this._fullscreenController.toggleFullscreen():70===i&&this._fullscreenController&&this._fullscreenController.toggleFullscreen()}),this._mibreitSlideshow=t.buildSlideshow(),this._slideshowContainer=t.slideshowContainer,this._thumbviewContainer=t.thumbviewContainer,this._allowFullscreen=t.allowFullscreen,this._titleContainer=t.titleContainer,this._mibreitScroller=void 0,this._fullscreenController=void 0,this._fullscreenEnterButton=void 0,this._slideshowPrevious=void 0,this._slideshowNext=void 0,this._thumbviewPrevious=void 0,this._thumbviewNext=void 0}init(){return!!this._mibreitSlideshow.isInitialized()&&(this._mibreitSlideshow.setImageChangedCallback(this._imageChangedCallback),this._allowFullscreen&&this._initFullscreen(),void 0!==this._thumbviewContainer&&this._initThumbview(),void 0!==this._titleContainer&&this._updateTitle(this._mibreitSlideshow.getCurrentImageTitle()),this._initNavigationButtons(),this._initKeyAndMouseEvents(),!0)}startSlideshow(){this._mibreitSlideshow.start()}stopSlideshow(){this._mibreitSlideshow.stop()}_initFullscreen(){h()(this._slideshowContainer).append(`<div class="${I.substr(1)}"></div>`),this._fullscreenEnterButton=h()(`${this._slideshowContainer} ${I}`);const t=new Q;t.init(this._slideshowContainer,this._thumbviewContainer,this._titleContainer,this._fullscreenChangedCallback)&&(this._fullscreenController=t)}_initNavigationButtons(){h()(this._slideshowContainer).append(`<div class="${x.substr(1)}"></div>`),this._slideshowNext=h()(`${this._slideshowContainer} ${x}`),h()(this._slideshowContainer).append(`<div class="${S.substr(1)}"></div>`),this._slideshowPrevious=h()(`${this._slideshowContainer} ${S}`)}_initThumbview(){(new B).init(this._thumbviewContainer,this._thumbClickCallback)&&(this._mibreitScroller=new Y,this._mibreitScroller.init(this._thumbviewContainer)&&(h()(this._thumbviewContainer).prepend(`<div class="${E.substr(1)}"></div>`),this._thumbviewPrevious=h()(`${this._thumbviewContainer} ${E}`),h()(this._thumbviewContainer).append(`<div class="${y.substr(1)}"></div>`),this._thumbviewNext=h()(`${this._thumbviewContainer} ${y}`),h()(this._thumbviewPrevious).bind("click",this._scrollLeftCallback),h()(this._thumbviewNext).bind("click",this._scrollRightCallback)))}_initKeyAndMouseEvents(){h()(this._slideshowContainer).bind("mouseenter",this._mouseEnterCallback),h()(this._slideshowContainer).bind("mouseleave",this._mouseLeaveCallback),g(this._slideshowContainer,[a,o,d],this._swipe),this._fullscreenEnterButton&&(h()(this._fullscreenEnterButton).bind("click",this._fullscreenEnterClickCallback),h()(this._fullscreenEnterButton).bind("mouseup mousedown touchstart touchend",t=>{t.stopPropagation()})),h()(document).bind("keydown",this._keyDownCallback)}_updateTitle(t){h()(this._titleContainer).html("<h3>"+t+"</h3>")}_handleFullscreenEnterButtonOpacity(t){this._fullscreenEnterButton&&h()(this._fullscreenEnterButton).animate({opacity:t&&!this._fullscreenController.isFullscreen()?.4:0},U)}_handlePreviousNextButtonsOpacity(t){void 0!==this._slideshowNext&&h()(this._slideshowNext).animate({opacity:t?.4:0},U),void 0!==this._slideshowPrevious&&h()(this._slideshowPrevious).animate({opacity:t?.4:0},U)}}function tt(t){if(s(t))throw Error("createSlideshow Error: No Config was provided");const i=new q(t.slideshowContainer).withInterval(t.interval).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).buildSlideshow();if(!i.isInitialized())throw Error("createSlideshow Error: invalid html structure");return i}function it(t){if(s(t))throw Error("createGallery Error: No Config was provided");const i=new q(t.slideshowContainer).withInterval(t.interval).withPreloaderLeftSize(t.preloaderLeftNr).withPreloaderRightSize(t.preloaderRightNr).withScaleMode(t.imageScaleMode).withFullscreen(t.allowFullscreen).withThumbviewContainer(t.thumbviewContainer).withTitleContainer(t.titleContainer).buildGallery();if(!i.init())throw Error("createGallery Error: invalid html structure");return i}e.d(i,"createSlideshow",function(){return tt}),e.d(i,"createGallery",function(){return it}),e.d(i,"SCALE_MODE_STRETCH",function(){return N}),e.d(i,"SCALE_MODE_FITASPECT",function(){return M}),e.d(i,"SCALE_MODE_NONE",function(){return W}),e.d(i,"SCALE_MODE_EXPAND",function(){return L})},function(t,i){},,,,,function(t,i){},,function(t,i){}]);