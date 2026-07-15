/* 08 — throw & settle. Pointer capture gives clean drags; the last frame's
   delta is the release velocity. Friction, wall restitution, and a rotation
   that follows horizontal speed is the whole of the "physics". */
(function(){
  "use strict";
  var stage = document.getElementById("drag");
  if(!stage) return;

  var L = window.Lab;
  var topZ = 1;
  var items = [].slice.call(stage.querySelectorAll(".chip")).map(function(el){
    return { el:el, x:+el.dataset.x, y:+el.dataset.y, vx:0, vy:0, rot:0, drag:false, px:0, py:0 };
  });

  function place(it){
    it.el.style.transform = "translate3d(" + it.x + "px," + it.y + "px,0) rotate(" + it.rot + "deg)";
  }

  items.forEach(function(it){
    place(it);

    it.el.addEventListener("pointerdown", function(e){
      it.drag = true; it.vx = 0; it.vy = 0;
      it.px = e.clientX; it.py = e.clientY;
      it.el.classList.add("on");
      it.el.setPointerCapture(e.pointerId);
      it.el.style.zIndex = ++topZ;
    });

    it.el.addEventListener("pointermove", function(e){
      if(!it.drag) return;
      var dx = e.clientX - it.px, dy = e.clientY - it.py;
      it.x += dx; it.y += dy;
      it.vx = dx; it.vy = dy;          /* velocity is just the last delta */
      it.px = e.clientX; it.py = e.clientY;
    });

    function release(){ it.drag = false; it.el.classList.remove("on"); }
    it.el.addEventListener("pointerup", release);
    it.el.addEventListener("pointercancel", release);
  });

  L.loop(stage, function(){
    var W = stage.clientWidth, H = stage.clientHeight;
    items.forEach(function(it){
      var w = it.el.offsetWidth, h = it.el.offsetHeight;

      if(!it.drag){
        it.x += it.vx; it.y += it.vy;
        it.vx *= 0.94; it.vy *= 0.94;                        /* friction */
        if(it.x < 0){ it.x = 0; it.vx *= -0.6; }             /* restitution */
        if(it.x > W - w){ it.x = W - w; it.vx *= -0.6; }
        if(it.y < 0){ it.y = 0; it.vy *= -0.6; }
        if(it.y > H - h){ it.y = H - h; it.vy *= -0.6; }
      } else {
        it.x = L.clamp(it.x, 0, W - w);
        it.y = L.clamp(it.y, 0, H - h);
      }

      it.rot = L.lerp(it.rot, L.clamp(it.vx * 0.8, -16, 16), 0.2);
      place(it);
    });
  });
})();
