// public/js/page4Logic.js
(function(){
  if(typeof window === 'undefined') return;

  const canvas = document.getElementById('canvas4');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = canvas.clientWidth;
    canvas.height= canvas.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let tStart = performance.now();

  function animate(){
    requestAnimationFrame(animate);
    const t = (performance.now() - tStart)*0.002;

    // 背景クリア
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 擬似トーラスを描く
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(t);
    ctx.strokeStyle='rgba(0,0,0,0.6)';
    ctx.lineWidth=1;

    for(let i=0; i<16; i++){
      ctx.beginPath();
      ctx.arc(0,0,100,0,Math.PI*2);
      ctx.stroke();
      ctx.rotate(Math.PI/8);
    }

    ctx.restore();
  }
  animate();
})();
