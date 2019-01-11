/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */
/**
 * @namespace ScrollMagic
 */
!function(e,t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(t):"object"==typeof exports?
// CommonJS
module.exports=t():
// Browser global
e.ScrollMagic=t()}(this,function(){"use strict";var _=function(){D.log(2,"(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")};_.version="2.0.5",
// TODO: temporary workaround for chrome's scroll jitter bug
window.addEventListener("mousewheel",function(){});
// global const
var M="data-scrollmagic-pin-spacer";
/**
	 * The main class that is needed once per scroll container.
	 *
	 * @class
	 *
	 * @example
	 * // basic initialization
	 * var controller = new ScrollMagic.Controller();
	 *
	 * // passing options
	 * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
	 *
	 * @param {object} [options] - An object containing one or more options for the controller.
	 * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
	 * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
	 * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
	 * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
	 ** `0` => silent
	 ** `1` => errors
	 ** `2` => errors, warnings
	 ** `3` => errors, warnings, debuginfo
	 * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
	 This interval polls these parameters to fire the necessary events.  
	 If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
	 *
	 */_.Controller=function(e){
/*
	 * ----------------------------------------------------------------
	 * settings
	 * ----------------------------------------------------------------
	 */
var n="ScrollMagic.Controller",r="FORWARD",o="REVERSE",t="PAUSED",i=O.defaults,l=this,s=D.extend({},i,e),a=[],c=!1,
// can be boolean (true => all scenes) or an array of scenes to be updated
u=0,f=t,d=!0,g=0,p=!0,h,v,m=function(){for(var e in s)i.hasOwnProperty(e)||(x(2,'WARNING: Unknown option "'+e+'"'),delete s[e]);
// check ScrollContainer
if(s.container=D.get.elements(s.container)[0],!s.container)throw x(1,"ERROR creating object "+n+": No valid scroll container supplied"),n+" init failed.";// cancel
// normalize to window
(d=s.container===window||s.container===document.body||!document.body.contains(s.container))&&(s.container=window),
// update container size immediately
g=S(),
// set event handlers
s.container.addEventListener("resize",T),s.container.addEventListener("scroll",T),s.refreshInterval=parseInt(s.refreshInterval)||i.refreshInterval,w(),x(3,"added new "+n+" controller (v"+_.version+")")},w=function(){0<s.refreshInterval&&(v=window.setTimeout(C,s.refreshInterval))},y=function(){return s.vertical?D.get.scrollTop(s.container):D.get.scrollLeft(s.container)},S=function(){return s.vertical?D.get.height(s.container):D.get.width(s.container)},E=this._setScrollPos=function(e){s.vertical?d?window.scrollTo(D.get.scrollLeft(),e):s.container.scrollTop=e:d?window.scrollTo(e,D.get.scrollTop()):s.container.scrollLeft=e},b=function(){if(p&&c){
// determine scenes to update
var n=D.type.Array(c)?c:a.slice(0);
// reset scenes
c=!1;var e=u,t=(
// update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)
u=l.scrollPos())-e;0!==t&&(// scroll position changed?
f=0<t?r:o),
// reverse order of scenes if scrolling reverse
f===o&&n.reverse(),
// update scenes
n.forEach(function(e,t){x(3,"updating Scene "+(t+1)+"/"+n.length+" ("+a.length+" total)"),e.update(!0)}),0===n.length&&3<=s.loglevel&&x(3,"updating 0 Scenes (nothing added to controller)")}},R=function(){h=D.rAF(b)},T=function(e){x(3,"event fired causing an update:",e.type),"resize"==e.type&&(
// resize
g=S(),f=t),
// schedule update
!0!==c&&(c=!0,R())},C=function(){if(!d&&g!=S()){var t;try{t=new Event("resize",{bubbles:!1,cancelable:!1})}catch(e){// stupid IE
(t=document.createEvent("Event")).initEvent("resize",!1,!1)}s.container.dispatchEvent(t)}a.forEach(function(e,t){// refresh all scenes
e.refresh()}),w()},x=this._log=function(e,t){s.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+n+") ->"),D.log.apply(window,arguments))};
/*
	 * ----------------------------------------------------------------
	 * private vars
	 * ----------------------------------------------------------------
	 */
// for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins
this._options=s;
/**
		 * Sort scenes in ascending order of their start offset.
		 * @private
		 *
		 * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
		 * @return {array} The sorted array of Scenes.
		 */
var F=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};
/**
		 * ----------------------------------------------------------------
		 * public functions
		 * ----------------------------------------------------------------
		 */
/**
		 * Add one ore more scene(s) to the controller.  
		 * This is the equivalent to `Scene.addTo(controller)`.
		 * @public
		 * @example
		 * // with a previously defined scene
		 * controller.addScene(scene);
		 *
		 * // with a newly created scene.
		 * controller.addScene(new ScrollMagic.Scene({duration : 0}));
		 *
		 * // adding multiple scenes
		 * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
		 *
		 * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
		 * @return {Controller} Parent object for chaining.
		 */return this.addScene=function(e){if(D.type.Array(e))e.forEach(function(e,t){l.addScene(e)});else if(e instanceof _.Scene){if(e.controller()!==l)e.addTo(l);else if(a.indexOf(e)<0){
// insert Global defaults.
for(var t in
// new scene
a.push(e),// add to array
a=F(a),// sort
e.on("shift.controller_sort",function(){// resort whenever scene moves
a=F(a)}),s.globalSceneOptions)e[t]&&e[t].call(e,s.globalSceneOptions[t]);x(3,"adding Scene (now "+a.length+" total)")}}else x(1,"ERROR: invalid argument supplied for '.addScene()'");return l},
/**
		 * Remove one ore more scene(s) from the controller.  
		 * This is the equivalent to `Scene.remove()`.
		 * @public
		 * @example
		 * // remove a scene from the controller
		 * controller.removeScene(scene);
		 *
		 * // remove multiple scenes from the controller
		 * controller.removeScene([scene, scene2, scene3]);
		 *
		 * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
		 * @returns {Controller} Parent object for chaining.
		 */
this.removeScene=function(e){if(D.type.Array(e))e.forEach(function(e,t){l.removeScene(e)});else{var t=a.indexOf(e);-1<t&&(e.off("shift.controller_sort"),a.splice(t,1),x(3,"removing Scene (now "+a.length+" left)"),e.remove())}return l},
/**
		 * Update one ore more scene(s) according to the scroll position of the container.  
		 * This is the equivalent to `Scene.update()`.  
		 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
		 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
		 * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
		 * @public
		 * @example
		 * // update a specific scene on next cycle
		 * controller.updateScene(scene);
		 *
		 * // update a specific scene immediately
		 * controller.updateScene(scene, true);
		 *
		 * // update multiple scenes scene on next cycle
		 * controller.updateScene([scene1, scene2, scene3]);
		 *
		 * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
		 This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
		 * @return {Controller} Parent object for chaining.
		 */
