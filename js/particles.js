/* 03 — image-sampled particles.
   Draw once to an offscreen canvas, read the alpha channel, and every opaque
   pixel becomes a particle that flees the cursor and springs back home.
   Swap fillText for drawImage and the same code runs on a photo. */
(function(){
  "use strict";
  var cv = document.getElementById("particles");
  if(!cv) return;

  var L = window.Lab;
  var ctx = cv.getContext("2d");
  var stage = cv.parentElement;
  var parts = [], mouse = { x:-999, y:-999 };
  var W = 0, H = 300, dpr = Math.min(2, devicePixelRatio || 1);

  function build(){
    W = stage.clientWidth;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var off = document.createElement("canvas");
    off.width = W; off.height = H;
    var o = off.getContext("2d");
    var size = Math.min(W * 0.26, 132);
    o.fillStyle = "#fff";
    o.textAlign = "center"; o.textBaseline = "middle";
    o.font = "800 " + size + "px 'Bricolage Grotesque', Arial, sans-serif";
    o.fillText("IDEAS", W / 2, H / 2);

    var data = o.getImageData(0, 0, W, H).data;
    var gap = W < 520 ? 5 : 4;      /* sampling step — the only perf dial */
    parts = [];
    for(var y = 0; y < H; y += gap){
      for(var x = 0; x < W; x += gap){
        if(data[(y * W + x) * 4 + 3] > 140){
          parts.push({
            hx:x, hy:y,
            x:x + (Math.random() - 0.5) * 8,
            y:y + (Math.random() - 0.5) * 8,
            vx:0, vy:0
          });
        }
      }
    }
  }

  stage.addEventListener("pointermove", function(e){
    var r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  stage.addEventListener("pointerleave", function(){ mouse.x = -999; mouse.y = -999; });

  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(function(){
    build();
    L.loop(stage, function(){
      ctx.clearRect(0, 0, W, H);
      for(var i = 0; i < parts.length; i++){
        var p = parts[i];
        var dx = p.x - mouse.x, dy = p.y - mouse.y, dsq = dx * dx + dy * dy;

        if(dsq < 7000){                       /* repel, falling off with distance */
          var f = (7000 - dsq) / 7000, dist = Math.sqrt(dsq) || 1;
          p.vx += (dx / dist) * f * 5.5;
          p.vy += (dy / dist) * f * 5.5;
        }
        p.vx += (p.hx - p.x) * 0.055;         /* spring home */
        p.vy += (p.hy - p.y) * 0.055;
        p.vx *= 0.86; p.vy *= 0.86;           /* damping */
        p.x += p.vx; p.y += p.vy;

        var disp = Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy);
        ctx.fillStyle = disp > 9 ? "#7C8CFF" : "#EDEBE6";
        ctx.fillRect(p.x, p.y, 1.9, 1.9);
      }
    });
  });

  addEventListener("resize", function(){
    if(Math.abs(stage.clientWidth - W) > 30) build();
  });
})();
