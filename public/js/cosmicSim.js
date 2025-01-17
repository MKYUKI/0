/**
 * cosmicSim.js
 * 本気拡張版: 純粋JSで星/惑星を大量生成し、上昇 + スパイラルしつつ銀河を表現
 */
(function() {
    // 変数
    let canvas, ctx;
    let width, height;
    let cosmicBodies = []; // 星/惑星/銀河すべてを格納
    const STAR_COUNT = 500;   // 星の数を増加
    const GALAXY_COUNT = 5;   // 銀河/惑星の数
    const CENTER_FORCE = 0.001; // スパイラル回転の強度
  
    function init() {
      canvas = document.getElementById('cosmic-canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      onResize();
      createStars();
      createGalaxies();
      animate();
      window.addEventListener('resize', onResize, false);
    }
  
    function onResize() {
      width = canvas.parentNode.offsetWidth;
      height = canvas.parentNode.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
  
    // ランダムに星を追加
    function createStars() {
      cosmicBodies = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        cosmicBodies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 1.5,
          speed: 0.4 + Math.random() * 0.6,
          angle: Math.random() * 2 * Math.PI, // 回転に使う角度
          dist: 0.3 + Math.random() * 0.7,    // 中心からの距離の基準(0~1)
          isPlanet: false
        });
      }
    }
  
    // 大きな惑星 or 銀河を追加
    function createGalaxies() {
      for (let i = 0; i < GALAXY_COUNT; i++) {
        cosmicBodies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 20 + Math.random() * 30,  // 惑星/銀河は大きめ
          speed: 0.1 + Math.random() * 0.2, // 動きはゆったり
          angle: Math.random() * 2 * Math.PI,
          dist: 0.5 + Math.random() * 0.5,
          isPlanet: true
        });
      }
    }
  
    // 各オブジェクトを描画
    function drawBody(body) {
      ctx.beginPath();
      if (body.isPlanet) {
        // 惑星風 (円グラデ)
        const gradient = ctx.createRadialGradient(
          body.x, body.y, 0, 
          body.x, body.y, body.radius
        );
        // 中心は明るく、外側は暗く
        gradient.addColorStop(0, 'rgba(200, 200, 255, 0.9)');
        gradient.addColorStop(0.8, 'rgba(50, 0, 80, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
        ctx.fillStyle = gradient;
        ctx.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // 星
        ctx.fillStyle = "white";
        ctx.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    // 各オブジェクトを更新:
    // 1) 上に進む
    // 2) スパイラル回転 (中心に吸い寄せられる/離れる要素)
    function updateBody(body) {
      // 上昇 (yを上に向けて減らす)
      body.y -= body.speed;
      // 画面外に上昇したら下に再生成
      if (body.y < -50) {
        body.y = height + 50;
        body.x = Math.random() * width;
      }
  
      // スパイラル用に: 画面中央(= width/2, height/2)に少し引き寄せ/回転
      let dx = body.x - width / 2;
      let dy = body.y - height / 2;
      let distCenter = Math.sqrt(dx*dx + dy*dy);
  
      // 少しだけ角度を進める
      body.angle += 0.002 * (body.isPlanet ? 0.5 : 1.0); 
      const force = CENTER_FORCE * (body.isPlanet ? 0.5 : 1.0);
  
      // 中心へ or 軌道を回るように
      const fx = -dx * force;
      const fy = -dy * force;
      // 座標を少しずつ変化 (渦を巻く)
      body.x += fx * Math.cos(body.angle);
      body.y += fy * Math.sin(body.angle);
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
      // 背景を漆黒に
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
  
      // 各天体を描画 & 更新
      for (let i = 0; i < cosmicBodies.length; i++) {
        const b = cosmicBodies[i];
        drawBody(b);
        updateBody(b);
      }
      requestAnimationFrame(animate);
    }
  
    // イベント登録
    document.addEventListener('DOMContentLoaded', init);
  })();
  