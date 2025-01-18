// public/js/cosmicSim.js
console.log('MultiGalaxy cosmicSim - super slow + never truly ends, top-only hero.');

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
  const CENTRAL_BH = { x: 0, y: 0, mass: 150000, radius: 70 }; 
  const G_FACTOR = 0.000005; // よりスローに
  const GALAXY_MAX = 4; 
  const SPAWN_INTERVAL = 20000; // 20秒に1銀河

  function onResize(){
    // hero-section の大きさを取得
    let heroSec = document.querySelector('.hero-section');
    if (!heroSec) {
      console.warn('No .hero-section found, fallback to window size');
      width = window.innerWidth;
      height= 600;
    } else {
      width  = heroSec.offsetWidth;
      height = heroSec.offsetHeight; 
    }
    canvas.width = width;
    canvas.height= height;
    CENTRAL_BH.x = width*0.5;
    CENTRAL_BH.y = height*0.5;
  }

  class Star {
    constructor(x, y, vx, vy, r, color) {
      this.x = x; this.y = y;
      this.vx= vx; this.vy= vy;
      this.r= r; 
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
    }
  }
  class Galaxy {
    constructor(cx, cy, starCount){
      this.cx= cx; 
      this.cy= cy;
      this.bh= new BH(cx, cy, 40000, 40);
      this.stars= [];
      for(let i=0; i<starCount; i++){
        this.stars.push( this.makeStar() );
      }
    }
    makeStar(){
      let angle= Math.random()* Math.PI*2;
      let dist = 50 + Math.random()*150; 
      let x= this.cx + Math.cos(angle)*dist;
      let y= this.cy + Math.sin(angle)*dist;
      let speed= 0.0003* dist; // 超スロー
      let vx= -Math.sin(angle)* speed;
      let vy=  Math.cos(angle)* speed;
      let r = 1 + Math.random()*1.5;
      let alpha= 0.4+ Math.random()*0.6;
      // 色をやや青み
      let color= `rgba(${180+Math.random()*75}, ${180+Math.random()*75}, 255, ${alpha})`;
      return new Star(x,y,vx,vy,r,color);
    }
  }

  function spawnGalaxy(){
    if(galaxies.length>= GALAXY_MAX) return;
    let gx = 80 + Math.random()*(width-160);
    let gy = 80 + Math.random()*(height-160);
    let starCount= 1000 + Math.floor(Math.random()*1500);
    galaxies.push( new Galaxy(gx, gy, starCount) );
  }

  function initSim(){
    galaxies.length= 0;
    // 2~3個先に作る
    spawnGalaxy();
    spawnGalaxy();
    spawnGalaxy();
  }

  function updateGalaxy(gal){
    gal.stars.forEach(st=>{
      if(!st.active) return;
      // 銀河中心BH
      let dx= gal.bh.x - st.x;
      let dy= gal.bh.y - st.y;
      let dist= Math.sqrt(dx*dx+ dy*dy);
      if(dist<1) dist=1;
      let force= G_FACTOR* gal.bh.mass/ dist;
      st.vx+= (dx/dist)* force;
      st.vy+= (dy/dist)* force;
      if(dist< gal.bh.radius){
        st.active= false;
      }

      // 中央BH
      let dxC= CENTRAL_BH.x- st.x;
      let dyC= CENTRAL_BH.y- st.y;
      let distC= Math.sqrt(dxC*dxC+ dyC*dyC);
      if(distC<1) distC=1;
      let forceC= G_FACTOR* CENTRAL_BH.mass/distC;
      st.vx+= (dxC/distC)* forceC;
      st.vy+= (dyC/distC)* forceC;
      if(distC< CENTRAL_BH.radius){
        st.active= false;
      }

      // move
      st.x += st.vx;
      st.y += st.vy;
      // 範囲外 (hero-section外) -> star消滅
      if(st.x< -200 || st.x> width+200 || st.y< -200 || st.y> height+200){
        st.active= false;
      }
    });

    // galaxy BH => 中央BH
    let ddx= CENTRAL_BH.x - gal.bh.x;
    let ddy= CENTRAL_BH.y - gal.bh.y;
    let d= Math.sqrt(ddx*ddx+ ddy*ddy);
    if(d<1) d=1;
    let f= G_FACTOR* CENTRAL_BH.mass/ d;
    gal.bh.x += (ddx/d)* f * 0.1;
    gal.bh.y += (ddy/d)* f * 0.1;
  }

  function drawGalaxy(gal){
    // star
    gal.stars.forEach(st=>{
      if(!st.active) return;
      ctx.beginPath();
      ctx.fillStyle= st.color;
      ctx.arc(st.x, st.y, st.r, 0,2*Math.PI);
      ctx.fill();
    });
    // BH
    ctx.beginPath();
    ctx.arc(gal.bh.x, gal.bh.y, gal.bh.radius, 0,2*Math.PI);
    ctx.fillStyle='rgba(0,0,0,1)';
    ctx.fill();
    ctx.lineWidth=2;
    ctx.strokeStyle='rgba(255,0,0,0.6)';
    ctx.stroke();
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle= 'black';
    ctx.fillRect(0,0,width,height);

    // update
    galaxies.forEach(updateGalaxy);
    // cull
    galaxies.forEach(g=>{
      g.stars= g.stars.filter(s=> s.active);
    });

    // draw
    galaxies.forEach(drawGalaxy);

    // merge check
    galaxies.forEach(g=>{
      let dx= CENTRAL_BH.x- g.bh.x;
      let dy= CENTRAL_BH.y- g.bh.y;
      let dist= Math.sqrt(dx*dx+ dy*dy);
      let activeStars= g.stars.length;
      if(dist< (CENTRAL_BH.radius+ g.bh.radius) && activeStars<50){
        g.done= true;
      }
    });
    for(let i= galaxies.length-1; i>=0; i--){
      if(galaxies[i].done) galaxies.splice(i,1);
    }

    // central BH
    ctx.beginPath();
    ctx.arc(CENTRAL_BH.x, CENTRAL_BH.y, CENTRAL_BH.radius, 0,2*Math.PI);
    ctx.fillStyle= 'rgba(0,0,0,1)';
    ctx.fill();
    ctx.lineWidth=3;
    ctx.strokeStyle='rgba(255,0,0,0.8)';
    ctx.stroke();
  }

  function initAll(){
    onResize();
    initSim();
    animate();
    setInterval(spawnGalaxy, SPAWN_INTERVAL);
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('cosmicSim => multi galaxy + central BH + super slow, all in hero-section only.');
}

window.startCosmicSim = cosmicInit;