this.updateScene=function(e,n){return D.type.Array(e)?e.forEach(function(e,t){l.updateScene(e,n)}):n?e.update(!0):!0!==c&&e instanceof _.Scene&&(// if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
// prep array for next update cycle
-1==(c=c||[]).indexOf(e)&&c.push(e),c=F(c),// sort
R()),l},
/**
		 * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
		 * See `Controller.updateScene()` for more information about what this means.  
		 * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
		 * The only application for this method is when ScrollMagic fails to detect these events.  
		 * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
		 * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
		 * @public
		 * @example
		 * // update the controller on next cycle (saves performance due to elimination of redundant updates)
		 * controller.update();
		 *
		 * // update the controller immediately
		 * controller.update(true);
		 *
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
		 * @return {Controller} Parent object for chaining.
		 */
this.update=function(e){return T({type:"resize"}),// will update size and set _updateScenesOnNextCycle to true
e&&b(),l},
/**
		 * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
		 * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
		 * @public
		 *
		 * @since 1.1.0
		 * @example
		 * // scroll to an offset of 100
		 * controller.scrollTo(100);
		 *
		 * // scroll to a DOM element
		 * controller.scrollTo("#anchor");
		 *
		 * // scroll to the beginning of a scene
		 * var scene = new ScrollMagic.Scene({offset: 200});
		 * controller.scrollTo(scene);
		 *
		 * // define a new scroll position modification function (jQuery animate instead of jump)
		 * controller.scrollTo(function (newScrollPos) {
		 *	$("html, body").animate({scrollTop: newScrollPos});
		 * });
		 * controller.scrollTo(100); // call as usual, but the new function will be used instead
		 *
		 * // define a new scroll function with an additional parameter
		 * controller.scrollTo(function (newScrollPos, message) {
		 *  console.log(message);
		 *	$(this).animate({scrollTop: newScrollPos});
		 * });
		 * // call as usual, but supply an extra parameter to the defined custom function
		 * controller.scrollTo(100, "my message");
		 *
		 * // define a new scroll function with an additional parameter containing multiple variables
		 * controller.scrollTo(function (newScrollPos, options) {
		 *  someGlobalVar = options.a + options.b;
		 *	$(this).animate({scrollTop: newScrollPos});
		 * });
		 * // call as usual, but supply an extra parameter containing multiple options
		 * controller.scrollTo(100, {a: 1, b: 2});
		 *
		 * // define a new scroll function with a callback supplied as an additional parameter
		 * controller.scrollTo(function (newScrollPos, callback) {
		 *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
		 * });
		 * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
		 * controller.scrollTo(100, function() {
		 *	console.log("scroll has finished.");
		 * });
		 *
		 * @param {mixed} scrollTarget - The supplied argument can be one of these types:
		 * 1. `number` -> The container will scroll to this new scroll offset.
		 * 2. `string` or `object` -> Can be a selector or a DOM object.  
		 *  The container will scroll to the position of this element.
		 * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
		 * 4. `function` -> This function will be used for future scroll position modifications.  
		 *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
		 *  It may also optionally receive an optional additional parameter (see below)  
		 *  _**NOTE:**  
		 *  All other options will still work as expected, using the new function to scroll._
		 * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
		 * @returns {Controller} Parent object for chaining.
		 */
