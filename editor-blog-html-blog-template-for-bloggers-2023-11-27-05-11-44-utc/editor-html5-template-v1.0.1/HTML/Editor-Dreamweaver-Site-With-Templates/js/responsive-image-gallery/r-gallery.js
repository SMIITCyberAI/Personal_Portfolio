/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);



/**
 * jquery.elastislide.js v1.1.0
 * http://www.codrops.com
 *
 * * editted by pixelwars
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
 (function(e,t,n){"use strict";var r=e.event,i,s;i=r.special.debouncedresize={setup:function(){e(this).on("resize",i.handler)},teardown:function(){e(this).off("resize",i.handler)},handler:function(e,t){var n=this,o=arguments,u=function(){e.type="debouncedresize";r.dispatch.apply(n,o)};if(s){clearTimeout(s)}t?u():s=setTimeout(u,i.threshold)},threshold:150};var o="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e.fn.imagesLoaded=function(t){function c(){var n=e(f),s=e(l);if(i){if(l.length){i.reject(u,n,s)}else{i.resolve(u)}}if(e.isFunction(t)){t.call(r,u,n,s)}}function h(t,n){if(t.src===o||e.inArray(t,a)!==-1){return}a.push(t);if(n){l.push(t)}else{f.push(t)}e.data(t,"imagesLoaded",{isBroken:n,src:t.src});if(s){i.notifyWith(e(t),[n,u,e(f),e(l)])}if(u.length===a.length){setTimeout(c);u.unbind(".imagesLoaded")}}var r=this,i=e.isFunction(e.Deferred)?e.Deferred():0,s=e.isFunction(i.notify),u=r.find("img").add(r.filter("img")),a=[],f=[],l=[];if(e.isPlainObject(t)){e.each(t,function(e,n){if(e==="callback"){t=n}else if(i){i[e](n)}})}if(!u.length){c()}else{u.bind("load.imagesLoaded error.imagesLoaded",function(e){h(e.target,e.type==="error")}).each(function(t,r){var i=r.src;var s=e.data(r,"imagesLoaded");if(s&&s.src===i){h(r,s.isBroken);return}if(r.complete&&r.naturalWidth!==n){h(r,r.naturalWidth===0||r.naturalHeight===0);return}if(r.readyState||r.complete){r.src=o;r.src=i}})}return i?i.promise(r):r};var u=e(t),a=t.Modernizr;e.Elastislide=function(t,n){this.$el=e(n);this._init(t)};e.Elastislide.defaults={orientation:"horizontal",speed:500,easing:"ease-in-out",minItems:3,start:0,onClick:function(e,t,n){return false},onReady:function(){return false},onBeforeSlide:function(){return false},onAfterSlide:function(){return false}};e.Elastislide.prototype={_init:function(t){this.options=e.extend(true,{},e.Elastislide.defaults,t);var n=this,r={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};this.transEndEventName=r[a.prefixed("transition")];this.support=a.csstransitions&&a.csstransforms;this.current=this.options.start;this.isSliding=false;this.$items=this.$el.children("li");this.itemsCount=this.$items.length;if(this.itemsCount===0){return false}this._validate();this.$items.detach();this.$el.empty();this.$el.append(this.$items);this.$el.wrap('<div class="elastislide-wrapper elastislide-loading elastislide-'+this.options.orientation+'"></div>');this.hasTransition=false;this.hasTransitionTimeout=setTimeout(function(){n._addTransition()},100);this.$el.imagesLoaded(function(){n.$el.show();n._layout();n._configure();if(n.hasTransition){n._removeTransition();n._slideToItem(n.current);n.$el.on(n.transEndEventName,function(){n.$el.off(n.transEndEventName);n._setWrapperSize();n._addTransition();n._initEvents()})}else{clearTimeout(n.hasTransitionTimeout);n._setWrapperSize();n._initEvents();n._slideToItem(n.current);setTimeout(function(){n._addTransition()},25)}n.options.onReady()})},_validate:function(){if(this.options.speed<0){this.options.speed=500}if(this.options.minItems<1||this.options.minItems>this.itemsCount){this.options.minItems=1}if(this.options.start<0||this.options.start>this.itemsCount-1){this.options.start=0}if(this.options.orientation!="horizontal"&&this.options.orientation!="vertical"){this.options.orientation="horizontal"}},_layout:function(){this.$el.wrap('<div class="elastislide-carousel"></div>');this.$carousel=this.$el.parent();this.$wrapper=this.$carousel.parent().removeClass("elastislide-loading");var e=this.$items.find("img:first");this.imgSize={width:e.outerWidth(true),height:e.outerHeight(true)};this._setItemsSize();this.options.orientation==="horizontal"?this.$el.css("max-height",this.imgSize.height):this.$el.css("height",this.options.minItems*this.imgSize.height);this._addControls()},_addTransition:function(){if(this.support){this.$el.css("transition","all "+this.options.speed+"ms "+this.options.easing)}this.hasTransition=true},_removeTransition:function(){if(this.support){this.$el.css("transition","all 0s")}this.hasTransition=false},_addControls:function(){var t=this;this.$navigation=e('<nav><span class="elastislide-prev">Previous</span><span class="elastislide-next">Next</span></nav>').appendTo(this.$wrapper);this.$navPrev=this.$navigation.find("span.elastislide-prev").on("mousedown.elastislide",function(e){t._slide("prev");return false});this.$navNext=this.$navigation.find("span.elastislide-next").on("mousedown.elastislide",function(e){t._slide("next");return false})},_setItemsSize:function(){var e=this.options.orientation==="horizontal"?Math.floor(this.$carousel.width()/this.options.minItems)*100/this.$carousel.width():100;this.$items.css({width:e+"%","max-width":this.imgSize.width,"max-height":this.imgSize.height});if(this.options.orientation==="vertical"){this.$wrapper.css("max-width",this.imgSize.width+parseInt(this.$wrapper.css("padding-left"))+parseInt(this.$wrapper.css("padding-right")))}},_setWrapperSize:function(){if(this.options.orientation==="vertical"){this.$wrapper.css({height:this.options.minItems*this.imgSize.height+parseInt(this.$wrapper.css("padding-top"))+parseInt(this.$wrapper.css("padding-bottom"))})}},_configure:function(){this.fitCount=this.options.orientation==="horizontal"?this.$carousel.width()<this.options.minItems*this.imgSize.width?this.options.minItems:Math.floor(this.$carousel.width()/this.imgSize.width):this.$carousel.height()<this.options.minItems*this.imgSize.height?this.options.minItems:Math.floor(this.$carousel.height()/this.imgSize.height)},_initEvents:function(){var t=this;u.on("debouncedresize.elastislide",function(){t._setItemsSize();t._configure();t._slideToItem(t.current)});this.$el.on(this.transEndEventName,function(){t._onEndTransition()});if(this.options.orientation==="horizontal"){this.$el.parent().touchwipe({wipeLeft:function(){t._slide("next")},wipeRight:function(){t._slide("prev")},preventDefaultEvents:true})}else{this.$el.parent().on({swipeup:function(){t._slide("next")},swipedown:function(){t._slide("prev")}})}this.$el.on("click.elastislide","li",function(n){var r=e(this);t.options.onClick(r,r.index(),n)})},_destroy:function(e){this.$el.off(this.transEndEventName).off("swipeleft swiperight swipeup swipedown .elastislide");u.off(".elastislide");this.$el.css({"max-height":"none",transition:"none"}).unwrap(this.$carousel).unwrap(this.$wrapper);this.$items.css({width:"auto","max-width":"none","max-height":"none"});this.$navigation.remove();this.$wrapper.remove();if(e){e.call()}},_toggleControls:function(e,t){if(t){e==="next"?this.$navNext.show():this.$navPrev.show()}else{e==="next"?this.$navNext.hide():this.$navPrev.hide()}},_slide:function(t,r){if(this.isSliding){return false}this.options.onBeforeSlide();this.isSliding=true;var i=this,s=this.translation||0,o=this.options.orientation==="horizontal"?this.$items.outerWidth(true):this.$items.outerHeight(true),u=this.itemsCount*o,a=this.options.orientation==="horizontal"?this.$carousel.width():this.$carousel.height();if(r===n){var f=this.fitCount*o;if(f<0){return false}if(t==="next"&&u-(Math.abs(s)+f)<a){f=u-(Math.abs(s)+a);this._toggleControls("next",false);this._toggleControls("prev",true)}else if(t==="prev"&&Math.abs(s)-f<0){f=Math.abs(s);this._toggleControls("next",true);this._toggleControls("prev",false)}else{var l=t==="next"?Math.abs(s)+Math.abs(f):Math.abs(s)-Math.abs(f);l>0?this._toggleControls("prev",true):this._toggleControls("prev",false);l<u-a?this._toggleControls("next",true):this._toggleControls("next",false)}r=t==="next"?s-f:s+f}else{var f=Math.abs(r);if(Math.max(u,a)-f<a){r=-(Math.max(u,a)-a)}f>0?this._toggleControls("prev",true):this._toggleControls("prev",false);Math.max(u,a)-a>f?this._toggleControls("next",true):this._toggleControls("next",false)}this.translation=r;if(s===r){this._onEndTransition();return false}if(this.support){this.options.orientation==="horizontal"?this.$el.css("transform","translateX("+r+"px)"):this.$el.css("transform","translateY("+r+"px)")}else{e.fn.applyStyle=this.hasTransition?e.fn.animate:e.fn.css;var c=this.options.orientation==="horizontal"?{left:r}:{top:r};this.$el.stop().applyStyle(c,e.extend(true,[],{duration:this.options.speed,complete:function(){i._onEndTransition()}}))}if(!this.hasTransition){this._onEndTransition()}},_onEndTransition:function(){this.isSliding=false;this.options.onAfterSlide()},_slideTo:function(e){var e=e||this.current,t=Math.abs(this.translation)||0,n=this.options.orientation==="horizontal"?this.$items.outerWidth(true):this.$items.outerHeight(true),r=t+this.$carousel.width(),i=Math.abs(e*n);if(i+n>r||i<t){this._slideToItem(e)}},_slideToItem:function(e){var t=this.options.orientation==="horizontal"?e*this.$items.outerWidth(true):e*this.$items.outerHeight(true);this._slide("",-t)},add:function(e){var t=this,n=this.current,r=this.$items.eq(this.current);this.$items=this.$el.children("li");this.itemsCount=this.$items.length;this.current=r.index();this._setItemsSize();this._configure();this._removeTransition();n<this.current?this._slideToItem(this.current):this._slide("next",this.translation);setTimeout(function(){t._addTransition()},25);if(e){e.call()}},setCurrent:function(e,t){this.current=e;this._slideTo();if(t){t.call()}},next:function(){self._slide("next")},previous:function(){self._slide("prev")},slideStart:function(){this._slideTo(0)},slideEnd:function(){this._slideTo(this.itemsCount-1)},destroy:function(e){this._destroy(e)}};var f=function(e){if(t.console){t.console.error(e)}};e.fn.elastislide=function(t){var n=e.data(this,"elastislide");if(typeof t==="string"){var r=Array.prototype.slice.call(arguments,1);this.each(function(){if(!n){f("cannot call methods on elastislide prior to initialization; "+"attempted to call method '"+t+"'");return}if(!e.isFunction(n[t])||t.charAt(0)==="_"){f("no such method '"+t+"' for elastislide self");return}n[t].apply(n,r)})}else{this.each(function(){if(n){n._init()}else{n=e.data(this,"elastislide",new e.Elastislide(t,this))}})}return n}})(jQuery,window)



/*
* Responsive Image Gallery
* http://tympanus.net/codrops/2011/09/20/responsive-image-gallery/
* editted by pixelwars
*/
jQuery(document).ready(function($){
	if($('#rg-gallery').length) {
	var e=$("#rg-gallery"),t=e.find(".elastislide-list"),n=t.find("li"),r=n.length,i;Gallery=function(){var s=0,o="carousel",u=false,a=function(){n.imagesLoaded(function(){l();h(n.eq(s))});if(o==="carousel")f()},f=function(){i=t.show().elastislide({imageW:65});t.find("li a").click(function(){if(u)return false;u=true;h($(this).parent());s=$(this).parent().index();return false})},l=function(){if(r>1){var t=e.find("a.rg-image-nav-prev"),n=e.find("a.rg-image-nav-next"),i=e.find("div.rg-image");t.on("click.rgGallery",function(e){c("left");return false});n.on("click.rgGallery",function(e){c("right");return false});i.find("img").live("click",function(){c("right")});$(document).on("keyup.rgGallery",function(e){if(e.keyCode==39)c("right");else if(e.keyCode==37)c("left")})}},c=function(e){if(u)return false;u=true;if(e==="right"){if(s+1>=r)s=0;else++s}else if(e==="left"){if(s-1<0)s=r-1;else--s}h(n.eq(s))},h=function(t){var r=e.find("div.rg-loading").show();n.removeClass("selected");t.addClass("selected");var a=t.find("img"),f=t.find("a").attr("href"),l=a.data("description");var c='<img src="'+f+'"/>';$(c).load(function(){e.find("div.rg-image").empty().append(c);$imgWrapper=e.find("div.rg-image");$imgWrapper.find("img").load(function(){$imgWrapper.css("min-height",$imgWrapper.find("img").height())});if(l)e.find("div.rg-caption").show().children("p").empty().text(l);r.hide();if(o==="carousel"){i.setCurrent(s)}u=false}).attr("src",f)},p=function(e){t.find("ul").append(e);n=n.add($(e));r=n.length;t.elastislide("add",e)};return{init:a,addItems:p}}();Gallery.init()}})