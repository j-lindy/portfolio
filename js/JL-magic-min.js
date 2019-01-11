$(document).ready(function(){
// disable all greensock js for ie11
var e=void 0!==document.documentMode,n=11===document.documentMode;
// browser is IE
e&&isIE11;var t=new ScrollMagic.Controller,a=$(window).height();
// Oneten Icon Z Shift
new ScrollMagic.Scene({triggerElement:"#trgr-oneten-mark-in",duration:.5*a}).setTween("#oneten-mark",{filter:"blur(0vw)",transform:"translateZ(0vw)"}).addIndicators({name:"Oneten Mark In"}).addTo(t);
// Sub Nav
var s=new ScrollMagic.Scene({triggerElement:"#trigger-sub-nav-pin",duration:0}).on("enter",function(){$("#sub-nav").addClass("fixed")}).on("leave",function(){$("#sub-nav").removeClass("fixed")}).addIndicators({name:"Sub Nav"}).addTo(t),r=new ScrollMagic.Controller({globalSceneOptions:{triggerHook:"onLeave"}}),o=$("#trgr-mission-section").outerHeight();
// Nav 1 Progress Bar
new ScrollMagic.Scene({triggerElement:"#trgr-mission-section",duration:o}).setTween("#nav-1",{width:"100%"}).addIndicators({name:"progress bar 1"}).addTo(r);
// Nav 2 Progress Bar
var i=$("#trgr-journey-section").outerHeight();new ScrollMagic.Scene({triggerElement:"#trgr-journey-section",duration:i}).setTween("#nav-2",{width:"100%"}).addIndicators({name:"progress bar 2"}).addTo(r);
// Nav 3 Progress Bar
var d=$("#trgr-unity-section").outerHeight();new ScrollMagic.Scene({triggerElement:"#trgr-unity-section",duration:d}).setTween("#nav-3",{width:"100%"}).addIndicators({name:"progress bar 3"}).addTo(r),
// Unity Text
new ScrollMagic.Scene({triggerElement:"#trgr-unity-text-in",duration:0}).on("enter",function(){$("#unity-text").addClass("text-in"),$("#unity-text").removeClass("text-start")}).on("leave",function(){$("#unity-text").addClass("text-start"),$("#unity-text").removeClass("text-in")}).addIndicators({name:"Unity Text"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-unity-text-out",duration:0}).on("enter",function(){$("#unity-text").addClass("text-out blur"),$("#unity-text").removeClass("text-in no-blur")}).on("leave",function(){$("#unity-text").addClass("text-in no-blur"),$("#unity-text").removeClass("text-out blur")}).addIndicators({name:"Unity Text Out"}).addTo(t),
// Unity Red
new ScrollMagic.Scene({triggerElement:"#trgr-unity-red",duration:0}).on("enter",function(){$("#unity-red").addClass("underline0-in"),$("#unity-red").removeClass("underline0-out")}).on("leave",function(){$("#unity-red").addClass("underline0-out"),$("#unity-red").removeClass("underline0-in")}).addIndicators({name:"Unity Red"}).addTo(t),
// Mission Text
new ScrollMagic.Scene({triggerElement:"#trgr-mission-text-in",duration:0}).on("enter",function(){$("#mission-text").addClass("text-in"),$("#mission-text").removeClass("text-start")}).on("leave",function(){$("#mission-text").addClass("text-start"),$("#mission-text").removeClass("text-in")}).addIndicators({name:"Mission Text"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-mission-text-out",duration:0}).on("enter",function(){$("#mission-text").addClass("text-out blur"),$("#mission-text").removeClass("text-in no-blur")}).on("leave",function(){$("#mission-text").addClass("text-in no-blur"),$("#mission-text").removeClass("text-out blur")}).addIndicators({name:"Mission Text Out"}).addTo(t),
// Mission Red
new ScrollMagic.Scene({triggerElement:"#trgr-mission-red",duration:0}).on("enter",function(){$("#mission-red").addClass("underline0-in"),$("#mission-red").removeClass("underline0-out")}).on("leave",function(){$("#mission-red").addClass("underline0-out"),$("#mission-red").removeClass("underline0-in")}).addIndicators({name:"Mission Red"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-mission-red-m",duration:0}).on("enter",function(){$("#mission-red-m").addClass("underline0-in"),$("#mission-red-m").removeClass("underline0-out")}).on("leave",function(){$("#mission-red-m").addClass("underline0-out"),$("#mission-red-m").removeClass("underline0-in")}).addIndicators({name:"Mission Red-m"}).addTo(t),
// LOB Logo Cycle
//var scene = new ScrollMagic.Scene({triggerElement: "#trgr-lob-cycle-in"})
//    .setPin("#lob-cycle-pin")
//    .addIndicators({name: "LOB Cycle (duration: 0)"}) // add indicators (requires plugin)
//   .addTo(controller);
// History Text
new ScrollMagic.Scene({triggerElement:"#trgr-history-text-in",duration:0}).on("enter",function(){$("#history-text").addClass("text-in"),$("#history-text").removeClass("text-start")}).on("leave",function(){$("#history-text").addClass("text-start"),$("#history-text").removeClass("text-in")}).addIndicators({name:"History Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-history-text-out",duration:0}).on("enter",function(){$("#history-text").addClass("text-out blur"),$("#history-text").removeClass("text-in no-blur")}).on("leave",function(){$("#history-text").addClass("text-in no-blur"),$("#history-text").removeClass("text-out blur")}).addIndicators({name:"History Text Out"}).addTo(t),
// History Red
new ScrollMagic.Scene({triggerElement:"#trgr-history-red",duration:0}).on("enter",function(){$("#history-red1").addClass("underline1-in"),$("#history-red1").removeClass("underline1-out"),$("#history-red2").addClass("underline2-in"),$("#history-red2").removeClass("underline2-out")}).on("leave",function(){$("#history-red1").addClass("underline1-out"),$("#history-red1").removeClass("underline1-in"),$("#history-red2").addClass("underline2-out"),$("#history-red2").removeClass("underline2-in")}).addIndicators({name:"Section 1 Red"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-history-red-m",duration:0}).on("enter",function(){$("#history-red1-m").addClass("underline1-in"),$("#history-red1-m").removeClass("underline1-out")}).on("leave",function(){$("#history-red1-m").addClass("underline1-out"),$("#history-red1-m").removeClass("underline1-in")}).addIndicators({name:"Section 1 Red-m"}).addTo(t),
// Rocket and Charlie Movement
new ScrollMagic.Scene({triggerElement:"#trgr-rocket-image",duration:1*a}).setTween("#rocket",{marginTop:"-30vmin"}).addIndicators({name:"Rocket"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-rocket-image",duration:1*a}).setTween("#dish-charlie",{bottom:"70vmin"}).addIndicators({name:"Dish and Charlie"}).addTo(t),
// Van Text
new ScrollMagic.Scene({triggerElement:"#trgr-van-text-in",duration:0}).on("enter",function(){$("#van-text").addClass("text-in"),$("#van-text").removeClass("text-start")}).on("leave",function(){$("#van-text").addClass("text-start"),$("#van-text").removeClass("text-in")}).addIndicators({name:"Van Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-van-text-out",duration:0}).on("enter",function(){$("#van-text").addClass("text-out blur"),$("#van-text").removeClass("text-in no-blur")}).on("leave",function(){$("#van-text").addClass("text-in no-blur"),$("#van-text").removeClass("text-out blur")}).addIndicators({name:"Van Text Out"}).addTo(t),
// Van Red
new ScrollMagic.Scene({triggerElement:"#trgr-van-red",duration:0}).on("enter",function(){$("#van-red").addClass("underline0-in"),$("#van-red").removeClass("underline0-out")}).on("leave",function(){$("#van-red").addClass("underline0-out"),$("#van-red").removeClass("underline0-in")}).addIndicators({name:"Van Red"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-van-red-m",duration:0}).on("enter",function(){$("#van-red-m").addClass("underline0-in"),$("#van-red-m").removeClass("underline0-out")}).on("leave",function(){$("#van-red-m").addClass("underline0-out"),$("#van-red-m").removeClass("underline0-in")}).addIndicators({name:"Van Red"}).addTo(t),
// Sling TV Movement
new ScrollMagic.Scene({triggerElement:"#trgr-slingtv-image",duration:1*a}).setTween("#sling-tv",{marginTop:"-30vmin"}).addIndicators({name:"Sling TV"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-slingtv-image",duration:1*a}).setTween("#ipad-sling",{bottom:"70vmin"}).addIndicators({name:"iPad Sling"}).addTo(t);
// Tech Text
var l="#tech-text";new ScrollMagic.Scene({triggerElement:"#trgr-tech-text-in",duration:0}).on("enter",function(){$(l).addClass("text-in"),$(l).removeClass("text-start")}).on("leave",function(){$(l).addClass("text-start"),$(l).removeClass("text-in")}).addIndicators({name:"Tech Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-tech-text-out",duration:0}).on("enter",function(){$(l).addClass("text-out blur"),$(l).removeClass("text-in no-blur")}).on("leave",function(){$(l).addClass("text-in no-blur"),$(l).removeClass("text-out blur")}).addIndicators({name:"Tech Text Out"}).addTo(t),
// Tech Red
new ScrollMagic.Scene({triggerElement:"#trgr-tech-red",duration:0}).on("enter",function(){$("#tech-red").addClass("underline0-in"),$("#tech-red").removeClass("underline0-out")}).on("leave",function(){$("#tech-red").addClass("underline0-out"),$("#tech-red").removeClass("underline0-in")}).addIndicators({name:"Tech Red"}).addTo(t),
// Beacon Text
//var dishId = "#dish-text"
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-text-in",duration:0}).on("enter",function(){$("#beacon-text").addClass("text-in"),$("#beacon-text").removeClass("text-start")}).on("leave",function(){$("#beacon-text").addClass("text-start"),$("#beacon-text").removeClass("text-in")}).addIndicators({name:"beacon Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-beacon-text-out",duration:0}).on("enter",function(){$("#beacon-text").addClass("text-out blur"),$("#beacon-text").removeClass("text-in no-blur")}).on("leave",function(){$("#beacon-text").addClass("text-in no-blur"),$("#beacon-text").removeClass("text-out blur")}).addIndicators({name:"beacon Text Out"}).addTo(t),
// beacon Red
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-red",duration:0}).on("enter",function(){$("#lob-beacon-red").addClass("underline0-in"),$("#lob-beacon-red").removeClass("underline0-out")}).on("leave",function(){$("#lob-beacon-red").addClass("underline0-out"),$("#lob-beacon-red").removeClass("underline0-in")}).addIndicators({name:"beacon Red"}).addTo(t),
// beacon Logo
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-logo",duration:0}).on("enter",function(){$("#beacon-logo").addClass("no-blur"),$("#beacon-logo").removeClass("fade blur")}).on("leave",function(){$("#beacon-logo").addClass("fade blur"),$("#beacon-logo").removeClass("no-blur")}).addIndicators({name:"Beacon Logo"}).addTo(t),
// Dish Logo
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-dish-logo",duration:0}).on("enter",function(){$("#beacon-dish-logo").addClass("no-blur"),$("#beacon-dish-logo").removeClass("fade blur")}).on("leave",function(){$("#beacon-dish-logo").addClass("fade blur"),$("#beacon-dish-logo").removeClass("no-blur")}).addIndicators({name:"Beacon Dish"}).addTo(t),
// DISH Brand Image
new ScrollMagic.Scene({triggerElement:"#trgr-dish-brand-image",duration:1*a}).setTween("#dish-brand",{marginTop:"-30vmin"}).addIndicators({name:"DISH Brand"}).addTo(t),
// DISH H1 Text
new ScrollMagic.Scene({triggerElement:"#trgr-dish-h1-text-in",duration:0}).on("enter",function(){$("#dish-h1-text").addClass("text-in"),$("#dish-h1-text").removeClass("text-start")}).on("leave",function(){$("#dish-h1-text").addClass("text-start"),$("#dish-h1-text").removeClass("text-in")}).addIndicators({name:"DISH H1 Text"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-dish-h1-text-out",duration:0}).on("enter",function(){$("#dish-h1-text").addClass("text-out blur"),$("#dish-h1-text").removeClass("text-in no-blur")}).on("leave",function(){$("#dish-h1-text").addClass("text-in no-blur"),$("#dish-h1-text").removeClass("text-out blur")}).addIndicators({name:"DISH H1 Text Out"}).addTo(t),
// DISH H1 Red
new ScrollMagic.Scene({triggerElement:"#trgr-dish-h1-red",duration:0}).on("enter",function(){$("#dish-h1-red").addClass("underline0-in"),$("#dish-h1-red").removeClass("underline0-out")}).on("leave",function(){$("#dish-h1-red").addClass("underline0-out"),$("#dish-h1-red").removeClass("underline0-in")}).addIndicators({name:"DISH H1 Red"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-dish-h1-red-m",duration:0}).on("enter",function(){$("#dish-h1-red-m").addClass("underline0-in"),$("#dish-h1-red-m").removeClass("underline0-out")}).on("leave",function(){$("#dish-h1-red-m").addClass("underline0-out"),$("#dish-h1-red-m").removeClass("underline0-in")}).addIndicators({name:"DISH H1 Red-m"}).addTo(t),
// DISH to DISH
new ScrollMagic.Scene({triggerElement:"#trgr-dish-dish",duration:0}).on("enter",function(){$("#dish-dish-section").addClass("dish-dish-block-in"),$("#dish-dish-section").removeClass("dish-dish-block-out")}).on("leave",function(){$("#dish-dish-section").addClass("dish-dish-block-out"),$("#dish-dish-section").removeClass("dish-dish-block-in")}).addIndicators({name:"DISH DISH"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-dish-dish-finish",duration:0}).on("enter",function(){$("#dish-dish-section").addClass("dish-dish-block-finish"),$("#dish-dish-section").removeClass("dish-dish-block-in")}).on("leave",function(){$("#dish-dish-section").addClass("dish-dish-block-in"),$("#dish-dish-section").removeClass("dish-dish-block-finish")}).addIndicators({name:"DISH DISH"}).addTo(t),
// DISH Text
//var dishId = "#dish-text"
new ScrollMagic.Scene({triggerElement:"#trgr-dish-text-in",duration:0}).on("enter",function(){$("#dish-text").addClass("text-in"),$("#dish-text").removeClass("text-start")}).on("leave",function(){$("#dish-text").addClass("text-start"),$("#dish-text").removeClass("text-in")}).addIndicators({name:"DISH Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-dish-text-out",duration:0}).on("enter",function(){$("#dish-text").addClass("text-out blur"),$("#dish-text").removeClass("text-in no-blur")}).on("leave",function(){$("#dish-text").addClass("text-in no-blur"),$("#dish-text").removeClass("text-out blur")}).addIndicators({name:"DISH Text Out"}).addTo(t),
// DISH Red
new ScrollMagic.Scene({triggerElement:"#trgr-dish-red",duration:0}).on("enter",function(){$("#lob-dish-red").addClass("underline0-in"),$("#lob-dish-red").removeClass("underline0-out")}).on("leave",function(){$("#lob-dish-red").addClass("underline0-out"),$("#lob-dish-red").removeClass("underline0-in")}).addIndicators({name:"DISH Red"}).addTo(t);
// LOB Cycles
var s=$(".lob-block"),c=$(window).height();$(window).resize(function(){c=$(window).height()});
// Initialise the scrollmagic controller
var u=new ScrollMagic.Controller({globalSceneOptions:{triggerHook:"onLeave"}});
// Loop through each scene and create a new
// scrollmagic scene for each one
s.each(function(){var e=new ScrollMagic.Scene({triggerElement:this,duration:600,triggerHook:"onEnter"}).setPin(this).addTo(u).addIndicators({name:"pinned images"});// add indicators (requires plugin)
//.setClassToggle( this, 'is-active' )
}),
// Dish Outdoors
new ScrollMagic.Scene({triggerElement:"#trgr-lob-cycle-outdoor",duration:0}).on("enter",function(){$("#lob-outdoors-mask").addClass("lob-mask-finish"),$("#lob-outdoors-mask").removeClass("lob-mask-start")}).on("leave",function(){$("#lob-outdoors-mask").addClass("lob-mask-start"),$("#lob-outdoors-mask").removeClass("lob-mask-finish")}).addIndicators({name:"Outdoors Reveal"}).addTo(t),
// Dish manufacturing
new ScrollMagic.Scene({triggerElement:"#trgr-lob-cycle-manufacturing",duration:0}).on("enter",function(){$("#lob-manufacturing-mask").addClass("lob-mask-finish"),$("#lob-manufacturing-mask").removeClass("lob-mask-start")}).on("leave",function(){$("#lob-manufacturing-mask").addClass("lob-mask-start"),$("#lob-manufacturing-mask").removeClass("lob-mask-finish")}).addIndicators({name:"manufacturing Reveal"}).addTo(t),
// Dish media
new ScrollMagic.Scene({triggerElement:"#trgr-lob-cycle-media",duration:0}).on("enter",function(){$("#lob-media-mask").addClass("lob-mask-finish"),$("#lob-media-mask").removeClass("lob-mask-start")}).on("leave",function(){$("#lob-media-mask").addClass("lob-mask-start"),$("#lob-media-mask").removeClass("lob-mask-finish")}).addIndicators({name:"media Reveal"}).addTo(t),
// Dish business
new ScrollMagic.Scene({triggerElement:"#trgr-lob-cycle-business",duration:0}).on("enter",function(){$("#lob-business-mask").addClass("lob-mask-finish"),$("#lob-business-mask").removeClass("lob-mask-start")}).on("leave",function(){$("#lob-business-mask").addClass("lob-mask-start"),$("#lob-business-mask").removeClass("lob-mask-finish")}).addIndicators({name:"business Reveal"}).addTo(t),
// Sling Logo
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-sling-logo",duration:0}).on("enter",function(){$("#beacon-sling-logo").addClass("no-blur"),$("#beacon-sling-logo").removeClass("fade blur")}).on("leave",function(){$("#beacon-sling-logo").addClass("fade blur"),$("#beacon-sling-logo").removeClass("no-blur")}).addIndicators({name:"Beacon Sling"}).addTo(t),
// Sling Brand Image
new ScrollMagic.Scene({triggerElement:"#trgr-sling-brand-image",duration:1*a}).setTween("#sling-brand",{marginTop:"-30vmin"}).addIndicators({name:"Sling Brand"}).addTo(t),
// sling to sling
new ScrollMagic.Scene({triggerElement:"#trgr-sling-sling",duration:0}).on("enter",function(){$("#sling-sling-section").addClass("sling-sling-block-in"),$("#sling-sling-section").removeClass("sling-sling-block-out")}).on("leave",function(){$("#sling-sling-section").addClass("sling-sling-block-out"),$("#sling-sling-section").removeClass("sling-sling-block-in")}).addIndicators({name:"sling sling"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-sling-sling-finish",duration:0}).on("enter",function(){$("#sling-sling-section").addClass("sling-sling-block-finish"),$("#sling-sling-section").removeClass("sling-sling-block-in")}).on("leave",function(){$("#sling-sling-section").addClass("sling-sling-block-in"),$("#sling-sling-section").removeClass("sling-sling-block-finish")}).addIndicators({name:"sling sling"}).addTo(t),
// sling Text
new ScrollMagic.Scene({triggerElement:"#trgr-sling-text-in",duration:0}).on("enter",function(){$("#sling-text").addClass("text-in"),$("#sling-text").removeClass("text-start")}).on("leave",function(){$("#sling-text").addClass("text-start"),$("#sling-text").removeClass("text-in")}).addIndicators({name:"sling Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-sling-text-out",duration:0}).on("enter",function(){$("#sling-text").addClass("text-out blur"),$("#sling-text").removeClass("text-in no-blur")}).on("leave",function(){$("#sling-text").addClass("text-in no-blur"),$("#sling-text").removeClass("text-out blur")}).addIndicators({name:"sling Text Out"}).addTo(t),
// sling Underline
new ScrollMagic.Scene({triggerElement:"#trgr-sling-text-ul",duration:0}).on("enter",function(){$("#sling-text-ul").addClass("underline0-in"),$("#sling-text-ul").removeClass("underline0-out")}).on("leave",function(){$("#sling-text-ul").addClass("underline0-out"),$("#sling-text-ul").removeClass("underline0-in")}).addIndicators({name:"Sling Text Underline"}).addTo(t),
// SHS Logo
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-smart-home-logo",duration:0}).on("enter",function(){$("#beacon-smart-home-logo").addClass("no-blur"),$("#beacon-smart-home-logo").removeClass("fade blur")}).on("leave",function(){$("#beacon-smart-home-logo").addClass("fade blur"),$("#beacon-smart-home-logo").removeClass("no-blur")}).addIndicators({name:"Beacon Smart Home"}).addTo(t),
// IHS Image Movement
/*
new ScrollMagic.Scene({triggerElement: "#trgr-ihs-image", duration: (windowHeight*1)})
// animate color and top border in relation to scroll position
.setTween("#ihs-img", {marginTop: "-40vmin"}) // the tween durtion can be omitted and defaults to 1
.addIndicators({name: "IHS Image"}) // add indicators (requires plugin)
.addTo(controller);
*/
// SHS Nest Image
new ScrollMagic.Scene({triggerElement:"#trgr-shs-image",duration:1*a}).setTween("#shs-nest",{marginTop:"-30vmin"}).addIndicators({name:"SHS and Nest"}).addTo(t);
// IHS Text
var g="#ihs-text";new ScrollMagic.Scene({triggerElement:"#trgr-ihs-text-in",duration:0}).on("enter",function(){$(g).addClass("text-in"),$(g).removeClass("text-start")}).on("leave",function(){$(g).addClass("text-start"),$(g).removeClass("text-in")}).addIndicators({name:"DISH Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-ihs-text-out",duration:0}).on("enter",function(){$(g).addClass("text-out blur"),$(g).removeClass("text-in no-blur")}).on("leave",function(){$(g).addClass("text-in no-blur"),$(g).removeClass("text-out blur")}).addIndicators({name:"IHS Text Out"}).addTo(t),
// IHS Red
new ScrollMagic.Scene({triggerElement:"#trgr-ihs-blue",duration:0}).on("enter",function(){$("#ihs-blue1").addClass("underline1-in"),$("#ihs-blue1").removeClass("underline1-out"),$("#ihs-blue2").addClass("underline2-in"),$("#ihs-blue2").removeClass("underline2-out")}).on("leave",function(){$("#ihs-blue1").addClass("underline1-out"),$("#ihs-blue1").removeClass("underline1-in"),$("#ihs-blue2").addClass("underline2-out"),$("#ihs-blue2").removeClass("underline2-in")}).addIndicators({name:"IHS blue"}).addTo(t),
// SHS Cards 1 and 2
new ScrollMagic.Scene({triggerElement:"#trgr-cards-1-2",duration:0}).on("enter",function(){$("#card-1").addClass("shs-card-in"),$("#card-1").removeClass("shs-card-out fade"),$("#card-2").addClass("shs-card-in"),$("#card-2").removeClass("shs-card-out fade")}).on("leave",function(){$("#card-1").addClass("shs-card-out fade"),$("#card-1").removeClass("shs-card-in"),$("#card-2").addClass("shs-card-out fade"),$("#card-2").removeClass("shs-card-in")}).addIndicators({name:"Cards 1 and 2"}).addTo(t),
// SHS Cards 3 and 4
new ScrollMagic.Scene({triggerElement:"#trgr-cards-3-4",duration:0}).on("enter",function(){$("#card-3").addClass("shs-card-in"),$("#card-3").removeClass("shs-card-out fade"),$("#card-4").addClass("shs-card-in"),$("#card-4").removeClass("shs-card-out fade")}).on("leave",function(){$("#card-3").addClass("shs-card-out fade"),$("#card-3").removeClass("shs-card-in"),$("#card-4").addClass("shs-card-out fade"),$("#card-4").removeClass("shs-card-in")}).addIndicators({name:"Cards 3 and 4"}).addTo(t),
// Wireless Logo
new ScrollMagic.Scene({triggerElement:"#trgr-beacon-wireless-logo",duration:0}).on("enter",function(){$("#beacon-wireless-logo").addClass("no-blur"),$("#beacon-wireless-logo").removeClass("fade blur")}).on("leave",function(){$("#beacon-wireless-logo").addClass("fade blur"),$("#beacon-wireless-logo").removeClass("no-blur")}).addIndicators({name:"Beacon Wireless"}).addTo(t),
// Tower 1 Image
new ScrollMagic.Scene({triggerElement:"#trgr-wireless-image",duration:1*a}).setTween("#wireless-tower",{marginTop:"-30vmin"}).addIndicators({name:"Tower 1"}).addTo(t),
// Wireless Text
new ScrollMagic.Scene({triggerElement:"#trgr-wireless-text-in",duration:0}).on("enter",function(){$("#wireless-text").addClass("text-in"),$("#wireless-text").removeClass("text-start")}).on("leave",function(){$("#wireless-text").addClass("text-start"),$("#wireless-text").removeClass("text-in")}).addIndicators({name:"Wireless Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-wireless-text-out",duration:0}).on("enter",function(){$("#wireless-text").addClass("text-out blur"),$("#wireless-text").removeClass("text-in no-blur")}).on("leave",function(){$("#wireless-text").addClass("text-in no-blur"),$("#wireless-text").removeClass("text-out blur")}).addIndicators({name:"Wireless Text Out"}).addTo(t),
// Wireless Red
new ScrollMagic.Scene({triggerElement:"#trgr-wireless-green",duration:0}).on("enter",function(){$("#wireless-green1").addClass("underline1-in"),$("#wireless-green1").removeClass("underline1-out"),$("#wireless-green2").addClass("underline2-in"),$("#wireless-green2").removeClass("underline2-out")}).on("leave",function(){$("#wireless-green1").addClass("underline1-out"),$("#wireless-green1").removeClass("underline1-in"),$("#wireless-green2").addClass("underline2-out"),$("#wireless-green2").removeClass("underline2-in")}).addIndicators({name:"Wireless Green"}).addTo(t),
// Assets Text
new ScrollMagic.Scene({triggerElement:"#trgr-assets-text-in",duration:0}).on("enter",function(){$("#assets-text").addClass("text-in"),$("#assets-text").removeClass("text-start")}).on("leave",function(){$("#assets-text").addClass("text-start"),$("#assets-text").removeClass("text-in")}).addIndicators({name:"assets Text In"}).addTo(t),new ScrollMagic.Scene({triggerElement:"#trgr-assets-text-out",duration:0}).on("enter",function(){$("#assets-text").addClass("text-out blur"),$("#assets-text").removeClass("text-in no-blur")}).on("leave",function(){$("#assets-text").addClass("text-in no-blur"),$("#assets-text").removeClass("text-out blur")}).addIndicators({name:"assets Text Out"}).addTo(t),
// assets Red
new ScrollMagic.Scene({triggerElement:"#trgr-assets-red",duration:0}).on("enter",function(){$("#assets-red1").addClass("underline1-in"),$("#assets-red1").removeClass("underline1-out"),$("#assets-red2").addClass("underline2-in"),$("#assets-red2").removeClass("underline2-out")}).on("leave",function(){$("#assets-red1").addClass("underline1-out"),$("#assets-red1").removeClass("underline1-in"),$("#assets-red2").addClass("underline2-out"),$("#assets-red2").removeClass("underline2-in")}).addIndicators({name:"assets Green"}).addTo(t),
// Footer Links
$(".footer-link").hover(function(){$(this).closest("a").find("span").toggleClass("fullwidth")})});