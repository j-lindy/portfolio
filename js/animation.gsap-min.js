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
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */
/**
 * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
 * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
 *
 * Both the `lite` and the `max` versions of the GSAP library are supported.  
 * The most basic requirement is `TweenLite`.
 * 
 * To have access to this extension, please include `plugins/animation.gsap.js`.
 * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
 * @mixin animation.GSAP
 */
!function(e,n){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["ScrollMagic","TweenMax","TimelineMax"],n):"object"==typeof exports?(
// CommonJS
// Loads whole gsap package onto global scope.
require("gsap"),n(require("scrollmagic"),TweenMax,TimelineMax)):
// Browser globals
n(e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic,e.TweenMax||e.TweenLite,e.TimelineMax||e.TimelineLite)}(this,function(e,w,h){"use strict";var n="animation.gsap",o=window.console||{},t=Function.prototype.bind.call(o.error||o.log||function(){},o);e||t("("+n+") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."),w||t("("+n+") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs."),
/*
	 * ----------------------------------------------------------------
	 * Extensions for Scene
	 * ----------------------------------------------------------------
	 */
/**
	 * Every instance of ScrollMagic.Scene now accepts an additional option.  
	 * See {@link ScrollMagic.Scene} for a complete list of the standard options.
	 * @memberof! animation.GSAP#
	 * @method new ScrollMagic.Scene(options)
	 * @example
	 * var scene = new ScrollMagic.Scene({tweenChanges: true});
	 *
	 * @param {object} [options] - Options for the Scene. The options can be updated at any time.
	 * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
	 Does not affect animations where duration is `0`.
	 */
/**
	 * **Get** or **Set** the tweenChanges option value.  
	 * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
	 * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
	 * @memberof! animation.GSAP#
	 * @method Scene.tweenChanges
	 * 
	 * @example
	 * // get the current tweenChanges option
	 * var tweenChanges = scene.tweenChanges();
	 *
	 * // set new tweenChanges option
	 * scene.tweenChanges(true);
	 *
	 * @fires {@link Scene.change}, when used as setter
	 * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
	 * @returns {boolean} `get` -  Current tweenChanges option value.
	 * @returns {Scene} `set` -  Parent object for chaining.
	 */
// add option (TODO: DOC (private for dev))
e.Scene.addOption("tweenChanges",// name
!1,// default
function(e){// validation callback
return!!e}),
// extend scene
e.Scene.extend(function(){var p=this,d,g=function(){p._log&&(// not available, when main source minified
Array.prototype.splice.call(arguments,1,0,"("+n+")","->"),p._log.apply(this,arguments))};
// set listeners
p.on("progress.plugin_gsap",function(){f()}),p.on("destroy.plugin_gsap",function(e){p.removeTween(e.reset)});
/**
		 * Update the tween progress to current position.
		 * @private
		 */
var f=function(){if(d){var e=p.progress(),n=p.state();d.repeat&&-1===d.repeat()?
// infinite loop, so not in relation to progress
"DURING"===n&&d.paused()?d.play():"DURING"===n||d.paused()||d.pause():e!=d.progress()&&(// do we even need to update the progress?
// no infinite loop - so should we just play or go to a specific point in time?
0===p.duration()?
// play the animation
0<e?// play from 0 to 1
d.play():// play from 1 to 0
d.reverse():
// go to a specific point in time
p.tweenChanges()&&d.tweenTo?
// go smooth
d.tweenTo(e*d.duration()):
// just hard set it
d.progress(e).pause())}};
/**
		 * Add a tween to the scene.  
		 * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
		 * 
		 * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
		 * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
		 * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
		 *
		 * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
		 * @memberof! animation.GSAP#
		 *
		 * @example
		 * // add a single tween directly
		 * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
		 *
		 * // add a single tween via variable
		 * var tween = TweenMax.to("obj"), 1, {x: 100};
		 * scene.setTween(tween);
		 *
		 * // add multiple tweens, wrapped in a timeline.
		 * var timeline = new TimelineMax();
		 * var tween1 = TweenMax.from("obj1", 1, {x: 100});
		 * var tween2 = TweenMax.to("obj2", 1, {y: 100});
		 * timeline
		 *		.add(tween1)
		 *		.add(tween2);
		 * scene.addTween(timeline);
		 *
		 * // short hand to add a TweenMax.to() tween
		 * scene.setTween("obj3", 0.5, {y: 100});
		 *
		 * // short hand to add a TweenMax.to() tween for 1 second
		 * // this is useful, when the scene has a duration and the tween duration isn't important anyway
		 * scene.setTween("obj3", {y: 100});
		 *
		 * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
		 * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
		 * @param {object} params - The parameters for the tween
		 * @returns {Scene} Parent object for chaining.
		 */p.setTween=function(e,n,o){var t;1<arguments.length&&(arguments.length<3&&(o=n,n=1),e=w.to(e,n,o));try{
// wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
(t=h?new h({smoothChildTiming:!0}).add(e):e).pause()}catch(e){return g(1,"ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject"),p}
// check if there are position tweens defined for the trigger and warn about it :)
if(d&&// kill old tween?
p.removeTween(),d=t,
// some properties need to be transferred it to the wrapper, otherwise they would get lost.
e.repeat&&-1===e.repeat()&&(// TweenMax or TimelineMax Object?
d.repeat(-1),d.yoyo(e.yoyo())),
// Some tween validations and debugging helpers
p.tweenChanges()&&!d.tweenTo&&g(2,"WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic."),d&&p.controller()&&p.triggerElement()&&2<=p.loglevel()){// controller is needed to know scroll direction.
var r=w.getTweensOf(p.triggerElement()),i=p.controller().info("vertical");r.forEach(function(e,n){var o=e.vars.css||e.vars,t;if(i?void 0!==o.top||void 0!==o.bottom:void 0!==o.left||void 0!==o.right)return g(2,"WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!"),!1})}
// warn about tween overwrites, when an element is tweened multiple times
if(1.14<=parseFloat(TweenLite.version))for(// onOverwrite only present since GSAP v1.14.0
var a=d.getChildren?d.getChildren(!0,!0,!1):[d],
// get all nested tween objects
l=function(){g(2,"WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another")},s=0,c,u;s<a.length;s++)/*jshint loopfunc: true */
c=a[s],u!==l&&(// if tweens is added more than once
u=c.vars.onOverwrite,c.vars.onOverwrite=function(){u&&u.apply(this,arguments),l.apply(this,arguments)});return g(3,"added tween"),f(),p},
/**
		 * Remove the tween from the scene.  
		 * This will terminate the control of the Scene over the tween.
		 *
		 * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
		 * @memberof! animation.GSAP#
		 *
		 * @example
		 * // remove the tween from the scene without resetting it
		 * scene.removeTween();
		 *
		 * // remove the tween from the scene and reset it to initial position
		 * scene.removeTween(true);
		 *
		 * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
		 * @returns {Scene} Parent object for chaining.
		 */
p.removeTween=function(e){return d&&(e&&d.progress(0).pause(),d.kill(),d=void 0,g(3,"removed tween (reset: "+(e?"true":"false")+")")),p}})});