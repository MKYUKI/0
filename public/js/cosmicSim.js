// public/js/cosmicSim.js
// ★ all BH same size, black + thin blue outline, no pulsing, final unify.

console.log('★ cosmicSim => all BH same size, black + thin blue outline, no pulsing, final unify.');

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
  // 共通BH設定 => PC/スマホ
  // ================================
  let BH_RADIUS = 40; // PC default
  const G_FACTOR      = 0.000006; 
  const GALAXY_MAX    = 3;        
  const SPAWN_INTERVAL= 20000;    

  // 中央BH
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
      width  = window.innerWidth;
      height = 600;
    } else {
      width  = heroSec.offsetWidth;
      height = heroSec.offsetHeight;
    }
    canvas.width  = width;
    canvas.height = height;

    // スマホ判定
    const minDim= Math.min(width,height);
    if(minDim<600) BH_RADIUS= 20; else BH_RADIUS= 40;

    CENTRAL_BH.x = width/2;
    CENTRAL_BH.y = height/2;
    CENTRAL_BH.radius = BH_RADIUS;
  }

  class Star {
    constructor(x, y, vx, vy, r, color){
      this.x = x;
      this.y = y;
      this.vx= vx;
      this.vy= vy;
      this.r = r;
      this.color= color;
      this.active= true;
    }
  }
  class BH {
    constructor(x, y, mass, radius){
      this.x= x;
      this.y= y;
      this.mass= mass;
      this.radius= radius;
      this.active= true;
    }
  }
  class Galaxy {
    constructor(cx, cy, starCount){
      this.cx= cx;
      this.cy= cy;
      this.bh= new BH(cx, cy, 40000, BH_RADIUS);
      this.stars= [];
      for(let i=0; i<starCount; i++){
        this.stars.push(this.makeStar());
      }
      this.done = false;
    }
    makeStar(){
      let angle= Math.random()* Math.PI*2;
      let dist = 50 + Math.random()*200;
      let speed= 0.0003* dist;
      let vx   = -Math.sin(angle)* speed;
      let vy   =  Math.cos(angle)* speed;
      let x    = this.cx + Math.cos(angle)* dist;
      let y    = this.cy + Math.sin(angle)* dist;
      let r    = 1+ Math.random()*1.5;
      let alpha= 0.4+ Math.random()*0.6;
      let color= `rgba(${180+Math.random()*75},${180+Math.random()*75},255,${alpha})`;
      return new Star(x,y,vx,vy,r,color);
    }
  }

  function spawnGalaxy(){
    if(galaxies.length>= GALAXY_MAX) return;
    let gx= 80 + Math.random()*(width-160);
    let gy= 80 + Math.random()*(height-160);
    let starCount= 1200 + Math.floor(Math.random()*800);
    galaxies.push(new Galaxy(gx, gy, starCount));
  }

  function initSim(){
    galaxies.length= 0;
    spawnGalaxy();
    spawnGalaxy();
  }

  function updateGalaxy(gal){
    if(!gal.bh.active) return;
    gal.stars.forEach(st=>{
      if(!st.active) return;

      // 1) 銀河BH
      let dx= gal.bh.x - st.x;
      let dy= gal.bh.y - st.y;
      let dist= Math.sqrt(dx*dx + dy*dy);
      if(dist<1) dist=1;
      let f= G_FACTOR* gal.bh.mass / dist;
      st.vx+= (dx/dist)* f;
      st.vy+= (dy/dist)* f;
      if(dist< gal.bh.radius) st.active=false;

      // 2) 中央BH
      let dxC= CENTRAL_BH.x- st.x;
      let dyC= CENTRAL_BH.y- st.y;
      let distC= Math.sqrt(dxC*dxC+ dyC*dyC);
      if(distC<1) distC=1;
      let fC= G_FACTOR* CENTRAL_BH.mass/ distC;
      st.vx+= (dxC/distC)* fC;
      st.vy+= (dyC/distC)* fC;
      if(distC< CENTRAL_BH.radius) st.active=false;

      // move
      st.x+= st.vx;
      st.y+= st.vy;
      // 範囲外
      if(st.x< -300|| st.x> width+300|| st.y< -300|| st.y> height+300){
        st.active= false;
      }
    });

    // BH vs 中央BH => 合体
    let ddx= CENTRAL_BH.x- gal.bh.x;
    let ddy= CENTRAL_BH.y- gal.bh.y;
    let d= Math.sqrt(ddx*ddx+ ddy*ddy);
    if(d<1) d=1;
    let f= G_FACTOR* CENTRAL_BH.mass/ d;
    gal.bh.x+= (ddx/d)* f*0.2;
    gal.bh.y+= (ddy/d)* f*0.2;

    if(d< (CENTRAL_BH.radius+ gal.bh.radius)){
      CENTRAL_BH.mass += gal.bh.mass;
      gal.bh.active= false;
      gal.done= true;
    }
  }

  function drawGalaxy(gal){
    gal.stars.forEach(st=>{
      if(!st.active) return;
      ctx.beginPath();
      ctx.fillStyle= st.color;
      ctx.arc(st.x, st.y, st.r, 0, 2*Math.PI);
      ctx.fill();
    });
    if(gal.bh.active){
      ctx.beginPath();
      ctx.arc(gal.bh.x, gal.bh.y, gal.bh.radius,0,2*Math.PI);
      ctx.fillStyle='rgba(0,0,0,1)';
      ctx.fill();
      ctx.lineWidth=1;
      ctx.strokeStyle='rgba(0,150,255,0.4)';
      ctx.stroke();
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle='black';
    ctx.fillRect(0,0,width,height);

    galaxies.forEach(updateGalaxy);
    galaxies.forEach(g=>{
      g.stars= g.stars.filter(s=> s.active);
    });
    galaxies.forEach(drawGalaxy);
    for(let i= galaxies.length-1; i>=0; i--){
      if(galaxies[i].done) galaxies.splice(i,1);
    }

    // 中央BH
    if(CENTRAL_BH.active){
      ctx.beginPath();
      ctx.arc(CENTRAL_BH.x, CENTRAL_BH.y, CENTRAL_BH.radius, 0, 2*Math.PI);
      ctx.fillStyle='rgba(0,0,0,1)';
      ctx.fill();
      ctx.lineWidth=1;
      ctx.strokeStyle='rgba(0,150,255,0.4)';
      ctx.stroke();
    }
  }

  function initAll(){
    onResize();
    initSim();
    animate();
    setInterval(spawnGalaxy, SPAWN_INTERVAL);
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('★ cosmicSim => all BH same size, black + thin blue outline, no pulses, final unify.');
}

window.startCosmicSim = cosmicInit;
