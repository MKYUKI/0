// public/js/quantum3D.js
// 幾何学的な黒ラインが白背景上で量子的に拡大縮小＆回転

(function(){
  console.log("quantum3D.js (geometric-quantum) loaded...");

  let canvas, ctx;
  let w, h;
  let angle = 0;
  let lines = [];

  // 幾何学ラインパターンを保持する
  const LINE_COUNT = 30;
  const MAX_RADIUS = 300;

  function init() {
    canvas = document.getElementById('bg-canvas');
    if(!canvas) {
      console.error("quantum3D: #bg-canvas not found, skipping...");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();

    // 幾何学ラインを初期生成
    for(let i=0; i<LINE_COUNT; i++){
      lines.push({
        radius: Math.random() * MAX_RADIUS,
        speed: (Math.random() * 0.5 + 0.1) * (Math.random()<0.5? -1 : 1),
        thickness: Math.random()* 1.2 + 0.4,
      });
    }

    animate();
  }

  function resize() {
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate() {
    if(!canvas) return;
    ctx.clearRect(0, 0, w, h);

    // 背景は白 (幻想的な黒線が映える)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // 中心を画面中央に
    ctx.save();
    ctx.translate(w/2, h/2);

    // 幾何学ラインを描画
    lines.forEach((line, idx)=>{
      // 回転アニメ
      let currentAngle = angle * line.speed;

      ctx.save();
      ctx.rotate(currentAngle);
      ctx.beginPath();
      ctx.lineWidth = line.thickness;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';

      // 幾何学的に円を分割するような線
      ctx.moveTo(-line.radius, 0);
      ctx.lineTo(line.radius, 0);
      ctx.stroke();
      ctx.restore();
    });

    ctx.restore();

    angle += 0.005; // ゆっくりと量子的に回転

    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);
  window.addEventListener('resize', resize);
})();
