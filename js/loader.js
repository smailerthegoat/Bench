/* 11 : column wipe. A counter runs while columns hold, then they lift on a
   stagger. Replayable here; on a real site it runs once and removes itself. */
(function(){
  "use strict";
  var host = document.getElementById("loader");
  if(!host) return;

  var L = window.Lab;
  var cols = [].slice.call(document.querySelectorAll("#cols i"));
  var count = document.getElementById("count");
  var btn = document.getElementById("replay");
  var DURATION = 1400;
  var running = false;

  function run(){
    if(running) return;
    running = true;

    cols.forEach(function(c){ c.style.transition = "none"; c.style.transform = "scaleY(1)"; });
    count.style.transition = "none";
    count.textContent = "0";
    count.style.opacity = "1";
    void cols[0].offsetWidth;              /* force the reset to land */

    var t0 = performance.now();
    (function step(t){
      var p = L.clamp((t - t0) / DURATION, 0, 1);
      count.textContent = Math.round(p * 100);
      if(p < 1){ requestAnimationFrame(step); return; }

      cols.forEach(function(c, i){
        c.style.transition = "transform .75s cubic-bezier(.76,0,.24,1) " + (i * 70) + "ms";
        c.style.transform = "scaleY(0)";
      });
      count.style.transition = "opacity .5s .4s";
      count.style.opacity = "0.28";
      setTimeout(function(){ running = false; }, 1400);
    })(t0);
  }

  cols.forEach(function(c){ c.style.transform = "scaleY(0)"; });
  count.style.opacity = "0.28";
  btn.addEventListener("click", run);

  var once = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !L.reduced){ once.disconnect(); run(); }
  }, { threshold: 0.6 });
  once.observe(host);
})();