this.scrollTo=function(e,t){if(D.type.Number(e))// excecute
E.call(s.container,e,t);else if(e instanceof _.Scene)// scroll to scene
e.controller()===l?// check if the controller is associated with this scene
l.scrollTo(e.scrollOffset(),t):x(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",e);else if(D.type.Function(e))// assign new scroll function
E=e;else{// scroll to element
var n=D.get.elements(e)[0];if(n){
// if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
for(;n.parentNode.hasAttribute(M);)n=n.parentNode;var r=s.vertical?"top":"left",
// which param is of interest ?
o=D.get.offset(s.container),
// container position is needed because element offset is returned in relation to document, not in relation to container.
i=D.get.offset(n);d||(// container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
o[r]-=l.scrollPos()),l.scrollTo(i[r]-o[r],t)}else x(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",e)}return l},
/**
		 * **Get** the current scrollPosition or **Set** a new method to calculate it.  
		 * -> **GET**:
		 * When used as a getter this function will return the current scroll position.  
		 * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
		 * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
		 *
		 * -> **SET**:
		 * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
		 * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
		 * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
		 * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
		 * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
		 *
		 * To change the current scroll position please use `Controller.scrollTo()`.
		 * @public
		 *
		 * @example
		 * // get the current scroll Position
		 * var scrollPos = controller.scrollPos();
		 *
		 * // set a new scroll position calculation method
		 * controller.scrollPos(function () {
		 *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
		 * });
		 *
		 * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
		 * @returns {(number|Controller)} Current scroll position or parent object for chaining.
		 */
this.scrollPos=function(e){return arguments.length?(// set
D.type.Function(e)?y=e:x(2,"Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."),l):y.call(l)},
/**
		 * **Get** all infos or one in particular about the controller.
		 * @public
		 * @example
		 * // returns the current scroll position (number)
		 * var scrollPos = controller.info("scrollPos");
		 *
		 * // returns all infos as an object
		 * var infos = controller.info();
		 *
		 * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
		 Valid options are:
		 ** `"size"` => the current viewport size of the container
		 ** `"vertical"` => true if vertical scrolling, otherwise false
		 ** `"scrollPos"` => the current scroll position
		 ** `"scrollDirection"` => the last known direction of the scroll
		 ** `"container"` => the container element
		 ** `"isDocument"` => true if container element is the document.
		 * @returns {(mixed|object)} The requested info(s).
		 */
this.info=function(e){var t={size:g,
// contains height or width (in regard to orientation);
vertical:s.vertical,scrollPos:u,scrollDirection:f,container:s.container,isDocument:d};return arguments.length?void 0!==t[e]?t[e]:void x(1,'ERROR: option "'+e+'" is not available'):t},
/**
		 * **Get** or **Set** the current loglevel option value.
		 * @public
		 *
		 * @example
		 * // get the current value
		 * var loglevel = controller.loglevel();
		 *
		 * // set a new value
		 * controller.loglevel(3);
		 *
		 * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
		 * @returns {(number|Controller)} Current loglevel or parent object for chaining.
		 */
this.loglevel=function(e){return arguments.length?(s.loglevel!=e&&(// set
s.loglevel=e),l):s.loglevel},
/**
		 * **Get** or **Set** the current enabled state of the controller.  
		 * This can be used to disable all Scenes connected to the controller without destroying or removing them.
		 * @public
		 *
		 * @example
		 * // get the current value
		 * var enabled = controller.enabled();
		 *
		 * // disable the controller
		 * controller.enabled(false);
		 *
		 * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
		 * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
		 */
this.enabled=function(e){return arguments.length?(p!=e&&(// set
p=!!e,l.updateScene(a,!0)),l):p},
/**
		 * Destroy the Controller, all Scenes and everything.
		 * @public
		 *
		 * @example
		 * // without resetting the scenes
		 * controller = controller.destroy();
		 *
		 * // with scene reset
		 * controller = controller.destroy(true);
		 *
		 * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
		 * @returns {null} Null to unset handler variables.
		 */
this.destroy=function(e){window.clearTimeout(v);for(var t=a.length;t--;)a[t].destroy(e);return s.container.removeEventListener("resize",T),s.container.removeEventListener("scroll",T),D.cAF(h),x(3,"destroyed "+n+" (reset: "+(e?"true":"false")+")"),null},
// INIT
m(),l};
// store pagewide controller options
var O={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};
/*
 * method used to add an option to ScrollMagic Scenes.
 */_.Controller.addOption=function(e,t){O.defaults[e]=t},
// instance extension function for plugins
_.Controller.extend=function(e){var t=this;_.Controller=function(){// copy parent state
return t.apply(this,arguments),this.$super=D.extend({},this),e.apply(this,arguments)||this},D.extend(_.Controller,t),// copy properties
_.Controller.prototype=t.prototype,// copy prototype
_.Controller.prototype.constructor=_.Controller},
/**
	 * A Scene defines where the controller should react and how.
	 *
	 * @class
	 *
	 * @example
	 * // create a standard scene and add it to a controller
	 * new ScrollMagic.Scene()
	 *		.addTo(controller);
	 *
	 * // create a scene with custom options and assign a handler to it.
	 * var scene = new ScrollMagic.Scene({
	 * 		duration: 100,
	 *		offset: 200,
	 *		triggerHook: "onEnter",
	 *		reverse: false
	 * });
	 *
	 * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
	 Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
	 When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
	 * @param {(number|function)} [options.duration=0] - The duration of the scene. 
	 If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.  
	 A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
	 * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
	 * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
	 * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
	 Can also be defined using a string:
	 ** `"onEnter"` => `1`
	 ** `"onCenter"` => `0.5`
	 ** `"onLeave"` => `0`
	 * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
	 * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
	 ** `0` => silent
	 ** `1` => errors
	 ** `2` => errors, warnings
	 ** `3` => errors, warnings, debuginfo
	 * 
	 */
_.Scene=function(e){
/*
	 * ----------------------------------------------------------------
	 * settings
	 * ----------------------------------------------------------------
	 */
var n="ScrollMagic.Scene",a="BEFORE",c="DURING",u="AFTER",o=k.defaults,d=this,g=D.extend({},o,e),f=a,p=0,s={start:0,end:0},
// reflects the controllers's scroll position for the start and end of the scene respectively
h=0,r=!0,i,v,t=function(){for(var e in g)// check supplied options
o.hasOwnProperty(e)||(w(2,'WARNING: Unknown option "'+e+'"'),delete g[e]);
// add getters/setters for all possible options
for(var t in o)C(t);
// validate all options
R()},m={};
/*
	 * ----------------------------------------------------------------
	 * private vars
	 * ----------------------------------------------------------------
	 */
/**
		 * Scene start event.  
		 * Fires whenever the scroll position its the starting point of the scene.  
		 * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#start
		 *
		 * @example
		 * scene.on("start", function (event) {
		 * 	console.log("Hit start point of scene.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
/**
		 * Scene end event.  
		 * Fires whenever the scroll position its the ending point of the scene.  
		 * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#end
		 *
		 * @example
		 * scene.on("end", function (event) {
		 * 	console.log("Hit end point of scene.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
/**
		 * Scene enter event.  
		 * Fires whenever the scene enters the "DURING" state.  
		 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#enter
		 *
		 * @example
		 * scene.on("enter", function (event) {
		 * 	console.log("Scene entered.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene - always `"DURING"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
/**
		 * Scene leave event.  
		 * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
		 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#leave
		 *
		 * @example
		 * scene.on("leave", function (event) {
		 * 	console.log("Scene left.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
/**
		 * Scene update event.  
		 * Fires whenever the scene is updated (but not necessarily changes the progress).
		 *
		 * @event ScrollMagic.Scene#update
		 *
		 * @example
		 * scene.on("update", function (event) {
		 * 	console.log("Scene updated.");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
		 * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
		 * @property {number} event.scrollPos - The current scroll position of the container
		 */
/**
		 * Scene progress event.  
		 * Fires whenever the progress of the scene changes.
		 *
		 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
		 *
		 * @event ScrollMagic.Scene#progress
		 *
		 * @example
		 * scene.on("progress", function (event) {
		 * 	console.log("Scene progress changed to " + event.progress);
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {number} event.progress - Reflects the current progress of the scene
		 * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
		 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
		 */
/**
		 * Scene change event.  
		 * Fires whenvever a property of the scene is changed.
		 *
		 * @event ScrollMagic.Scene#change
		 *
		 * @example
		 * scene.on("change", function (event) {
		 * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {string} event.what - Indicates what value has been changed
		 * @property {mixed} event.newval - The new value of the changed property
		 */
/**
		 * Scene shift event.  
		 * Fires whenvever the start or end **scroll offset** of the scene change.
		 * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
		 * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
		 * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
		 *
		 * @event ScrollMagic.Scene#shift
		 * @since 1.1.0
		 *
		 * @example
		 * scene.on("shift", function (event) {
		 * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {string} event.reason - Indicates why the scene has shifted
		 */
/**
		 * Scene destroy event.  
		 * Fires whenvever the scene is destroyed.
		 * This can be used to tidy up custom behaviour used in events.
		 *
		 * @event ScrollMagic.Scene#destroy
		 * @since 1.1.0
		 *
		 * @example
		 * scene.on("enter", function (event) {
		 *        // add custom action
		 *        $("#my-elem").left("200");
		 *      })
		 *      .on("destroy", function (event) {
		 *        // reset my element to start position
		 *        if (event.reset) {
		 *          $("#my-elem").left("0");
		 *        }
		 *      });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
		 */
/**
		 * Scene add event.  
		 * Fires when the scene is added to a controller.
		 * This is mostly used by plugins to know that change might be due.
		 *
		 * @event ScrollMagic.Scene#add
		 * @since 2.0.0
		 *
		 * @example
		 * scene.on("add", function (event) {
		 * 	console.log('Scene was added to a new controller.');
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 * @property {boolean} event.controller - The controller object the scene was added to.
		 */
/**
		 * Scene remove event.  
		 * Fires when the scene is removed from a controller.
		 * This is mostly used by plugins to know that change might be due.
		 *
		 * @event ScrollMagic.Scene#remove
		 * @since 2.0.0
		 *
		 * @example
		 * scene.on("remove", function (event) {
		 * 	console.log('Scene was removed from its controller.');
		 * });
		 *
		 * @property {object} event - The event Object passed to each callback
		 * @property {string} event.type - The name of the event
		 * @property {Scene} event.target - The Scene object that triggered this event
		 */
/**
		 * Add one ore more event listener.  
		 * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
		 * @method ScrollMagic.Scene#on
		 *
		 * @example
		 * function callback (event) {
		 * 		console.log("Event fired! (" + event.type + ")");
		 * }
		 * // add listeners
		 * scene.on("change update progress start end enter leave", callback);
		 *
		 * @param {string} names - The name or names of the event the callback should be attached to.
		 * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
		 * @returns {Scene} Parent object for chaining.
		 */
this.on=function(e,o){return D.type.Function(o)?(e=e.trim().split(" ")).forEach(function(e){var t=e.split("."),n=t[0],r=t[1];"*"!=n&&(// disallow wildcards
m[n]||(m[n]=[]),m[n].push({namespace:r||"",callback:o}))}):w(1,"ERROR when calling '.on()': Supplied callback for '"+e+"' is not a valid function!"),d},
/**
		 * Remove one or more event listener.
		 * @method ScrollMagic.Scene#off
		 *
		 * @example
		 * function callback (event) {
		 * 		console.log("Event fired! (" + event.type + ")");
		 * }
		 * // add listeners
		 * scene.on("change update", callback);
		 * // remove listeners
		 * scene.off("change update", callback);
		 *
		 * @param {string} names - The name or names of the event that should be removed.
		 * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
		 * @returns {Scene} Parent object for chaining.
		 */
this.off=function(e,l){return e?(e=e.trim().split(" ")).forEach(function(e,t){var n=e.split("."),r=n[0],o=n[1]||"",i;("*"===r?Object.keys(m):[r]).forEach(function(e){for(var t=m[e]||[],n=t.length;n--;){var r=t[n];!r||o!==r.namespace&&"*"!==o||l&&l!=r.callback||t.splice(n,1)}t.length||delete m[e]})}):w(1,"ERROR: Invalid event name supplied."),d},
/**
		 * Trigger an event.
		 * @method ScrollMagic.Scene#trigger
		 *
		 * @example
		 * this.trigger("change");
		 *
		 * @param {string} name - The name of the event that should be triggered.
		 * @param {object} [vars] - An object containing info that should be passed to the callback.
		 * @returns {Scene} Parent object for chaining.
		 */
this.trigger=function(e,n){if(e){var t=e.trim().split("."),r=t[0],o=t[1],i=m[r];w(3,"event fired:",r,n?"->":"",n||""),i&&i.forEach(function(e,t){o&&o!==e.namespace||e.callback.call(d,new _.Event(r,e.namespace,d,n))})}else w(1,"ERROR: Invalid event name supplied.");return d},
// set event listeners
d.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&(// no need for a scene update scene with these options...
"triggerElement"===e.what?S():"reverse"===e.what&&// the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
d.update())}).on("shift.internal",function(e){l(),d.update()});
/**
		 * Send a debug message to the console.
		 * @private
		 * but provided publicly with _log for plugins
		 *
		 * @param {number} loglevel - The loglevel required to initiate output for the message.
		 * @param {...mixed} output - One or more variables that should be passed to the console.
		 */
var w=this._log=function(e,t){g.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+n+") ->"),D.log.apply(window,arguments))};
/**
		 * Add the scene to a controller.  
		 * This is the equivalent to `Controller.addScene(scene)`.
		 * @method ScrollMagic.Scene#addTo
		 *
		 * @example
		 * // add a scene to a ScrollMagic Controller
		 * scene.addTo(controller);
		 *
		 * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
		 * @returns {Scene} Parent object for chaining.
		 */this.addTo=function(e){return e instanceof _.Controller?v!=e&&(
// new controller
v&&// was associated to a different controller before, so remove it...
v.removeScene(d),v=e,R(),y(!0),S(!0),l(),v.info("container").addEventListener("resize",E),e.addScene(d),d.trigger("add",{controller:v}),w(3,"added "+n+" to controller"),d.update()):w(1,"ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"),d},
/**
		 * **Get** or **Set** the current enabled state of the scene.  
		 * This can be used to disable this scene without removing or destroying it.
		 * @method ScrollMagic.Scene#enabled
		 *
		 * @example
		 * // get the current value
		 * var enabled = scene.enabled();
		 *
		 * // disable the scene
		 * scene.enabled(false);
		 *
		 * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
		 * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
		 */
