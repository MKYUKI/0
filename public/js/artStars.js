// ==============================
// File: public/js/artStars.js
// ==============================
console.log("artStars.js => starfield without sperm-like tails.");

// ★★★ "尾" を廃止 => 流れ星の尾を描きません ★★★

function artStarsInit(){
  console.log("artStarsInit() invoked.");

  const canvas= document.getElementById('art-stars-canvas');
  if(!canvas){
    console.warn("No #art-stars-canvas found for artStars.");
    return;
  }
  const ctx= canvas.getContext('2d');
  if(!ctx){
    console.warn("No 2D context for #art-stars-canvas!");
    return;
  }

  let width, height;
  const STAR_COUNT= 800;  // 遠方星
  const METEOR_COUNT= 30; // 流れ星(尾なし)

  let stars=[], meteors=[];

  class Star {
    constructor(){
      this.reset();
    }
    reset(){
      this.x= Math.random()*width;
      this.y= Math.random()*height;
      this.r= 0.5 + Math.random()*1.5;
      this.alpha= 0.3 + Math.random()*0.7;
    }
    update(){}
    draw(){
      ctx.beginPath();
      ctx.fillStyle= `rgba(255,255,255,${this.alpha})`;
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
    }
  }

  class Meteor {
    constructor(){
      this.reset();
    }
    reset(){
      // 上or右端から出現
      if(Math.random()<0.5){
        this.x= Math.random()*width;
        this.y= -20;
        this.vx= (Math.random()-0.5)*1.0;
        this.vy= 1 + Math.random()*1.5;
      } else {
        this.x= width+20;
        this.y= Math.random()*height;
        this.vx= -(1 + Math.random()*1.5);
        this.vy= (Math.random()-0.5)*0.8;
      }
      this.r= 1 + Math.random()*2.5;
      this.alpha= 0.8 + Math.random()*0.2;
    }
    update(){
      this.x+= this.vx;
      this.y+= this.vy;
      // 画面外に行ったらリセット
      if(this.x < -100 || this.x> width+100 || this.y< -100 || this.y> height+100){
        this.reset();
      }
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle= `rgba(255,255,255,${this.alpha})`;
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      // ★尾は描かない★
    }
  }

  function onResize(){
    width= window.innerWidth;
    height= window.innerHeight;
    canvas.width= width;
    canvas.height= height;
  }

  function initAll(){
    stars= [];
    meteors=[];
    for(let i=0; i<STAR_COUNT; i++){
      stars.push(new Star());
    }
    for(let j=0; j<METEOR_COUNT; j++){
      meteors.push(new Meteor());
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    // stars
    stars.forEach(s=>{
      s.update();
      s.draw();
    });

    // meteors
    meteors.forEach(m=>{
      m.update();
      m.draw();
    });
  }

  window.addEventListener('resize', onResize);
  onResize();
  initAll();
  animate();

  console.log("startArtStars => starfield + meteors (NO tails).");
}

window.startArtStars = artStarsInit;
