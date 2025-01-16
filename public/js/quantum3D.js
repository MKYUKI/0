// public/js/quantum3D.js
(function(){
  console.log("quantum3D.js loaded (revised).");

  let canvas, ctx;
  let w, h;
  let angle = 0;

  function init() {
    canvas = document.getElementById('bg-canvas');
    if(!canvas) {
      console.log("quantum3D: #bg-canvas not found. Skipping animation.");
      return; // ← canvasが無いなら終了
    }
    ctx = canvas.getContext('2d');
    resize();
    animate();
  }

  function resize() {
    if(!canvas) return; // ← 安全策
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    if(!canvas) return; // ← 安全策
    ctx.clearRect(0, 0, w, h);

    // 背景を深い緑
    ctx.fillStyle = '#003300';
    ctx.fillRect(0, 0, w, h);

    // 大きなテキスト
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Quantum3D ANIMATION", w/2, h/2);

    // 回転する円
    let radius = 50;
    let x = w/2 + Math.cos(angle)*100;
    let y = h/2 + Math.sin(angle)*100;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
    ctx.fill();

    angle += 0.02;
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);    // ← DOMContentLoaded ではなく load に変更
  window.addEventListener('resize', resize);
})();
