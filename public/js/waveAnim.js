/**
 * waveAnim.js
 * Canvas上で波を描くシンプルサンプル
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
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < width; x += 10) {
      let y = height/2 + Math.sin((x * 0.01) + t) * 50;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    t += 0.05;
  }

  function animate() {
    drawWave();
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
