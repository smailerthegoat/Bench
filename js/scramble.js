/* 02 : decode-on-hover. Characters resolve left to right; everything
   right of the resolve head is junk redrawn every frame. */
(function(){
  "use strict";
  var rows = [].slice.call(document.querySelectorAll("#scramble .t"));
  if(!rows.length) return;

  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/\\<>*";
  var SPEED = 2.2;   /* characters resolved per tick */

  rows.forEach(function(el){
    var target = el.dataset.text, timer = null;

    el.parentElement.addEventListener("pointerenter", function(){
      var frame = 0;
      clearInterval(timer);
      timer = setInterval(function(){
        var out = "";
        for(var i = 0; i < target.length; i++){
          if(target[i] === " "){ out += " "; continue; }
          out += (i < frame / SPEED)
            ? target[i]
            : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        frame++;
        if(frame / SPEED > target.length){
          clearInterval(timer);
          el.textContent = target;
        }
      }, 28);
    });

    el.parentElement.addEventListener("pointerleave", function(){
      clearInterval(timer);
      el.textContent = target;
    });
  });
})();
