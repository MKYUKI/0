/**
 * starsAnim.js
 * Canvas上で星が流れるアニメ
 */
(function(){
  let canvas, ctx;
  let width, height;
  let stars = [];
  const STAR_COUNT = 150;

  function init() {
    canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    onResize();
    createStars();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.4 + Math.random() * 0.2,
        size: 1 + Math.random() * 2
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, 2*Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      s.y -= s.speed;
      if (s.y < 0) {
        s.y = height;
        s.x = Math.random() * width;
      }
    }
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