this.enabled=function(e){return arguments.length?(r!=e&&(// set
r=!!e,d.update(!0)),d):r},
/**
		 * Remove the scene from the controller.  
		 * This is the equivalent to `Controller.removeScene(scene)`.
		 * The scene will not be updated anymore until you readd it to a controller.
		 * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
		 * @method ScrollMagic.Scene#remove
		 * @example
		 * // remove the scene from its controller
		 * scene.remove();
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
this.remove=function(){if(v){v.info("container").removeEventListener("resize",E);var e=v;v=void 0,e.removeScene(d),d.trigger("remove"),w(3,"removed "+n+" from controller")}return d},
/**
		 * Destroy the scene and everything.
		 * @method ScrollMagic.Scene#destroy
		 * @example
		 * // destroy the scene without resetting the pin and tween to their initial positions
		 * scene = scene.destroy();
		 *
		 * // destroy the scene and reset the pin and tween
		 * scene = scene.destroy(true);
		 *
		 * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
		 * @returns {null} Null to unset handler variables.
		 */
this.destroy=function(e){return d.trigger("destroy",{reset:e}),d.remove(),d.off("*.*"),w(3,"destroyed "+n+" (reset: "+(e?"true":"false")+")"),null},
/**
		 * Updates the Scene to reflect the current state.  
		 * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
		 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
		 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
		 * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
		 * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
		 * @method ScrollMagic.Scene#update
		 * @example
		 * // update the scene on next tick
		 * scene.update();
		 *
		 * // update the scene immediately
		 * scene.update(true);
		 *
		 * @fires Scene.update
		 *
		 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
		 * @returns {Scene} Parent object for chaining.
		 */
