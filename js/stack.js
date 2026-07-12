/* 07 — stacking deck. Each card sticks a little lower than the one before it;
   scale and brightness fall as the next card climbs over it. */
(function(){
  "use strict";
  var sc = document.getElementById("sscroll");
  if(!sc) return;

  var L = window.Lab;
  var cards = [].slice.call(sc.querySelectorAll(".sticky-card"));

  function update(){
    cards.forEach(function(c, i){
      var next = cards[i + 1];
      if(!next){ c.style.transform = ""; c.style.filter = ""; return; }
      var r = c.getBoundingClientRect(), nr = next.getBoundingClientRect();
      var overlap = L.clamp((r.bottom - nr.top) / r.height, 0, 1);
      c.style.transform = "scale(" + (1 - overlap * 0.07) + ")";
      c.style.filter = "brightness(" + (1 - overlap * 0.35) + ")";
    });
  }

  sc.addEventListener("scroll", update, { passive: true });
  update();
})();
