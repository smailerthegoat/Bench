/* 10 — gooey merge. A heavy blur followed by a high-contrast alpha ramp:
   anything that overlaps after blurring resolves as one shape. The filter is
   in the markup; this file only moves circles. */
(function(){
  "use strict";
  var stage = document.getElementById("goo");
  if(!stage) return;

  var L = window.Lab;
  var layer = document.getElementById("gooLayer");

  var blobs = [54, 42, 34, 26].map(function(size, i){
    var b = document.createElement("div");
    b.className = "blob";
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.background = i ? "#7C8CFF" : "#E8C48A";
    layer.appendChild(b);
    return { el:b, s:size, x:0, y:0 };
  });

  /* static anchors the trail fuses with as it passes */
  [[0.3, 0.5], [0.5, 0.5], [0.7, 0.5]].forEach(function(p){
    var a = document.createElement("div");
    a.className = "blob";
    a.style.width = "46px"; a.style.height = "46px";
    a.style.left = "calc(" + (p[0] * 100) + "% - 23px)";
    a.style.top = "calc(" + (p[1] * 100) + "% - 23px)";
    layer.appendChild(a);
  });

  var m = { x:-200, y:150 };
  stage.addEventListener("pointermove", function(e){
    var r = stage.getBoundingClientRect();
    m.x = e.clientX - r.left;
    m.y = e.clientY - r.top;
  });
  stage.addEventListener("pointerleave", function(){ m.x = -200; });

  L.loop(stage, function(){
    var tx = m.x, ty = m.y;
    blobs.forEach(function(b, i){
      /* each blob chases the one in front, a little slower — that lag is the goo */
      b.x = L.lerp(b.x, tx, 0.22 - i * 0.04);
      b.y = L.lerp(b.y, ty, 0.22 - i * 0.04);
      b.el.style.transform = "translate3d(" + (b.x - b.s / 2) + "px," + (b.y - b.s / 2) + "px,0)";
      tx = b.x; ty = b.y;
    });
  });
})();
