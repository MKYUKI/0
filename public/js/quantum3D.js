// public/js/quantum3D.js
(function(){
  console.log("quantum3D.js is running...");

  let canvas, ctx;
  let w, h;
  let angle = 0;

  function init() {
    canvas = document.getElementById('bg-canvas');
    if(!canvas) {
      console.error("bg-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    animate();
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // 背景をやや透けた深い緑
    ctx.fillStyle = "rgba(0, 100, 0, 0.2)";
    ctx.fillRect(0, 0, w, h);

    // 文字
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Quantum3D Enhanced", w/2, h/2);

    // 円を回転
    const rad = 50;
    const x = w/2 + Math.cos(angle)*80;
    const y = h/2 + Math.sin(angle)*80;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.fill();

    angle += 0.02;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
