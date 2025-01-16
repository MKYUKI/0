// public/js/waveAnim.js
(function(){
  console.log("waveAnim.js loaded (revised).");

  let canvas, ctx;
  let w, h;
  let waveOffset = 0;

  function init() {
    canvas = document.getElementById('wave-canvas');
    if(!canvas) {
      console.log("waveAnim: #wave-canvas not found. Skipping animation.");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    animate();
  }

  function resize(){
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate(){
    if(!canvas) return;
    ctx.clearRect(0,0,w,h);

    // 青い波
    ctx.fillStyle = 'rgba(0,100,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, h/2);

    let waveHeight = 30;
    let waveLength = w / 20;
    for(let x=0; x<=w; x++){
      let y = h/2 + Math.sin(x/waveLength + waveOffset) * waveHeight;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    waveOffset += 0.02;
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);   // ← load を使用
  window.addEventListener('resize', resize);
})();
