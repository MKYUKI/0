// public/js/waveAnim.js
window.addEventListener('load', () => {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function onResize() {
    canvas.width = canvas.clientWidth;
    canvas.height= canvas.clientHeight;
  }
  onResize();
  window.addEventListener('resize', onResize);

  let tStart = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    const t = (performance.now() - tStart)*0.002;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = 'rgba(80,60,160,0.6)';
    ctx.lineWidth=2;
    ctx.beginPath();
    for(let x=0; x<canvas.width; x+=10){
      const y = canvas.height*0.5 + Math.sin((x*0.02)+ t)*40;
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  animate();
});
