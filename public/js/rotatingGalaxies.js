// public/js/rotatingGalaxies.js
console.log("=== rotatingGalaxies.js => More swirling dust, faster & more color variation. ===");

function rotatingGalaxiesInit(){
  console.log("rotatingGalaxiesInit() => advanced swirl.");

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
  const DUST_COUNT= 5000;  // 3500 -> 5000に増量

  class Dust {
    constructor(r, angle, z){
      this.r= r;
      this.angle= angle;
      this.z= z;
      // 色は薄青～ピンクを幅広く
      let hue= 180 + Math.random()*180; // 180~360(青紫～ピンク)
      if(hue>360) hue-=360;
      let alpha= 0.2 + Math.random()*0.3; // 0.2~0.5
      this.color= `hsla(${hue},70%,70%,${alpha})`;
      this.size= 0.5 + Math.random()*1.2;
      // 回転速度をやや高め
      this.baseSpeed= 0.0001 + (this.r/600)*0.0002;
    }
    update(){
      this.angle += this.baseSpeed;
    }
  }

  let globalAngle= 0;
  const xTilt= 0.85; // やや強めに傾け
  function project(d){
    let x= d.r* Math.cos(d.angle);
    let y= d.r* Math.sin(d.angle);
    let z= d.z;

    let c= Math.cos(globalAngle), s= Math.sin(globalAngle);
    let rx= x*c - y*s;
    let ry= x*s + y*c;

    let cx= Math.cos(xTilt), sx= Math.sin(xTilt);
    let rz= ry*sx + z*cx;
    let ry2= ry*cx - z*sx;

    let camZ= -1500;
    let dz= rz- camZ;
    if(dz<1) dz=1;
    let sc= 1100/dz; // 大きめパース
    let sxp= rx*sc + width*0.5;
    let syp= ry2*sc + height*0.5;
    let sr= d.size* sc;
    if(sr>4) sr=4;
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
      let r= 400 + Math.random()*800; 
      let angle= Math.random()* Math.PI*2;
      let z= (Math.random()-0.5)* 200;
      dustParticles.push(new Dust(r, angle, z));
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle= 'rgba(0,0,0,0.15)';
    ctx.fillRect(0,0,width,height);

    globalAngle+= 0.00002;

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
  console.log("startRotatingGalaxies => more dust, bigger swirl, faster & more vivid.");
}

window.startRotatingGalaxies = rotatingGalaxiesInit;
