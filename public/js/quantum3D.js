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

    ctx.fillStyle = '#003300';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Quantum3D ANIMATION", w/2, h/2);

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
  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