this.update=function(e){if(v)if(e)if(v.enabled()&&r){var t=v.info("scrollPos"),n;n=0<g.duration?(t-s.start)/(s.end-s.start):t>=s.start?1:0,d.trigger("update",{startPos:s.start,endPos:s.end,scrollPos:t}),d.progress(n)}else x&&f===c&&O(!0);else v.updateScene(d,!1);return d},
/**
		 * Updates dynamic scene variables like the trigger element position or the duration.
		 * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
		 * 
		 * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
		 * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
		 *
		 * @method ScrollMagic.Scene#refresh
		 * @since 1.1.0
		 * @example
		 * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
		 * 
		 * // change the position of the trigger
		 * $("#trigger").css("top", 500);
		 * // immediately let the scene know of this change
		 * scene.refresh();
		 *
		 * @fires {@link Scene.shift}, if the trigger element position or the duration changed
		 * @fires {@link Scene.change}, if the duration changed
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
this.refresh=function(){
// update trigger element position
return y(),S(),d},
/**
		 * **Get** or **Set** the scene's progress.  
		 * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
		 * The order in which the events are fired depends on the duration of the scene:
		 *  1. Scenes with `duration == 0`:  
		 *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
		 *  When the trigger position of the scene is passed the events are always fired in this order:  
		 *  `enter`, `start`, `progress` when scrolling forward  
		 *  and  
		 *  `progress`, `start`, `leave` when scrolling in reverse
		 *  2. Scenes with `duration > 0`:  
		 *  Scenes with a set duration have a defined start and end point.  
		 *  When scrolling past the start position of the scene it will fire these events in this order:  
		 *  `enter`, `start`, `progress`  
		 *  When continuing to scroll and passing the end point it will fire these events:  
		 *  `progress`, `end`, `leave`  
		 *  When reversing through the end point these events are fired:  
		 *  `enter`, `end`, `progress`  
		 *  And when continuing to scroll past the start position in reverse it will fire:  
		 *  `progress`, `start`, `leave`  
		 *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
		 * 
		 * In short:  
		 * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
		 * `start` and `end` will always trigger at their respective position.
		 * 
		 * Please review the event descriptions for details on the events and the event object that is passed to the callback.
		 * 
		 * @method ScrollMagic.Scene#progress
		 * @example
		 * // get the current scene progress
		 * var progress = scene.progress();
		 *
		 * // set new scene progress
		 * scene.progress(0.3);
		 *
		 * @fires {@link Scene.enter}, when used as setter
		 * @fires {@link Scene.start}, when used as setter
		 * @fires {@link Scene.progress}, when used as setter
		 * @fires {@link Scene.end}, when used as setter
		 * @fires {@link Scene.leave}, when used as setter
		 *
		 * @param {number} [progress] - The new progress value of the scene `[0-1]`.
		 * @returns {number} `get` -  Current scene progress.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
this.progress=function(e){if(arguments.length){// set
var t=!1,n=f,r=v?v.info("scrollDirection"):"PAUSED",o=g.reverse||p<=e;if(0===g.duration?(
// zero duration scenes
t=p!=e,f=0===(p=e<1&&o?0:1)?a:c):
// scenes with start and end
e<0&&f!==a&&o?(
// go back to initial state
f=a,t=!(p=0)):0<=e&&e<1&&o?(p=e,f=c,t=!0):1<=e&&f!==u?(p=1,f=u,t=!0):f!==c||o||O(),t){
// fire events
var i={progress:p,state:f,scrollDirection:r},l=f!=n,s=function(e){// tmp helper to simplify code
d.trigger(e,i)};l&&n!==c&&(s("enter"),s(n===a?"start":"end")),s("progress"),l&&f!==c&&(s(f===a?"start":"end"),s("leave"))}return d}// get
return p};
/**
		 * Update the start and end scrollOffset of the container.
		 * The positions reflect what the controller's scroll position will be at the start and end respectively.
		 * Is called, when:
		 *   - Scene event "change" is called with: offset, triggerHook, duration 
		 *   - scroll container event "resize" is called
		 *   - the position of the triggerElement changes
		 *   - the controller changes -> addTo()
		 * @private
		 */
var l=function(){s={start:h+g.offset},v&&g.triggerElement&&(
// take away triggerHook portion to get relative to top
s.start-=v.info("size")*g.triggerHook),s.end=s.start+g.duration},y=function(e){
// update duration
if(i){var t="duration";T(t,i.call(d))&&!e&&(// set
d.trigger("change",{what:t,newval:g[t]}),d.trigger("shift",{reason:t}))}},S=function(e){var t=0,n=g.triggerElement;if(v&&n){// which param is of interest ?
// if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.
for(var r=v.info(),o=D.get.offset(r.container),
// container position is needed because element offset is returned in relation to document, not in relation to container.
i=r.vertical?"top":"left";n.parentNode.hasAttribute(M);)n=n.parentNode;var l=D.get.offset(n);r.isDocument||(// container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
o[i]-=v.scrollPos()),t=l[i]-o[i]}var s=t!=h;h=t,s&&!e&&d.trigger("shift",{reason:"triggerElementPosition"})},E=function(e){0<g.triggerHook&&d.trigger("shift",{reason:"containerResize"})},b=D.extend(k.validate,{
// validation for duration handled internally for reference to private var _durationMethod
duration:function(t){if(D.type.String(t)&&t.match(/^(\.|\d)*\d+%$/)){
// percentage value
var e=parseFloat(t)/100;t=function(){return v?v.info("size")*e:0}}if(D.type.Function(t)){
// function
i=t;try{t=parseFloat(i())}catch(e){t=-1;// will cause error below
}}
// val has to be float
if(t=parseFloat(t),!D.type.Number(t)||t<0)throw i?(i=void 0,['Invalid return value of supplied function for option "duration":',t]):['Invalid value for option "duration":',t];return t}}),R=function(e){(e=arguments.length?[e]:Object.keys(b)).forEach(function(t,e){var n;if(b[t])// there is a validation method for this option
try{// validate value
n=b[t](g[t])}catch(e){// validation failed -> reset to default
n=o[t];var r=D.type.String(e)?[e]:e;D.type.Array(r)?(r[0]="ERROR: "+r[0],r.unshift(1),// loglevel 1 for error msg
w.apply(this,r)):w(1,"ERROR: Problem executing validation callback for option '"+t+"':",e.message)}finally{g[t]=n}})},T=function(e,t){var n=!1,r=g[e];return g[e]!=t&&(g[e]=t,R(e),// resets to default if necessary
n=r!=g[e]),n},C=function(t){d[t]||(d[t]=function(e){return arguments.length?("duration"===t&&(// new duration is set, so any previously set function must be unset
i=void 0),T(t,e)&&(// set
d.trigger("change",{what:t,newval:g[t]}),-1<k.shifts.indexOf(t)&&d.trigger("shift",{reason:t})),d):g[t]})},x,F;
/**
		 * Updates the duration if set to a dynamic function.
		 * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
		 * 
		 * @fires {@link Scene.change}, if the duration changed
		 * @fires {@link Scene.shift}, if the duration changed
		 *
		 * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
		 * @private
		 */
