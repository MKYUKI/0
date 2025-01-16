// public/js/waveAnim.js
// 白背景上で黒波が緩やかに揺らめく

(function(){
  console.log("waveAnim.js (black-wave) loaded...");

  let canvas, ctx;
  let w, h;
  let waveOffset = 0;

  function init() {
    canvas = document.getElementById('wave-canvas');
    if(!canvas) {
      console.error("wave-canvas not found, skipping wave...");
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

    // 白背景は何もしなくても quantum3D.js が塗っている (or ここで塗り直してもOK)
    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0,0,w,h);

    // 黒い波を描く
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.05)'; // 薄黒
    ctx.beginPath();
    ctx.moveTo(0, h/2);

    let waveCount = 2;  // 複数波で幻想度アップ
    let amplitude = 80; // 波の高さ
    let waveFreq = 0.01; // 波の周波数

    for(let x=0; x<=w; x++){
      // 2つの正弦波を重ねる
      let y1 = h/2 + Math.sin((x * waveFreq) + waveOffset) * amplitude;
      let y2 = h/2 + Math.sin((x * waveFreq * 0.7) + waveOffset*1.5) * (amplitude*0.6);
      let y = (y1 + y2)/2;

      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    waveOffset += 0.02;
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);
  window.addEventListener('resize', resize);
})();
