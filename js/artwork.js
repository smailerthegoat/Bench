/* Shared generated artwork. No image files ship with this site — the cover
   used by the slice demo is drawn once to a canvas and handed out as a data URL. */
window.Lab.artwork = (function(){
  "use strict";
  var c = document.createElement("canvas");
  c.width = 600; c.height = 450;
  var g = c.getContext("2d");

  var grd = g.createLinearGradient(0, 0, 600, 450);
  grd.addColorStop(0, "#1B2540");
  grd.addColorStop(0.5, "#4A3A6B");
  grd.addColorStop(1, "#0E1018");
  g.fillStyle = grd;
  g.fillRect(0, 0, 600, 450);

  for(var i = 0; i < 26; i++){
    g.beginPath();
    g.arc(120 + Math.sin(i * 1.7) * 230, 230 + Math.cos(i * 2.1) * 150, 30 + i * 7, 0, Math.PI * 2);
    g.strokeStyle = "rgba(232,196,138," + (0.03 + (i % 5) * 0.022) + ")";
    g.lineWidth = 1.4;
    g.stroke();
  }

  g.fillStyle = "rgba(124,140,255,.20)";
  for(var j = 0; j < 3; j++){
    g.beginPath();
    g.arc(430 - j * 90, 150 + j * 110, 90 - j * 18, 0, Math.PI * 2);
    g.fill();
  }

  /* grain — the cheapest way to stop a gradient looking like a gradient */
  var img = g.getImageData(0, 0, 600, 450), d = img.data;
  for(var k = 0; k < d.length; k += 4){
    var n = (Math.random() - 0.5) * 22;
    d[k] += n; d[k + 1] += n; d[k + 2] += n;
  }
  g.putImageData(img, 0, 0);

  return c.toDataURL();
})();