/**
		 * **Get** or **Set** the duration option value.
		 * As a setter it also accepts a function returning a numeric value.  
		 * This is particularly useful for responsive setups.
		 *
		 * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).  
		 * _**NOTE:** Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.  
		 * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)  
		 * This counts double if you use the same function for multiple scenes._
		 *
		 * @method ScrollMagic.Scene#duration
		 * @example
		 * // get the current duration value
		 * var duration = scene.duration();
		 *
		 * // set a new duration
		 * scene.duration(300);
		 *
		 * // use a function to automatically adjust the duration to the window height.
		 * var durationValueCache;
		 * function getDuration () {
		 *   return durationValueCache;
		 * }
		 * function updateDuration (e) {
		 *   durationValueCache = window.innerHeight;
		 * }
		 * $(window).on("resize", updateDuration); // update the duration when the window size changes
		 * $(window).triggerHandler("resize"); // set to initial value
		 * scene.duration(getDuration); // supply duration method
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {(number|function)} [newDuration] - The new duration of the scene.
		 * @returns {number} `get` -  Current scene duration.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** or **Set** the offset option value.
		 * @method ScrollMagic.Scene#offset
		 * @example
		 * // get the current offset
		 * var offset = scene.offset();
		 *
		 * // set a new offset
		 * scene.offset(100);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {number} [newOffset] - The new offset of the scene.
		 * @returns {number} `get` -  Current scene offset.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** or **Set** the triggerElement option value.
		 * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
		 * @method ScrollMagic.Scene#triggerElement
		 * @example
		 * // get the current triggerElement
		 * var triggerElement = scene.triggerElement();
		 *
		 * // set a new triggerElement using a selector
		 * scene.triggerElement("#trigger");
		 * // set a new triggerElement using a DOM object
		 * scene.triggerElement(document.getElementById("trigger"));
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
		 * @returns {(string|object)} `get` -  Current triggerElement.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** or **Set** the triggerHook option value.
		 * @method ScrollMagic.Scene#triggerHook
		 * @example
		 * // get the current triggerHook value
		 * var triggerHook = scene.triggerHook();
		 *
		 * // set a new triggerHook using a string
		 * scene.triggerHook("onLeave");
		 * // set a new triggerHook using a number
		 * scene.triggerHook(0.7);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @fires {@link Scene.shift}, when used as setter
		 * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
		 * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** or **Set** the reverse option value.
		 * @method ScrollMagic.Scene#reverse
		 * @example
		 * // get the current reverse option
		 * var reverse = scene.reverse();
		 *
		 * // set new reverse option
		 * scene.reverse(false);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {boolean} [newReverse] - The new reverse setting of the scene.
		 * @returns {boolean} `get` -  Current reverse option value.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** or **Set** the loglevel option value.
		 * @method ScrollMagic.Scene#loglevel
		 * @example
		 * // get the current loglevel
		 * var loglevel = scene.loglevel();
		 *
		 * // set new loglevel
		 * scene.loglevel(3);
		 *
		 * @fires {@link Scene.change}, when used as setter
		 * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
		 * @returns {number} `get` -  Current loglevel.
		 * @returns {Scene} `set` -  Parent object for chaining.
		 */
/**
		 * **Get** the associated controller.
		 * @method ScrollMagic.Scene#controller
		 * @example
		 * // get the controller of a scene
		 * var controller = scene.controller();
		 *
		 * @returns {ScrollMagic.Controller} Parent controller or `undefined`
		 */
this.controller=function(){return v},
/**
		 * **Get** the current state.
		 * @method ScrollMagic.Scene#state
		 * @example
		 * // get the current state
		 * var state = scene.state();
		 *
		 * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
		 */
this.state=function(){return f},
/**
		 * **Get** the current scroll offset for the start of the scene.  
		 * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
		 * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
		 * @method ScrollMagic.Scene#scrollOffset
		 * @example
		 * // get the current scroll offset for the start and end of the scene.
		 * var start = scene.scrollOffset();
		 * var end = scene.scrollOffset() + scene.duration();
		 * console.log("the scene starts at", start, "and ends at", end);
		 *
		 * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
		 */
this.scrollOffset=function(){return s.start},
/**
		 * **Get** the trigger position of the scene (including the value of the `offset` option).  
		 * @method ScrollMagic.Scene#triggerPosition
		 * @example
		 * // get the scene's trigger position
		 * var triggerPosition = scene.triggerPosition();
		 *
		 * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
		 */
this.triggerPosition=function(){var e=g.offset;// the offset is the basis
return v&&(
// get the trigger position
g.triggerElement?
// Element as trigger
e+=h:
// return the height of the triggerHook to start at the beginning
e+=v.info("size")*d.triggerHook()),e},d.on("shift.internal",function(e){var t="duration"===e.reason;(f===u&&t||f===c&&0===g.duration)&&
// if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
O(),t&&z()}).on("progress.internal",function(e){O()}).on("add.internal",function(e){z()}).on("destroy.internal",function(e){d.removePin(e.reset)});
/**
		 * Update the pin state.
		 * @private
		 */
