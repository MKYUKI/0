// public/js/quantum3D.js
(function(){
  console.log("quantum3D.js (Enhanced) is running...");

  let canvas, ctx;
  let w, h;
  let angle = 0;
  let circles = [];

  function init() {
    canvas = document.getElementById('bg-canvas');
    if(!canvas) {
      console.error("bg-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();

    // 複数円 (例)
    for (let i=0; i<5; i++){
      circles.push({
        radius: 30 + i*20,
        offsetAngle: i*(Math.PI/2),
        speed: 0.02 + i*0.01
      });
    }

    requestAnimationFrame(animate);
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // 背景を少し透明な深緑にする
    ctx.fillStyle = 'rgba(0, 80, 0, 0.4)';
    ctx.fillRect(0, 0, w, h);

    // 中央テキスト
    ctx.fillStyle = '#00ffcc';
    ctx.font = '50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Quantum Illusions++", w/2, h/2);

    // 回転円
    circles.forEach(c => {
      let r = c.radius;
      let x = w/2 + Math.cos(angle + c.offsetAngle)*120;
      let y = h/2 + Math.sin(angle + c.offsetAngle)*120;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
      ctx.fill();
    });

    angle += 0.01;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
