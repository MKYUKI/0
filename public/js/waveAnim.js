// public/js/waveAnim.js

console.log('waveAnim.js is being parsed...');

// 量子的な波線を白で描く(透明背景)
function waveAnimInit() {
  console.log('waveAnimInit() called!');

  const canvas = document.getElementById('wave-canvas');
  if (!canvas) {
    console.warn('No #wave-canvas found for waveAnim.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Could not get 2D context for #wave-canvas');
    return;
  }

  let width, height;
  let t = 0;

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function drawWave() {
    ctx.clearRect(0,0,width,height);

    // 主波
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    let freq = 0.02;
    let amp = 50;
    for (let x=0; x<=width; x+=10) {
      let y = height/2 + Math.sin(x*freq + t)*amp;
      if (x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();

    // 副波(位相ずれ)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    for (let x=0; x<=width; x+=10) {
      let y = height/2 + Math.cos(x*freq + t)*amp*0.5;
      if (x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();

    t += 0.02;
  }

  function animate() {
    requestAnimationFrame(animate);
    drawWave();
  }

  function initAll() {
    onResize();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('waveAnimInit() completed. Quantum wave layer active!');
}

window.startWaveAnim = waveAnimInit;
