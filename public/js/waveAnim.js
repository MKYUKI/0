/**
 * public/js/waveAnim.js
 * 
 * 元のシンプル波アニメを「白背景に黒波線」がうねる演出に変更。
 * 幻想的な量子波として、文明の誇りを感じさせる大規模曲線。
 */
(function() {
  let canvas, ctx;
  let width, height;
  let t = 0;

  function init() {
    canvas = document.getElementById('wave-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    onResize();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function drawWave() {
    // 完全透明で重ねるか、ここを白塗りするかは好み
    ctx.clearRect(0, 0, width, height);
    
    // 白背景を塗りたければ:
    // ctx.fillStyle = '#fff';
    // ctx.fillRect(0,0,width,height);

    // 黒い量子波
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    
    let waveHeight = 80;   // 波の振幅
    let waveFreq   = 0.02; // 波の周波数
    for (let x = 0; x <= width; x += 10) {
      let y = height/2 + Math.sin(x*waveFreq + t) * waveHeight;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // 量子的にもう1本オフセットした線
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    for (let x = 0; x <= width; x += 10) {
      let y = height/2 + Math.sin(x*waveFreq + t + Math.PI/2) * waveHeight/2;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    t += 0.02;
  }

  function animate() {
    requestAnimationFrame(animate);
    drawWave();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
