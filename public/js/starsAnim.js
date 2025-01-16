// public/js/starsAnim.js
(function(){
  console.log("starsAnim.js loaded (revised).");

  let canvas, ctx;
  let w, h;
  let stars = [];

  function init() {
    canvas = document.getElementById('stars-canvas');
    if(!canvas) {
      console.log("starsAnim: #stars-canvas not found. Skipping animation.");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    createStars(100);
    animate();
  }

  function resize(){
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStars(num){
    stars = [];
    for(let i=0; i<num; i++){
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 0.5 + 0.2,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
  }

  function animate(){
    if(!canvas) return;
    ctx.clearRect(0,0,w,h);

    // 星を描画
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
      ctx.fill();
      // update
      star.y -= star.speed;
      if(star.y < 0) star.y = h;
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', init);    // ← load を使用
  window.addEventListener('resize', resize);
})();
