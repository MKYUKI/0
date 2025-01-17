/**
 * cosmicSim.js
 * 純粋なJSだけで星や惑星を描画し、宇宙を表現
 */
(function() {
    // 変数
    let canvas, ctx;
    let width, height;
    let stars = [];
    const STAR_COUNT = 100;  // 星の数
    const PLANET_COUNT = 2;  // 惑星の数
  
    function init() {
      canvas = document.getElementById('cosmic-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      onResize();
      createStars();
      createPlanets();
      animate();
      window.addEventListener('resize', onResize, false);
    }
  
    function onResize() {
      width = canvas.parentNode.offsetWidth;
      height = canvas.parentNode.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
  
    function createStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1 + Math.random() * 2,
          speed: 0.2 + Math.random() * 0.5,
          opacity: 0.5 + Math.random() * 0.5,
        });
      }
    }
  
    function createPlanets() {
      // 惑星を星配列に追加する(サイズ大きく)
      for (let i = 0; i < PLANET_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 20 + Math.random() * 30, // 惑星は大きめ
          speed: 0.05 + Math.random() * 0.2,
          opacity: 0.8,
          planet: true  // 判別用
        });
      }
    }
  
    function drawStar(star) {
      ctx.beginPath();
      if (star.planet) {
        // 惑星っぽく円グラデ
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0, 
          star.x, star.y, star.size
        );
        gradient.addColorStop(0, 'rgba(200,200,255,0.9)');
        gradient.addColorStop(0.8, 'rgba(0,0,128,0.4)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // 星: 白い小さな点
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    function updateStar(star) {
      star.y -= star.speed; // 上に進む
      if (star.y < 0) {
        // 画面下に戻す
        star.y = height;
        star.x = Math.random() * width;
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
      // 背景を漆黒に塗る
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
  
      // 各星/惑星を描画 & 更新
      stars.forEach(star => {
        drawStar(star);
        updateStar(star);
      });
  
      requestAnimationFrame(animate);
    }
  
    // DOMが読み込まれたら起動
    document.addEventListener('DOMContentLoaded', init);
  })();
  