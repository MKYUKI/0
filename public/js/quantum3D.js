// public/js/quantum3D.js
(function(){
  console.log("quantum3D.js is running...");

  let canvas, ctx;
  let w, h;
  let angle = 0;
  let lines = [];

  function init() {
    canvas = document.getElementById('bg-canvas');
    if(!canvas) {
      console.error("bg-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();

    // 幾何学的黒線を多数生成
    for(let i=0; i<50; i++){
      lines.push({
        x1: Math.random()*w, y1: Math.random()*h,
        x2: Math.random()*w, y2: Math.random()*h,
        speed: 0.3 + Math.random()*0.5
      });
    }

    animate();
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // 背景白 or薄灰
    ctx.fillStyle = '#fefefe';
    ctx.fillRect(0, 0, w, h);

    // 幾何学的 黒線
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1.2;

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();

      // ランダムに角度を変化(量子的)
      line.x1 += Math.cos(angle) * line.speed;
      line.y1 += Math.sin(angle*0.8) * line.speed;
      line.x2 -= Math.sin(angle*0.9) * line.speed;
      line.y2 += Math.cos(angle) * line.speed;
    });

    angle += 0.01;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
