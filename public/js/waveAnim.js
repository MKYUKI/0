// public/js/waveAnim.js
// Updated wave animation
window.addEventListener('load', () => {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height= canvas.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let t0 = performance.now();
  function animate() {
    requestAnimationFrame(animate);
    const t = (performance.now() - t0) * 0.002;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(60,60,120,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 10) {
      let y = canvas.height / 2 + Math.sin((x * 0.02) + t) * 40;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  animate();
});
