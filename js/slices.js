/* 04 — sliced & shifted.
   One image, ten strips, alternating offsets on a delay that grows from the
   centre out. The RGB ghosts are the same image, tinted and pushed a few px. */
(function(){
  "use strict";
  var box = document.getElementById("slicebox");
  if(!box) return;

  var url = window.Lab.artwork;
  var N = 10;

  for(var s = 0; s < N; s++){
    var strip = document.createElement("div");
    strip.className = "strip";
    strip.style.height = (100 / N) + "%";
    strip.style.top = (s * 100 / N) + "%";
    strip.style.backgroundImage = "url(" + url + ")";
    strip.style.backgroundSize = "100% " + (N * 100) + "%";
    strip.style.backgroundPosition = "0 " + (s * (100 / (N - 1))) + "%";
    strip.style.transitionDelay = (Math.abs(s - (N - 1) / 2) * 22) + "ms";
    strip.dataset.dir = s % 2 ? "-1" : "1";
    box.insertBefore(strip, box.firstChild);
  }

  var strips = [].slice.call(box.querySelectorAll(".strip"));

  box.addEventListener("pointerenter", function(){
    strips.forEach(function(el, i){
      el.style.transform = "translateX(" + (el.dataset.dir * (10 + (i % 3) * 9)) + "px)";
    });
  });
  box.addEventListener("pointerleave", function(){
    strips.forEach(function(el){ el.style.transform = "translateX(0)"; });
  });

  [].forEach.call(box.querySelectorAll(".ghost"), function(el){
    el.style.backgroundImage = "url(" + url + ")";
  });
})();