var O=function(e){if(x&&v){var t=v.info(),n=F.spacer.firstChild;// may be pin element or another spacer, if cascading pins
if(e||f!==c){
// unpinned state
var r={position:F.inFlow?"relative":"absolute",top:0,left:0},o=D.css(n,"position")!=r.position;F.pushFollowers?0<g.duration&&(// only concerns scenes with duration
f===u&&0===parseFloat(D.css(F.spacer,"padding-top"))?o=!0:f===a&&0===parseFloat(D.css(F.spacer,"padding-bottom"))&&(// before
o=!0)):r[t.vertical?"top":"left"]=g.duration*p,
// set new values
D.css(n,r),o&&
// update pin spacer if state changed
z()}else{// during scene or if duration is 0 and we are past the trigger
// pinned state
"fixed"!=D.css(n,"position")&&(
// change state before updating pin spacer (position changes due to fixed collapsing might occur.)
D.css(n,{position:"fixed"}),
// update pin spacer
z());var i=D.get.offset(F.spacer,!0),
// get viewport position of spacer
l=g.reverse||0===g.duration?t.scrollPos-s.start:Math.round(p*g.duration*10)/10;// if no reverse and during pin the position needs to be recalculated using the progress
// add scrollDistance
i[t.vertical?"top":"left"]+=l,
// set new values
D.css(F.spacer.firstChild,{top:i.top,left:i.left})}}},z=function(){if(x&&v&&F.inFlow){// no spacerresize, if original position is absolute
var e=f===u,t=f===a,n=f===c,r=v.info("vertical"),o=F.spacer.firstChild,
// usually the pined element but can also be another spacer (cascaded pins)
i=D.isMarginCollapseType(D.css(F.spacer,"display")),l={};
// set new size
// if relsize: spacer -> pin | else: pin -> spacer
F.relSize.width||F.relSize.autoFullWidth?n?D.css(x,{width:D.get.width(F.spacer)}):D.css(x,{width:"100%"}):(
// minwidth is needed for cascaded pins.
l["min-width"]=D.get.width(r?x:o,!0,!0),l.width=n?l["min-width"]:"auto"),F.relSize.height?n?
// the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
D.css(x,{height:D.get.height(F.spacer)-(F.pushFollowers?g.duration:0)}):D.css(x,{height:"100%"}):(
// margin is only included if it's a cascaded pin to resolve an IE9 bug
l["min-height"]=D.get.height(r?o:x,!0,!i),// needed for cascading pins
l.height=n?l["min-height"]:"auto"),
// add space for duration if pushFollowers is true
F.pushFollowers&&(l["padding"+(r?"Top":"Left")]=g.duration*p,l["padding"+(r?"Bottom":"Right")]=g.duration*(1-p)),D.css(F.spacer,l)}},P=function(){v&&x&&f===c&&!v.info("isDocument")&&O()},A=function(){v&&x&&// well, duh
f===c&&(// element in pinned state?
// is width or height relatively sized, but not in relation to body? then we need to recalc.
(F.relSize.width||F.relSize.autoFullWidth)&&D.get.width(window)!=D.get.width(F.spacer.parentNode)||F.relSize.height&&D.get.height(window)!=D.get.height(F.spacer.parentNode))&&z()},L=function(e){v&&x&&f===c&&!v.info("isDocument")&&(// in pin state
e.preventDefault(),v._setScrollPos(v.info("scrollPos")-((e.wheelDelta||e[v.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};
/**
		 * Update the pin spacer and/or element size.
		 * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
		 * @private
		 */
/**
		 * Pin an element for the duration of the tween.  
		 * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
		 * Make sure only one pin is applied to an element at the same time.
		 * An element can be pinned multiple times, but only successively.
		 * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
		 * @method ScrollMagic.Scene#setPin
		 * @example
		 * // pin element and push all following elements down by the amount of the pin duration.
		 * scene.setPin("#pin");
		 *
		 * // pin element and keeping all following elements in their place. The pinned element will move past them.
		 * scene.setPin("#pin", {pushFollowers: false});
		 *
		 * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
		 * @param {object} [settings] - settings for the pin
		 * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
		 Ignored, when duration is `0`.
		 * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
this.setPin=function(e,t){var n={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(t=D.extend({},n,t),!(
// validate Element
e=D.get.elements(e)[0]))return w(1,"ERROR calling method 'setPin()': Invalid pin element supplied."),d;// cancel
if("fixed"===D.css(e,"position"))return w(1,"ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."),d;// cancel
if(x){// preexisting pin?
if(x===e)
// same pin we already have -> do nothing
return d;// cancel
// kill old pin
d.removePin()}var r=(x=e).parentNode.style.display,o=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];x.parentNode.style.display="none";// hack start to force css to return stylesheet values instead of calculated px values.
var i="absolute"!=D.css(x,"position"),l=D.css(x,o.concat(["display"])),s=D.css(x,["width","height"]);x.parentNode.style.display=r,// hack end.
!i&&t.pushFollowers&&(w(2,"WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."),t.pushFollowers=!1),window.setTimeout(function(){// wait until all finished, because with responsive duration it will only be set after scene is added to controller
x&&0===g.duration&&t.pushFollowers&&w(2,"WARNING: pushFollowers =",!0,"has no effect, when scene duration is 0.")},0);
// create spacer and insert
var a=x.parentNode.insertBefore(document.createElement("div"),x),c=D.extend(l,{position:i?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(i||// copy size if positioned absolutely, to work for bottom/right positioned elements.
D.extend(c,D.css(x,["width","height"])),D.css(a,c),a.setAttribute(M,""),D.addClass(a,t.spacerClass),
// set the pin Options
F={spacer:a,relSize:{// save if size is defined using % values. if so, handle spacer resize differently...
width:"%"===s.width.slice(-1),height:"%"===s.height.slice(-1),autoFullWidth:"auto"===s.width&&i&&D.isMarginCollapseType(l.display)},pushFollowers:t.pushFollowers,inFlow:i},!x.___origStyle){x.___origStyle={};var u=x.style,f;o.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]).forEach(function(e){x.___origStyle[e]=u[e]||""})}
// if relative size, transfer it to spacer and make pin calculate it...
return F.relSize.width&&D.css(a,{width:s.width}),F.relSize.height&&D.css(a,{height:s.height}),
// now place the pin element inside the spacer	
a.appendChild(x),
// and set new css
D.css(x,{position:i?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(F.relSize.width||F.relSize.autoFullWidth)&&D.css(x,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),
// add listener to document to update pin position in case controller is not the document.
window.addEventListener("scroll",P),window.addEventListener("resize",P),window.addEventListener("resize",A),
// add mousewheel listener to catch scrolls over fixed elements
x.addEventListener("mousewheel",L),x.addEventListener("DOMMouseScroll",L),w(3,"added pin"),
// finally update the pin to init
O(),d},
/**
		 * Remove the pin from the scene.
		 * @method ScrollMagic.Scene#removePin
		 * @example
		 * // remove the pin from the scene without resetting it (the spacer is not removed)
		 * scene.removePin();
		 *
		 * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
		 * scene.removePin(true);
		 *
		 * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
		 * @returns {Scene} Parent object for chaining.
		 */
this.removePin=function(e){if(x){if(f===c&&O(!0),e||!v){// if there's no controller no progress was made anyway...
var t=F.spacer.firstChild;// usually the pin element, but may be another spacer (cascaded pins)...
if(t.hasAttribute(M)){// copy margins to child spacer
var n=F.spacer.style,r;margins={},["margin","marginLeft","marginRight","marginTop","marginBottom"].forEach(function(e){margins[e]=n[e]||""}),D.css(t,margins)}F.spacer.parentNode.insertBefore(t,F.spacer),F.spacer.parentNode.removeChild(F.spacer),x.parentNode.hasAttribute(M)||(// if it's the last pin for this element -> restore inline styles
// TODO: only correctly set for first pin (when cascading) - how to fix?
D.css(x,x.___origStyle),delete x.___origStyle)}window.removeEventListener("scroll",P),window.removeEventListener("resize",P),window.removeEventListener("resize",A),x.removeEventListener("mousewheel",L),x.removeEventListener("DOMMouseScroll",L),x=void 0,w(3,"removed pin (reset: "+(e?"true":"false")+")")}return d};var I,N=[];return d.on("destroy.internal",function(e){d.removeClassToggle(e.reset)}),
/**
		 * Define a css class modification while the scene is active.  
		 * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
		 * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
		 * @method ScrollMagic.Scene#setClassToggle
		 * @example
		 * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
		 * scene.setClassToggle("#my-elem", "myclass");
		 *
		 * // add multiple classes to multiple elements defined by the selector '.classChange'
		 * scene.setClassToggle(".classChange", "class1 class2 class3");
		 *
		 * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
		 * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
		 *
		 * @returns {Scene} Parent object for chaining.
		 */
this.setClassToggle=function(e,t){var n=D.get.elements(e);return 0!==n.length&&D.type.String(t)?(0<N.length&&
// remove old ones
d.removeClassToggle(),I=t,N=n,d.on("enter.internal_class leave.internal_class",function(e){var n="enter"===e.type?D.addClass:D.removeClass;N.forEach(function(e,t){n(e,I)})})):w(1,"ERROR calling method 'setClassToggle()': Invalid "+(0===n.length?"element":"classes")+" supplied."),d},
/**
		 * Remove the class binding from the scene.
		 * @method ScrollMagic.Scene#removeClassToggle
		 * @example
		 * // remove class binding from the scene without reset
		 * scene.removeClassToggle();
		 *
		 * // remove class binding and remove the changes it caused
		 * scene.removeClassToggle(true);
		 *
		 * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
		 * @returns {Scene} Parent object for chaining.
		 */
this.removeClassToggle=function(e){return e&&N.forEach(function(e,t){D.removeClass(e,I)}),d.off("start.internal_class end.internal_class"),I=void 0,N=[],d},
// INIT
t(),d};
// store pagewide scene options
var k={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!D.type.Number(e))throw['Invalid value for option "offset":',e];return e},triggerElement:function(e){if(e=e||void 0){var t=D.get.elements(e)[0];if(!t)throw['Element defined in option "triggerElement" was not found:',e];e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(D.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));//  make sure its betweeen 0 and 1
else{if(!(e in t))throw['Invalid value for option "triggerHook": ',e];e=t[e]}return e},reverse:function(e){return!!e;// force boolean
},loglevel:function(e){if(e=parseInt(e),!D.type.Number(e)||e<0||3<e)throw['Invalid value for option "loglevel":',e];return e}},
// holder for  validation methods. duration validation is handled in 'getters-setters.js'
shifts:["duration","offset","triggerHook"]};
/*
 * method used to add an option to ScrollMagic Scenes.
 * TODO: DOC (private for dev)
 */_.Scene.addOption=function(e,t,n,r){e in k.defaults?_._util.log(1,"[static] ScrollMagic.Scene -> Cannot add Scene option '"+e+"', because it already exists."):(k.defaults[e]=t,k.validate[e]=n,r&&k.shifts.push(e))},
// instance extension function for plugins
// TODO: DOC (private for dev)
_.Scene.extend=function(e){var t=this;_.Scene=function(){// copy parent state
return t.apply(this,arguments),this.$super=D.extend({},this),e.apply(this,arguments)||this},D.extend(_.Scene,t),// copy properties
_.Scene.prototype=t.prototype,// copy prototype
_.Scene.prototype.constructor=_.Scene},
/**
	 * TODO: DOCS (private for dev)
	 * @class
	 * @private
	 */
_.Event=function(e,t,n,r){for(var o in r=r||{})this[o]=r[o];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};
/*
 * TODO: DOCS (private for dev)
 */
var D=_._util=function(l){var e={},n,s=function(e){return parseFloat(e)||0},a=function(e){return e.currentStyle?e.currentStyle:l.getComputedStyle(e)},r=function(e,t,n,r){if((t=t===document?l:t)===l)r=!1;else if(!p.DomElement(t))return 0;e=e.charAt(0).toUpperCase()+e.substr(1).toLowerCase();var o=(n?t["offset"+e]||t["outer"+e]:t["client"+e]||t["inner"+e])||0;if(n&&r){var i=a(t);o+="Height"===e?s(i.marginTop)+s(i.marginBottom):s(i.marginLeft)+s(i.marginRight)}return o},c=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};
/**
		 * ------------------------------
		 * internal helpers
		 * ------------------------------
		 */
// parse float and fall back to 0.
/**
		 * ------------------------------
		 * external helpers
		 * ------------------------------
		 */
// extend obj – same as jQuery.extend({}, objA, objB)
e.extend=function(e){for(e=e||{},n=1;n<arguments.length;n++)if(arguments[n])for(var t in arguments[n])arguments[n].hasOwnProperty(t)&&(e[t]=arguments[n][t]);return e},
// check if a css display type results in margin-collapse or not
e.isMarginCollapseType=function(e){return-1<["block","flex","list-item","table","-webkit-box"].indexOf(e)};
// implementation of requestAnimationFrame
// based on https://gist.github.com/paulirish/1579671
var o=0,t=["ms","moz","webkit","o"],i=l.requestAnimationFrame,u=l.cancelAnimationFrame;
// try vendor prefixes if the above doesn't work
for(n=0;!i&&n<t.length;++n)i=l[t[n]+"RequestAnimationFrame"],u=l[t[n]+"CancelAnimationFrame"]||l[t[n]+"CancelRequestAnimationFrame"];
// fallbacks
i||(i=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-o)),r=l.setTimeout(function(){e(t+n)},n);return o=t+n,r}),u||(u=function(e){l.clearTimeout(e)}),e.rAF=i.bind(l),e.cAF=u.bind(l);var f=["error","warn","log"],d=l.console||{};// no console log, well - do nothing then...
// make sure methods for all levels exist.
for(d.log=d.log||function(){},n=0;n<f.length;n++){var g=f[n];d[g]||(d[g]=d.log)}e.log=function(e){(e>f.length||e<=0)&&(e=f.length);var t=new Date,n=("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)+":"+("00"+t.getMilliseconds()).slice(-3),r=f[e-1],o=Array.prototype.splice.call(arguments,1),i=Function.prototype.bind.call(d[r],d);o.unshift(n),i.apply(d,o)};
/**
		 * ------------------------------
		 * type testing
		 * ------------------------------
		 */
var p=e.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};p.String=function(e){return"string"===p(e)},p.Function=function(e){return"function"===p(e)},p.Array=function(e){return Array.isArray(e)},p.Number=function(e){return!p.Array(e)&&0<=e-parseFloat(e)+1},p.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement://DOM2
e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};
/**
		 * ------------------------------
		 * DOM Element info
		 * ------------------------------
		 */
