// public/js/waveAnim.js
(function(){
  console.log("waveAnim.js is running...");

  let canvas, ctx;
  let w, h;
  let waveOffset = 0;

  function init() {
    canvas = document.getElementById('wave-canvas');
    if(!canvas) {
      console.error("wave-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    animate();
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function animate(){
    ctx.clearRect(0,0,w,h);

    // 下地(黒透明)
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,w,h);

    // 波を水色で
    ctx.fillStyle = 'rgba(0,200,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    let waveHeight = 35;
    let waveLength = w / 30;
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

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
