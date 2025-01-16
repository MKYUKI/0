// public/js/waveAnim.js (Enhanced - large scale)
(function(){
  console.log("waveAnim.js (Enhanced) is running...");

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

    // 波を3重に
    ctx.fillStyle = 'rgba(0,100,255,0.2)';
    drawWave(waveOffset, 30);
    ctx.fillStyle = 'rgba(0,180,255,0.2)';
    drawWave(waveOffset + 2, 45);
    ctx.fillStyle = 'rgba(0,220,255,0.2)';
    drawWave(waveOffset + 4, 60);

    waveOffset += 0.02;
    requestAnimationFrame(animate);
  }

  function drawWave(offset, waveHeight){
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    let waveLength = w / 20;
    for(let x=0; x<=w; x++){
      let y = h/2 + Math.sin(x/waveLength + offset) * waveHeight;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