// always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors
var h=e.get={};return h.elements=function(e){var t=[];if(p.String(e))try{e=document.querySelectorAll(e)}catch(e){// invalid selector
return t}if("nodelist"===p(e)||p.Array(e))for(var n=0,r=t.length=e.length;n<r;n++){// list of elements
var o=e[n];t[n]=p.DomElement(o)?o:h.elements(o)}else(p.DomElement(e)||e===document||e===l)&&(t=[e]);return t},
// get scroll top value
h.scrollTop=function(e){return e&&"number"==typeof e.scrollTop?e.scrollTop:l.pageYOffset||0},
// get scroll left value
h.scrollLeft=function(e){return e&&"number"==typeof e.scrollLeft?e.scrollLeft:l.pageXOffset||0},
// get element height
h.width=function(e,t,n){return r("width",e,t,n)},
// get element width
h.height=function(e,t,n){return r("height",e,t,n)},
// get element position (optionally relative to viewport)
h.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){// check if available
var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(// clientRect is by default relative to viewport...
n.top+=h.scrollTop(),n.left+=h.scrollLeft())}return n},
/**
		 * ------------------------------
		 * DOM Element manipulation
		 * ------------------------------
		 */
e.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},e.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},
// if options is string -> returns css value
// if options is array -> returns object with css value pairs
// if options is object -> set new css values
e.css=function(e,t){if(p.String(t))return a(e)[c(t)];if(p.Array(t)){var n={},r=a(e);return t.forEach(function(e,t){n[e]=r[c(e)]}),n}for(var o in t){var i=t[o];i==parseFloat(i)&&(// assume pixel for seemingly numerical values
i+="px"),e.style[c(o)]=i}},e}(window||{});return _.Scene.prototype.addIndicators=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},_.Scene.prototype.removeIndicators=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},_.Scene.prototype.setTween=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},_.Scene.prototype.removeTween=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},_.Scene.prototype.setVelocity=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},_.Scene.prototype.removeVelocity=function(){return _._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},_});