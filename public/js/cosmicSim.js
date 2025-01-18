/**
 * public/js/cosmicSim.js
 * 
 * “宇宙のシミュレーション”を「白背景」＋「黒の幾何学的量子線の大規模描画」に変更。
 * 文明の誇り・歴史的芸術作品として幻想的に振る舞う。
 */

(function() {
  let canvas, ctx;
  let width, height;

  // 線（またはパス）を複数管理
  const LINE_COUNT = 150;         // 大規模：線の本数
  const POINTS_PER_LINE = 20;     // 1本の線あたりの頂点数
  let lines = [];

  // 線オブジェクト
  class QuantumLine {
    constructor() {
      this.points = [];
      for (let i = 0; i < POINTS_PER_LINE; i++) {
        this.points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,  // -0.75 ~ +0.75
          vy: (Math.random() - 0.5) * 1.5
        });
      }
    }

    update() {
      this.points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        // 端に当たったら反転
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      // 多角形風
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  function init() {
    canvas = document.getElementById('cosmic-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    onResize();
    createLines();
    animate();

    window.addEventListener('resize', onResize);
  }

  function onResize() {
    width = canvas.parentNode.offsetWidth;
    height = canvas.parentNode.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createLines() {
    lines = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      lines.push(new QuantumLine());
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    // 背景は白
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // 線は黒
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 1;

    lines.forEach((ln) => {
      ln.update();
      ln.draw(ctx);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
