// public/js/starsAnim.js (Enhanced - large scale)
(function(){
  console.log("starsAnim.js (Enhanced) is running...");

  let canvas, ctx;
  let w, h;
  let stars = [];
  const STAR_COUNT = 400; // 星数増

  function init(){
    canvas = document.getElementById('stars-canvas');
    if(!canvas) {
      console.error("stars-canvas not found!");
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    createStars(STAR_COUNT);
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
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 1.2 + 0.2,
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

      // 上に移動
      star.y -= star.speed;
      // 画面上部に到達 -> 下へ再配置
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
