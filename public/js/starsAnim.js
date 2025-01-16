// public/js/starsAnim.js
(function(){
  console.log("starsAnim.js is running...");

  let canvas, ctx;
  let w, h;
  let stars = [];

  function init(){
    canvas = document.getElementById('stars-canvas');
    if(!canvas) {
      console.error("stars-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    createStars(120);
    animate();
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStars(num){
    stars = [];
    for(let i=0; i<num; i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        speed: 0.2 + Math.random()*0.5,
        r: Math.random()*1.2 + 0.3,
        alpha: Math.random()*0.5 + 0.5
      });
    }
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    // 背景を半透明な黒(宇宙)
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = '#fff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
      ctx.fill();

      // update star position
      star.y -= star.speed;
      if(star.y < 0) star.y = h;
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
