/* 01 : magnetic buttons + a difference-blend cursor.
   Two ideas in one: the pointer drives a lerped dot, and any button within
   reach gets pulled a fraction of the distance toward it. */
(function(){
  "use strict";
  var stage = document.getElementById("magnet");
  if(!stage) return;

  var L = window.Lab;
  var dot = document.getElementById("dot");
  var btns = [].slice.call(stage.querySelectorAll(".mag"));
  var m = { x:-100, y:-100 }, d = { x:-100, y:-100 };
  var scale = 1, targetScale = 1;
  var state = btns.map(function(){ return { x:0, y:0, tx:0, ty:0 }; });

  stage.addEventListener("pointermove", function(e){
    var r = stage.getBoundingClientRect();
    m.x = e.clientX - r.left;
    m.y = e.clientY - r.top;
    targetScale = 1;

    btns.forEach(function(b, i){
      var br = b.getBoundingClientRect();
      var cx = br.left - r.left + br.width / 2;
      var cy = br.top - r.top + br.height / 2;
      var dx = m.x - cx, dy = m.y - cy;
      var dist = Math.hypot(dx, dy), pull = br.width * 0.9;

      if(dist < pull){
        state[i].tx = dx * 0.35;
        state[i].ty = dy * 0.5;
        targetScale = 2.1;          /* cursor swells over a live target */
      } else {
        state[i].tx = 0; state[i].ty = 0;
      }
    });
  });

  stage.addEventListener("pointerleave", function(){
    m.x = -100; m.y = -100; targetScale = 1;
    state.forEach(function(s){ s.tx = 0; s.ty = 0; });
  });

  L.loop(stage, function(){
    d.x = L.lerp(d.x, m.x, 0.18);
    d.y = L.lerp(d.y, m.y, 0.18);
    scale = L.lerp(scale, targetScale, 0.12);
    dot.style.transform = "translate3d(" + (d.x - 13) + "px," + (d.y - 13) + "px,0) scale(" + scale + ")";

    btns.forEach(function(b, i){
      var s = state[i];
      s.x = L.lerp(s.x, s.tx, 0.16);
      s.y = L.lerp(s.y, s.ty, 0.16);
      b.style.transform = "translate(" + s.x + "px," + s.y + "px)";
      /* label trails the button at a third of the travel, parallax in miniature */
      b.firstElementChild.style.transform = "translate(" + s.x * 0.3 + "px," + s.y * 0.3 + "px)";
    });
  });
})();
