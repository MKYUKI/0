// ==============================
// File: public/js/rotatingGalaxies.js
// ==============================
console.log("rotatingGalaxies.js => Additional swirl dust around the main galaxy (no BH).");

function rotatingGalaxiesInit(){
  console.log("rotatingGalaxiesInit() called.");

  const canvas = document.getElementById('rotating-galaxies-canvas');
  if(!canvas){
    console.error("No #rotating-galaxies-canvas found.");
    return;
  }
  const ctx = canvas.getContext('2d');
  if(!ctx){
    console.error("Could not get 2D context for rotating-galaxies-canvas!");
    return;
  }

  let width, height;
  let dustParticles = [];
  const DUST_COUNT= 3500; // 多めにすると豪華

  class Dust {
    constructor(r, angle, z){
      this.r= r;     // xy平面上の半径
      this.angle= angle;
      this.z= z;     // 銀河面上下
      // 色は薄青～ピンク系
      let hue= 200 + Math.random()*160; 
      if(hue>360) hue -= 360;
      let alpha= 0.15 + Math.random()*0.25;
      this.color= `hsla(${hue},60%,70%,${alpha})`;
      this.size= 0.4 + Math.random()*1.0; 
      // 回転速度(外寄りほどほんの少し速い)
      this.baseSpeed= 0.00005 + (this.r/600)*0.00015;
    }
    update(){
      this.angle += this.baseSpeed;
    }
  }

  // 3D投影
  let globalAngle= 0;
  const xTilt= 0.8; // X軸で銀河を傾ける(本体に揃える)
  function project(d){
    // 角度
    let x= d.r* Math.cos(d.angle);
    let y= d.r* Math.sin(d.angle);
    let z= d.z;

    // Z軸回転(銀河全体の回転)
    let c= Math.cos(globalAngle), s= Math.sin(globalAngle);
    let rx= x*c - y*s;
    let ry= x*s + y*c;

    // X軸傾斜
    let cx= Math.cos(xTilt), sx= Math.sin(xTilt);
    let rz= ry*sx + z*cx;
    let ry2= ry*cx - z*sx;

    // カメラ
    let camZ= -1200;
    let dz= rz - camZ;
    if(dz<1) dz=1;
    let sc= 900/dz;
    let sxp= rx*sc + width*0.5;
    let syp= ry2*sc + height*0.5;
    let sr= d.size* sc;
    if(sr>3) sr=3;
    return { x:sxp, y:syp, r:sr };
  }

  function onResize(){
    width= window.innerWidth;
    height= window.innerHeight;
    canvas.width= width;
    canvas.height= height;
    initDust();
  }

  function initDust(){
    dustParticles=[];
    for(let i=0; i<DUST_COUNT; i++){
      let r= 300 + Math.random()*600; // 銀河外側(主銀河よりさらに外まで広げる)
      let angle= Math.random()* Math.PI*2;
      let z= (Math.random()-0.5)* 120; // 厚さ大きめ
      dustParticles.push(new Dust(r, angle, z));
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    // 残像を薄く塗る => ふわっと
    ctx.fillStyle= 'rgba(0,0,0,0.2)';
    ctx.fillRect(0,0,width,height);

    globalAngle+= 0.00001; // 超スロー回転

    dustParticles.forEach(dp=>{
      dp.update();
      let p= project(dp);
      ctx.beginPath();
      ctx.fillStyle= dp.color;
      ctx.arc(p.x, p.y, p.r, 0,2*Math.PI);
      ctx.fill();
    });
  }

  function initAll(){
    onResize();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log("startRotatingGalaxies => dust swirl around single galaxy, no BH, diagonal tilt.");
}

window.startRotatingGalaxies = rotatingGalaxiesInit;
