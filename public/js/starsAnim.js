// public/js/starsAnim.js

console.log('starsAnim.js is being parsed...');

// 流れ星や落ち星的アニメ (背景透過)
function starsAnimInit() {
  console.log('starsAnimInit() called!');

  const canvas = document.getElementById('stars-canvas');
  if (!canvas) {
    console.warn('No #stars-canvas found for starsAnim.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Could not get 2D context for #stars-canvas');
    return;
  }

  let width, height;
  const STAR_COUNT = 200;
  let stars = [];

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createStars() {
    stars = [];
    for (let i=0; i<STAR_COUNT; i++){
      stars.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vy: 1 + Math.random()*3,
        size: 1 + Math.random()*2
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    ctx.fillStyle = 'white';
    for (let i=0; i<stars.length; i++){
      let s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, 2*Math.PI);
      ctx.fill();
      s.y += s.vy;
      if (s.y > height) {
        s.y = -10;
        s.x = Math.random()*width;
      }
    }
  }

  function initAll() {
    onResize();
    createStars();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('starsAnimInit() completed. Falling star layer active!');
}

window.startStarsAnim = starsAnimInit;
