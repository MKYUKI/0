// public/js/starsAnim.js
(function(){
  console.log("starsAnim.js (Enhanced) is running...");

  let canvas, ctx;
  let w, h;
  let stars = [];
  const STAR_COUNT = 300;

  function init(){
    canvas = document.getElementById('stars-canvas');
    if(!canvas) {
      console.error("stars-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    createStars(STAR_COUNT);
    requestAnimationFrame(animate);
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStars(num){
    stars = [];
    for(let i=0; i<num; i++){
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 1 + 0.3,
        r: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
      ctx.fill();

      // update
      star.y -= star.speed;
      if(star.y < 0) {
        star.x = Math.random() * w;
        star.y = h;
      }
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('DOMContentLoaded', init);
})();
