console.log('★ cosmicSim => all BH same size, black + thin blue outline, no pulses, final unify.');

// すべてのブラックホールを同サイズにし、輪郭を薄い青。
// 最後に完全統合する演出を加えた宇宙史上最高峰のシミュレーションを目指す。

function cosmicInit() {
  console.log('cosmicInit() invoked.');

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
  const galaxies = [];

  // ================================
  // PC & スマホで共通のBHサイズを決定
  // PC => 半径=40, スマホ => 20 (例)
  // ================================
  let BH_RADIUS = 40; // PCの場合
  
  // シミュレーションパラメータ
  const G_FACTOR = 0.000006;    // 重力定数(小さいほどスロー)
  const GALAXY_MAX = 4;         // 同時銀河最大4つ(お好みで調整)
  const SPAWN_INTERVAL = 20000; // 20秒に1銀河追加

  // ============ 中央BH オブジェクト ===========
  // ここでは中央BHの質量と銀河BHの質量を同等にしています。
  // もちろんやや大きくしても良いが、今回は完全対等でさらに壮大感を出す。
  const CENTRAL_BH = {
    x: 0,
    y: 0,
    mass: 40000,  // 銀河BHと同じ数値
    radius: BH_RADIUS,
    active: true,
  };

  // -------------------------
  // リサイズ => PC or スマホ
  // -------------------------
  function onResize() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
      // hero-sectionが無ければfallback
      width = window.innerWidth;
      height= 600;
    } else {
      width  = heroSection.offsetWidth;
      height = heroSection.offsetHeight;
    }
    canvas.width  = width;
    canvas.height = height;

    // 画面の短辺 < 600px ならスマホ => 半径=20
    const minDim = Math.min(width, height);
    if (minDim < 600) {
      BH_RADIUS = 20;
    } else {
      BH_RADIUS = 40;
    }

    // 中央BHをそのサイズにする
    CENTRAL_BH.x = width/2;
    CENTRAL_BH.y = height/2;
    CENTRAL_BH.radius = BH_RADIUS;
  }

  // ==================================
  // 星クラス
  // ==================================
  class Star {
    constructor(x, y, vx, vy, r, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.r  = r;
      this.color = color;
      this.active = true;
    }
  }

  // ==================================
  // ブラックホールクラス (銀河BH)
  // ==================================
  class BH {
    constructor(x, y, mass, radius) {
      this.x = x;
      this.y = y;
      this.mass = mass;
      this.radius = radius;
      this.active = true;
    }
  }

  // ==================================
  // 銀河クラス => BH + 星々
  // ==================================
  class Galaxy {
    constructor(cx, cy, starCount) {
      this.cx = cx;
      this.cy = cy;
      // 銀河BH => 中央BH同様に半径=BH_RADIUS, 質量40000
      this.bh = new BH(cx, cy, 40000, BH_RADIUS);
      this.stars = [];
      for (let i = 0; i < starCount; i++) {
        this.stars.push(this.makeStar());
      }
      this.done = false; // 統合済フラグ
    }
    makeStar() {
      // 50~250程度の半径に星をばらまく
      let angle = Math.random()* Math.PI*2;
      let dist = 50 + Math.random()*200;
      let x = this.cx + Math.cos(angle)* dist;
      let y = this.cy + Math.sin(angle)* dist;

      // 軌道速度 (距離に比例して少し大きめ)
      let speed = 0.0003 * dist;
      let vx = -Math.sin(angle)* speed;
      let vy =  Math.cos(angle)* speed;

      // 星の半径 & 色
      let r = 1 + Math.random()*1.5;
      let alpha = 0.4 + Math.random()*0.6;
      // 青め ~ ランダム
      let color = `rgba(${180 + Math.random()*75}, ${180 + Math.random()*75}, 255, ${alpha})`;
      return new Star(x,y,vx,vy,r,color);
    }
  }

  // ==================================
  // 銀河を生成 => 上限4つに達していなければ追加
  // ==================================
  function spawnGalaxy() {
    if (galaxies.length >= GALAXY_MAX) return;
    let gx = 80 + Math.random()*(width-160);
    let gy = 80 + Math.random()*(height-160);
    let starCount = 1200 + Math.floor(Math.random()*800);
    galaxies.push(new Galaxy(gx, gy, starCount));
  }

  // 初期化
  function initSim() {
    galaxies.length = 0;
    spawnGalaxy();
    spawnGalaxy();
    // 必要なら spawnGalaxy(); で3つ目
  }

  // ==================================
  // 物理計算 => BH同士、星との相互作用
  // ==================================
  function updateGalaxy(gal) {
    if (!gal.bh.active) return;

    // 星の挙動
    gal.stars.forEach(st => {
      if (!st.active) return;

      // 1) 銀河BH
      let dx = gal.bh.x - st.x;
      let dy = gal.bh.y - st.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 1) dist = 1;
      let force = G_FACTOR * gal.bh.mass / dist;
      st.vx += (dx/dist)* force;
      st.vy += (dy/dist)* force;
      // BH半径内 => 飲み込み
      if (dist < gal.bh.radius) {
        st.active = false;
      }

      // 2) 中央BH
      let dxC = CENTRAL_BH.x - st.x;
      let dyC = CENTRAL_BH.y - st.y;
      let distC = Math.sqrt(dxC*dxC + dyC*dyC);
      if (distC < 1) distC = 1;
      let forceC = G_FACTOR * CENTRAL_BH.mass / distC;
      st.vx += (dxC/distC)* forceC;
      st.vy += (dyC/distC)* forceC;
      if (distC < CENTRAL_BH.radius) {
        st.active = false;
      }

      // 移動
      st.x += st.vx;
      st.y += st.vy;

      // 画面外に大きく逸脱 => 消滅
      if (st.x < -300 || st.x > width+300 || st.y < -300 || st.y > height+300) {
        st.active = false;
      }
    });

    // 銀河BH vs 中央BH => 合体
    let ddx = CENTRAL_BH.x - gal.bh.x;
    let ddy = CENTRAL_BH.y - gal.bh.y;
    let d = Math.sqrt(ddx*ddx + ddy*ddy);
    if (d < 1) d = 1;
    let f = G_FACTOR * CENTRAL_BH.mass / d;
    // BH同士が少しずつ近づくように
    gal.bh.x += (ddx/d)* f * 0.2;
    gal.bh.y += (ddy/d)* f * 0.2;

    // 重なったら統合(中央BHのmassに加算)
    if (d < (CENTRAL_BH.radius + gal.bh.radius)) {
      CENTRAL_BH.mass += gal.bh.mass; // 視覚的には変化しないが演出用
      gal.bh.active = false;
      gal.done = true;
    }
  }

  // ==================================
  // 描画 => 星 + BH(黒 + 薄青フチ)
  // ==================================
  function drawGalaxy(gal) {
    // 星
    gal.stars.forEach(st => {
      if (!st.active) return;
      ctx.beginPath();
      ctx.fillStyle = st.color;
      ctx.arc(st.x, st.y, st.r, 0, 2*Math.PI);
      ctx.fill();
    });

    // 銀河BH
    if (gal.bh.active) {
      ctx.beginPath();
      ctx.arc(gal.bh.x, gal.bh.y, gal.bh.radius, 0, 2*Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,1)'; // 真っ黒
      ctx.fill();
      // 薄い青い輪郭
      ctx.lineWidth = 1;
      ctx.strokeStyle= 'rgba(0,150,255,0.4)';
      ctx.stroke();
    }
  }

  // フレーム更新 => 銀河ごとに更新＆描画
  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);

    galaxies.forEach(updateGalaxy);
    galaxies.forEach(g => {
      g.stars = g.stars.filter(s => s.active);
      drawGalaxy(g);
    });
    for (let i = galaxies.length-1; i >= 0; i--) {
      if (galaxies[i].done) galaxies.splice(i,1);
    }

    // 中央BH
    if (CENTRAL_BH.active) {
      ctx.beginPath();
      ctx.arc(CENTRAL_BH.x, CENTRAL_BH.y, CENTRAL_BH.radius, 0, 2*Math.PI);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,150,255,0.4)';
      ctx.stroke();
    }
  }

  function initAll() {
    onResize();
    initSim();
    animate();
    // 一定間隔(20秒)で銀河を追加生成
    setInterval(spawnGalaxy, SPAWN_INTERVAL);
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('★ cosmicSim => all BH same size, black + thin blue outline, no pulses, final unify.');
}

window.startCosmicSim = cosmicInit;
