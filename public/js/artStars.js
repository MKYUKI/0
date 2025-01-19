// ==============================
// File: public/js/artStars.js
// ==============================
console.log("artStars.js => cosmic starfield + meteors in 3D style, no BH.");

function artStarsInit(){
  console.log("artStarsInit() invoked.");

  const canvas= document.getElementById('art-stars-canvas');
  if(!canvas){
    console.warn("No #art-stars-canvas found for artStars.");
    return;
  }
  const ctx= canvas.getContext('2d');
  if(!ctx){
    console.warn("No 2D context for art-stars-canvas!");
    return;
  }

  let width, height;
  const STAR_COUNT= 1200;  // 遠方星の数
  const METEOR_COUNT= 20;  // 流れ星
  let starfield=[], meteors=[];

  class Star3D{
    constructor(){
      this.reset();
      // Z方向のスピード (遠くから手前へ)
      this.speedZ= 1+ Math.random()*3; 
    }
    reset(){
      this.x= (Math.random()-0.5)*2000; 
      this.y= (Math.random()-0.5)*2000;
      this.z= 600 + Math.random()*3000; 
      this.size= 0.5+ Math.random()*1.5;
      this.phase= Math.random()*Math.PI*2;
      this.amp= 0.3+ Math.random()*0.7;
    }
    update(){
      // 手前に進む
      this.z -= this.speedZ * 0.5; 
      if(this.z<1){
        this.reset();
        this.z= 3000;
      }
      // ゆるやか点滅
      this.phase += 0.02;
    }
  }

  class Meteor{
    constructor(){
      this.reset();
    }
    reset(){
      // 上端 or 右端 などから飛来
      if(Math.random()<0.5){
        this.x= Math.random()*width;
        this.y= -50;
        this.vx= (Math.random()-0.5)*1;
        this.vy= 1+ Math.random()*1.5;
      } else {
        this.x= width+50;
        this.y= Math.random()*height;
        this.vx= -(1+ Math.random()*2);
        this.vy= (Math.random()-0.5)*1;
      }
      this.r= 1+ Math.random()*2;
    }
    update(){
      this.x+= this.vx;
      this.y+= this.vy;
      if(this.x< -200 || this.x> width+200 || this.y< -200 || this.y> height+200){
        this.reset();
      }
    }
  }

  function onResize(){
    width= window.innerWidth;
    height= window.innerHeight;
    canvas.width= width;
    canvas.height= height;
  }

  function createStars(){
    starfield=[];
    for(let i=0; i<STAR_COUNT; i++){
      starfield.push(new Star3D());
    }
  }

  function createMeteors(){
    meteors=[];
    for(let i=0; i<METEOR_COUNT; i++){
      meteors.push(new Meteor());
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    // 遠方星(3D風)
    starfield.forEach(s=>{
      s.update();
      let scale= 500/(500 + s.z);
      let sx= s.x* scale + width*0.5;
      let sy= s.y* scale + height*0.5;
      let br= (Math.sin(s.phase)+1)/2 * s.amp;
      let alpha= 0.2+ br;
      let rad= s.size* scale;
      ctx.beginPath();
      ctx.fillStyle= `rgba(255,255,255,${alpha})`;
      ctx.arc(sx, sy, rad, 0,2*Math.PI);
      ctx.fill();
    });

    // 流れ星
    meteors.forEach(m=>{
      m.update();
      ctx.beginPath();
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.arc(m.x,m.y,m.r,0,2*Math.PI);
      ctx.fill();
      // tail
      ctx.beginPath();
      ctx.strokeStyle='rgba(255,255,255,0.4)';
      ctx.lineWidth=2;
      ctx.moveTo(m.x,m.y);
      ctx.lineTo(m.x - m.vx*12, m.y- m.vy*12);
      ctx.stroke();
    });
  }

  function initAll(){
    onResize();
    createStars();
    createMeteors();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log("startArtStars => 3D starfield + meteors, no BH, infinitely beautiful.");
}

window.startArtStars = artStarsInit;
