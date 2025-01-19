// ==============================
// File: public/js/galaxyArtSim.js
// ==============================
console.log("galaxyArtSim.js => Single 3D spiral galaxy, no BH, bright & diagonal view.");

function galaxyArtSimInit(){
  console.log("galaxyArtSimInit() invoked.");

  const canvas = document.getElementById('galaxy-art-canvas');
  if(!canvas){
    console.error("No #galaxy-art-canvas found for galaxyArtSim!");
    return;
  }
  const ctx = canvas.getContext('2d');
  if(!ctx){
    console.error("2D context not found for galaxy-art-canvas!");
    return;
  }

  let width, height;

  // ======== パラメータ ========
  const STAR_COUNT = 15000;         // 星の総数(大きいほど壮大)
  const ARM_COUNT = 4;             // 渦状腕の本数
  const GALAXY_RADIUS = 700;       // 銀河最大半径
  const GALAXY_THICKNESS = 80;     // ディスクの厚み(3Dっぽさ)
  const ROTATION_SPEED = 0.00003;  // 全体回転速度(Z軸)
  const ROTATION_X_ANGLE = 0.8;    // X軸での傾け角度(斜め横から見る) [ラジアン]
  const BULGE_RADIUS = 100;        // バルジ(剛体回転領域)半径
  const FLAT_REGION = 500;         // 回転曲線がほぼフラットになる外側

  // 星データ配列
  let stars = [];

  // 星クラス
  class Star {
    constructor(r, theta, zOff, size, color){
      this.r = r;         // xy平面上の半径
      this.theta = theta; // xy平面上の角度
      this.z = zOff;      // 銀河厚み(上下方向)
      this.size = size;
      this.color = color;
    }
    // 回転曲線(半径に応じて速度を変える)
    get orbitalVelocity(){
      if(this.r < BULGE_RADIUS){
        // 剛体回転
        return (this.r / BULGE_RADIUS)*0.7;
      } else if(this.r < FLAT_REGION){
        return 0.7 + ((this.r - BULGE_RADIUS)/(FLAT_REGION-BULGE_RADIUS))*0.3;
      } else {
        return 1.0;
      }
    }
  }

  // リサイズ
  function onResize(){
    width = window.innerWidth;
    height= window.innerHeight;
    canvas.width = width;
    canvas.height= height;
  }

  // 銀河生成
  function createGalaxy(){
    stars = [];
    for(let i=0; i< STAR_COUNT; i++){
      // 銀河中心からの半径 [0,GALAXY_RADIUS)
      let r = Math.random()* GALAXY_RADIUS;
      // アーム(4本) + スパイラル回転
      let armIndex = Math.floor(Math.random()* ARM_COUNT);
      let baseAngle = (armIndex*(2*Math.PI/ARM_COUNT)) + r*0.07; //渦状腕を作るため rに応じた捻り
      // 散らばり
      let angleOff = (Math.random()-0.5)*1.0; // 腕ごとの拡散を少し強め
      let theta = baseAngle + angleOff;
      // z方向(厚み)
      let zOff = (Math.random()-0.5)* GALAXY_THICKNESS * (1 - r/GALAXY_RADIUS);
      // 星サイズ
      let size= 0.5+ Math.random()*1.8;

      // 色(青紫～ピンク～白あたりで鮮やかに)
      // hue は広い範囲にわたってランダムだが、やや青系～紫を中心にする
      let hueBase = 220 + Math.random()*140; // 220~360(青紫～ピンク～赤紫)
      if(hueBase>360) hueBase-= 360; // wrap
      let saturation = 60 + Math.random()*40; // 60~100%
      let lightness  = 65 + Math.random()*30; // 65~95% (割と明るめ)
      let alpha= 0.4 + Math.random()*0.6;
      let color= `hsla(${hueBase}, ${saturation}%, ${lightness}%, ${alpha})`;

      stars.push(new Star(r, theta, zOff, size, color));
    }
  }

  // 3D変換(回転) & 2D投影
  let globalAngle = 0; // Z軸回転アングル(銀河全体が回る)
  function projectStar(s){
    // まずxy平面上での角度を回転速度に応じて加算 (銀河内部で星が公転するイメージ)
    s.theta += (s.orbitalVelocity* ROTATION_SPEED);

    // 極座標->xyz
    let x= s.r* Math.cos(s.theta);
    let y= s.r* Math.sin(s.theta);
    let z= s.z;

    // --- Z軸回転(銀河全体を回す) ---
    let cosZ = Math.cos(globalAngle), sinZ = Math.sin(globalAngle);
    let rx = x*cosZ - y*sinZ;
    let ry = x*sinZ + y*cosZ;
    // (rx, ry, z)

    // --- X軸で大きめに傾ける => 斜め横から見た図に ---
    let cosX= Math.cos(ROTATION_X_ANGLE), sinX= Math.sin(ROTATION_X_ANGLE);
    let rz = ry*sinX + z*cosX; 
    let ry2= ry*cosX - z*sinX;
    // 最終xyz= (rx, ry2, rz)

    // カメラ位置(0,0, -camZ) で Z>0が前方にある想定
    let camZ= -1200; // カメラを手前に置く
    let dz= rz - camZ;
    if(dz<10) dz=10; // あまりにも手前に来ると破綻するのでクリップ

    let perspective = 900 / dz; // 適度なパース
    let sx= rx * perspective + width*0.5;
    let sy= ry2 * perspective + height*0.5;
    let sr= s.size * perspective* 0.8; // 大きさにもパースを適用

    return { x: sx, y: sy, r: sr };
  }

  // アニメーション
  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    // 銀河全体がゆっくり回転
    globalAngle += 0.000015; // さらにゆっくりにしても良い

    // 星を描画
    for(let i=0; i<stars.length; i++){
      let s= stars[i];
      let pr= projectStar(s);
      // 範囲外ならスキップ
      if(pr.x < -5000 || pr.x> width+5000 || pr.y < -5000 || pr.y> height+5000) {
        continue;
      }
      ctx.beginPath();
      ctx.fillStyle= s.color;
      let rr= Math.max(0, pr.r);
      if(rr>4) rr=4; // 大きすぎを抑制
      ctx.arc(pr.x, pr.y, rr, 0, 2*Math.PI);
      ctx.fill();
    }
  }

  function initAll(){
    onResize();
    createGalaxy();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();

  console.log("startGalaxyArtSim => single giant 3D galaxy, diagonal angle, no BH, infinite swirl!");
}

window.startGalaxyArtSim = galaxyArtSimInit;
