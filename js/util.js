/* Shared helpers. Everything else on the page assumes window.Lab exists. */
window.Lab = (function(){
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function lerp(a, b, n){ return a + (b - a) * n; }
  function clamp(v, a, b){ return Math.min(b, Math.max(a, v)); }

  /* Run cb(dt) on rAF, but only while `el` is anywhere near the viewport.
     Eleven always-on canvases would cost more than the whole page is worth. */
  function loop(el, cb){
    var live = false, last = 0, id = 0;

    function frame(t){
      if(!live) return;
      var dt = Math.min(50, t - last) || 16;
      last = t;
      cb(dt);
      id = requestAnimationFrame(frame);
    }

    new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !live){
          live = true; last = performance.now();
          id = requestAnimationFrame(frame);
        } else if(!e.isIntersecting && live){
          live = false; cancelAnimationFrame(id);
        }
      });
    }, { rootMargin: "120px" }).observe(el);
  }

  return { reduced: reduced, lerp: lerp, clamp: clamp, loop: loop };
})();
