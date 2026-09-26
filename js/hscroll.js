/* 06 : pinned horizontal.
   Scroll progress inside a sticky section maps to horizontal travel. Demoed in
   a nested scroller here; on a real page the same maths sits in a ScrollTrigger
   pin, with window scroll supplying the progress. */
(function(){
  "use strict";
  var sc = document.getElementById("hscroll");
  if(!sc) return;

  var L = window.Lab;
  var track = document.getElementById("htrack");
  var bar = document.getElementById("hprog");
  var cur = 0, target = 0;

  function overflow(){
    return Math.max(0, track.scrollWidth - sc.clientWidth + 44);
  }

  sc.addEventListener("scroll", function(){
    var p = sc.scrollTop / Math.max(1, sc.scrollHeight - sc.clientHeight);
    target = -p * overflow();
    bar.style.width = (p * 100) + "%";
  }, { passive: true });

  L.loop(sc, function(){
    cur = L.lerp(cur, target, 0.14);            /* the lerp is what sells it */
    track.style.transform = "translate3d(" + cur + "px,0,0)";

    var mid = sc.clientWidth / 2;
    var s = sc.getBoundingClientRect();
    [].forEach.call(track.children, function(card){
      var r = card.getBoundingClientRect();
      var dist = Math.abs((r.left - s.left) + r.width / 2 - mid);
      var k = L.clamp(1 - dist / (sc.clientWidth * 1.1), 0, 1);
      card.style.opacity = (0.35 + k * 0.65).toFixed(3);
      card.style.borderColor = k > 0.75 ? "#7C8CFF" : "#242937";
    });
  });
})();
