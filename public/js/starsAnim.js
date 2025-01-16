// public/js/starsAnim.js
// 白背景上で、黒い量子粒子(ドット)が無数に浮遊・拡散

(function(){
  console.log("starsAnim.js (quantum-particles) loaded...");

  let canvas, ctx;
  let w, h;
  let particles = [];
  const PARTICLE_COUNT = 80;

  function init(){
    canvas = document.getElementById('stars-canvas');
    if(!canvas) {
      console.error("starsAnim: #stars-canvas not found, skipping...");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    createParticles(PARTICLE_COUNT);
    animate();
  }

  function resize(){
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles(num){
    particles = [];
    for(let i=0; i<num; i++){
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  function animate(){
    if(!canvas) return;
    ctx.clearRect(0,0,w,h);

    // 粒子を描画(黒ドット)
    particles.forEach(p=>{
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      // update
      p.x += p.vx;
      p.y += p.vy;

      // 画面外に出たら反対側へワープ (量子的トーラス空間)
      if(p.x < 0) p.x = w;
      if(p.x > w) p.x = 0;
      if(p.y < 0) p.y = h;
      if(p.y > h) p.y = 0;
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);
  window.addEventListener('resize', resize);
})();
