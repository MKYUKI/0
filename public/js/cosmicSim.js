// Revised cosmicSim.js
console.log('★ Revised cosmicSim.js: 永遠に繰り返される、壮大でエピックな宇宙シミュレーション。');

function cosmicInit() {
  console.log('cosmicInit() invoked - Revised version.');

  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) {
    console.error('No #cosmic-canvas found.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('No 2D context for cosmic-canvas!');
    return;
  }

  let width, height;
  let galaxies = [];

  // パラメータ設定
  let BH_RADIUS = 40; // PCの場合のデフォルト
  const G_FACTOR = 0.000006;
  let SPAWN_INTERVAL = 5000; // 銀河生成間隔を短縮（例: 5秒ごと）
  // ※GALAXY_MAX の制限は撤廃し、常に新しい銀河を生成

  const RESET_MASS_THRESHOLD = 120000; // 中央BHの質量がこの値を超えたらシミュレーションをリセット

  // 中央のブラックホール
  const CENTRAL_BH = {
    x: 0,
    y: 0,
    mass: 40000,
    radius: BH_RADIUS,
    active: true,
  };

  function onResize() {
    const heroSec = document.querySelector('.hero-section');
    if (!heroSec) {
      width = window.innerWidth;
      height = 600;
    } else {
      width = heroSec.offsetWidth;
      height = heroSec.offsetHeight;
    }
    canvas.width = width;
    canvas.height = height;
    // 画面サイズに応じた BH_RADIUS の調整
    const minDim = Math.min(width, height);
    BH_RADIUS = (minDim < 600) ? 20 : 40;
    CENTRAL_BH.x = width / 2;
    CENTRAL_BH.y = height / 2;
    CENTRAL_BH.radius = BH_RADIUS;
  }

  // クラス定義
  class Star {
    constructor(x, y, vx, vy, r, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.r = r;
      this.color = color;
      this.active = true;
    }
  }
  class BH {
    constructor(x, y, mass, radius) {
      this.x = x;
      this.y = y;
      this.mass = mass;
      this.radius = radius;
      this.active = true;
    }
  }
  class Galaxy {
    constructor(cx, cy, starCount) {
      this.cx = cx;
      this.cy = cy;
      this.bh = new BH(cx, cy, 40000, BH_RADIUS);
      this.stars = [];
      for (let i = 0; i < starCount; i++) {
        this.stars.push(this.makeStar());
      }
      this.done = false;
    }
    makeStar() {
      let angle = Math.random() * Math.PI * 2;
      let dist = 50 + Math.random() * 200;
      let speed = 0.0003 * dist;
      let vx = -Math.sin(angle) * speed;
      let vy = Math.cos(angle) * speed;
      let x = this.cx + Math.cos(angle) * dist;
      let y = this.cy + Math.sin(angle) * dist;
      let r = 1 + Math.random() * 1.5;
      let alpha = 0.4 + Math.random() * 0.6;
      let color = `rgba(${180 + Math.random() * 75},${180 + Math.random() * 75},255,${alpha})`;
      return new Star(x, y, vx, vy, r, color);
    }
  }

  // 銀河生成（常に新規スポーンする）
  function spawnGalaxy() {
    let gx = 80 + Math.random() * (width - 160);
    let gy = 80 + Math.random() * (height - 160);
    let starCount = 800 + Math.floor(Math.random() * 400); // パフォーマンス配慮のため星数を若干減少
    galaxies.push(new Galaxy(gx, gy, starCount));
  }

  // シミュレーションのリセット（新たな宇宙サイクルの開始）
  function resetSimulation() {
    console.log('Resetting simulation for a new cosmic cycle.');
    CENTRAL_BH.mass = 40000; // 中央BHの質量リセット
    galaxies = []; // 既存の銀河をクリア
    // 初期状態の銀河を再生成
    spawnGalaxy();
    spawnGalaxy();
  }

  function updateGalaxy(gal) {
    if (!gal.bh.active) return;
    gal.stars.forEach(st => {
      if (!st.active) return;

      // 銀河自身のBHによる重力影響
      let dx = gal.bh.x - st.x;
      let dy = gal.bh.y - st.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) dist = 1;
      let f = G_FACTOR * gal.bh.mass / dist;
      st.vx += (dx / dist) * f;
      st.vy += (dy / dist) * f;
      if (dist < gal.bh.radius) st.active = false;

      // 中央BHによる重力影響
      let dxC = CENTRAL_BH.x - st.x;
      let dyC = CENTRAL_BH.y - st.y;
      let distC = Math.sqrt(dxC * dxC + dyC * dyC);
      if (distC < 1) distC = 1;
      let fC = G_FACTOR * CENTRAL_BH.mass / distC;
      st.vx += (dxC / distC) * fC;
      st.vy += (dyC / distC) * fC;
      if (distC < CENTRAL_BH.radius) st.active = false;

      // 星の移動
      st.x += st.vx;
      st.y += st.vy;
      // 画面外に出たら非アクティブに
      if (st.x < -300 || st.x > width + 300 || st.y < -300 || st.y > height + 300) {
        st.active = false;
      }
    });

    // 銀河BHは中央BHに引き寄せられる
    let ddx = CENTRAL_BH.x - gal.bh.x;
    let ddy = CENTRAL_BH.y - gal.bh.y;
    let d = Math.sqrt(ddx * ddx + ddy * ddy);
    if (d < 1) d = 1;
    let f = G_FACTOR * CENTRAL_BH.mass / d;
    gal.bh.x += (ddx / d) * f * 0.2;
    gal.bh.y += (ddy / d) * f * 0.2;

    // 衝突判定：銀河BHが中央BHに吸収される
    if (d < (CENTRAL_BH.radius + gal.bh.radius)) {
      CENTRAL_BH.mass += gal.bh.mass;
      gal.bh.active = false;
      gal.done = true;
    }
  }

  function drawGalaxy(gal) {
    gal.stars.forEach(st => {
      if (!st.active) return;
      ctx.beginPath();
      ctx.fillStyle = st.color;
      ctx.arc(st.x, st.y, st.r, 0, 2 * Math.PI);
      ctx.fill();
    });
    if (gal.bh.active) {
      ctx.beginPath();
      ctx.arc(gal.bh.x, gal.bh.y, gal.bh.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,150,255,0.4)';
      ctx.stroke();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    // 半透明の黒で背景を塗りつぶすことで、軌跡（トレイル）効果を演出
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, width, height);

    // 各銀河の更新＆描画
    galaxies.forEach(updateGalaxy);
    galaxies.forEach(gal => {
      gal.stars = gal.stars.filter(s => s.active);
    });
    galaxies.forEach(drawGalaxy);

    // 吸収済みの銀河は配列から除外
    galaxies = galaxies.filter(gal => !gal.done);

    // 中央BHの描画
    if (CENTRAL_BH.active) {
      ctx.beginPath();
      ctx.arc(CENTRAL_BH.x, CENTRAL_BH.y, CENTRAL_BH.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,150,255,0.4)';
      ctx.stroke();
    }

    // 中央BHの質量が閾値を超えたらシーンリセット
    if (CENTRAL_BH.mass > RESET_MASS_THRESHOLD) {
      resetSimulation();
    }
  }

  // 初期化処理
  onResize();
  // 初期銀河の生成
  spawnGalaxy();
  spawnGalaxy();
  // 一定間隔で新たな銀河を生成
  setInterval(spawnGalaxy, SPAWN_INTERVAL);
  animate();
  console.log('★ Revised cosmicSim: 永遠に続くエピックな宇宙シミュレーション開始！');
}

window.startCosmicSim = cosmicInit;
