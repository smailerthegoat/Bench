/* 05 — velocity marquee. Base drift plus scroll delta, and the same delta
   skews the row. Wrapping is a modulo over half the content width, so the
   markup just has to contain two identical passes. */
(function(){
  "use strict";
  var stage = document.getElementById("marquee");
  if(!stage) return;

  var L = window.Lab;
  var rows = [].slice.call(stage.querySelectorAll(".mrow"));
  var inners = rows.map(function(r){ return r.firstElementChild; });
  var offs = [0, 0], vel = 0, last = scrollY;

  addEventListener("scroll", function(){
    vel += (scrollY - last);
    last = scrollY;
  }, { passive: true });

  L.loop(stage, function(dt){
    vel *= 0.90;
    var skew = L.clamp(vel * 0.25, -14, 14);
    var speed = (L.reduced ? 0 : 0.055) * dt;

    rows.forEach(function(row, i){
      var dir = i ? -1 : 1;
      var w = inners[i].scrollWidth / 2 || 1;
      offs[i] += dir * (speed + vel * 0.55);
      var t = ((offs[i] % w) - w) % w;          /* always inside (-w, 0] */
      row.style.transform = "skewX(" + (-skew) + "deg)";
      inners[i].style.transform = "translate3d(" + t + "px,0,0)";
    });
  });
})();
