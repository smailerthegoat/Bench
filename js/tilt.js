/* 09 : tilt & glare. Pointer position maps to rotation; children sit on
   separate translateZ planes so they part as the card turns. */
(function(){
  "use strict";
  var stage = document.getElementById("tilt");
  if(!stage) return;

  var L = window.Lab;
  var card = document.getElementById("tcard");
  var glare = document.getElementById("glare");
  var tx = 0, ty = 0, cx = 0, cy = 0;

  stage.addEventListener("pointermove", function(e){
    var r = card.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width;
    var py = (e.clientY - r.top) / r.height;
    tx = (0.5 - py) * 22;
    ty = (px - 0.5) * 26;
    glare.style.background =
      "radial-gradient(circle at " + (px * 100) + "% " + (py * 100) + "%," +
      "rgba(255,255,255,.30), rgba(255,255,255,0) 55%)";
  });

  stage.addEventListener("pointerleave", function(){ tx = 0; ty = 0; });

  L.loop(stage, function(){
    cx = L.lerp(cx, tx, 0.12);
    cy = L.lerp(cy, ty, 0.12);
    card.style.transform = "rotateX(" + cx + "deg) rotateY(" + cy + "deg)";
  });
})();
