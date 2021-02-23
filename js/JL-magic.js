$(document).ready(function() {

// disable all greensock js for ie11
var hasDocumentMode = (document.documentMode !== undefined),     
    isIE10 = (document.documentMode === 11);

// browser is IE
if(hasDocumentMode) {     
    if(isIE11){         
       // browser is IE11    
    } 
}

var controller = new ScrollMagic.Controller();

var windowHeight = $(window).height();


// Oneten Icon Z Shift

new ScrollMagic.Scene({triggerElement: "#trgr-title", duration: (windowHeight*.5)})
// animate color and top border in relation to scroll position
.setTween("#title", {transform: "translateZ(100px) rotateY(90deg)"}) // the tween durtion can be omitted and defaults to 1
.addIndicators({name: "Title"}) // add indicators (requires plugin)
.addTo(controller);

new ScrollMagic.Scene({triggerElement: "#trgr-oneten-mark-in", duration: (windowHeight*5)})
// animate color and top border in relation to scroll position
.setTween("#oneten-mark-blur", {transform: "translateZ(0px)"}) // the tween durtion can be omitted and defaults to 1
.addIndicators({name: "Oneten Mark In"}) // add indicators (requires plugin)
.addTo(controller);

new ScrollMagic.Scene({triggerElement: "#trgr-oneten-mark-out", duration: (windowHeight*5)})
// animate color and top border in relation to scroll position
.setTween("#oneten-mark", {filter: "blur(70vw)", transform: "translateZ(1000px) rotate3d(1,.7,1,220deg)"}) // the tween durtion can be omitted and defaults to 1
.addIndicators({name: "Oneten Mark In"}) // add indicators (requires plugin)
.addTo(controller);

new ScrollMagic.Scene({triggerElement: "#trgr-oneten-mark-out", duration: (windowHeight*5)})
// animate color and top border in relation to scroll position
.setTween("#oneten-mark-blur", {transform: "translateZ(1000px) rotate3d(1,.7,1,220deg)"}) // the tween durtion can be omitted and defaults to 1
.addIndicators({name: "Oneten Mark In"}) // add indicators (requires plugin)
.addTo(controller);
});