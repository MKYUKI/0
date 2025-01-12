// public/js/starsAnim.js
(function() {
  const canvasId = 'stars-canvas';

  function initStars() {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let stars = [];
    const numStars = 120; // 星の数

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.4,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        // 薄めの黒い星
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0,0,0,${s.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    resize();
    createStars();
    draw();
  }

  window.addEventListener('load', initStars);
})();
