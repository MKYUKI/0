// ==============================
// File: public/js/artNeula.js
// ==============================
console.log("artNeula.js => large scale cosmic nebulas, no BH.");

function artNebulaInit(){
  console.log("artNebulaInit() invoked.");

  const canvas= document.getElementById('art-nebula-canvas');
  if(!canvas){
    console.warn("No #art-nebula-canvas found for artNebula.");
    return;
  }
  const ctx= canvas.getContext('2d');
  if(!ctx){
    console.warn("No 2D ctx for art-nebula-canvas!");
    return;
  }

  let width, height;
  let nebulas=[];

  const SPAWN_INTERVAL= 3500; // 3.5秒ごとに雲発生

  class Nebula{
    constructor(){
      this.x= Math.random()* width;
      this.y= Math.random()* height;
      this.radius= 80 + Math.random()*150;
      // 青/紫/ピンク系の色相(少し幅広)
      let baseHue= 180 + Math.random()*180; // 180~360
      if(baseHue>360) baseHue-=360;
      this.hue= baseHue;
      this.alpha= 0.3+ Math.random()*0.4;
      this.growth= 0.3+ Math.random()*0.4;
      this.life= 500+ Math.random()*300;
      this.age= 0;
    }
    update(){
      this.age++;
      this.radius+= this.growth;
      // 寿命を超えたらフェードアウト
      if(this.age> this.life){
        this.alpha-=0.01;
        if(this.alpha<0) this.alpha=0;
      }
    }
    draw(ctx){
      ctx.beginPath();
      let grad= ctx.createRadialGradient(
        this.x,this.y,0,
        this.x,this.y,this.radius
      );
      grad.addColorStop(0, `hsla(${this.hue},80%,70%,${this.alpha})`);
      grad.addColorStop(1, `hsla(${(this.hue+60)%360},80%,30%,0)`);
      ctx.fillStyle= grad;
      ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
      ctx.fill();
    }
    get dead(){
      return (this.alpha<=0);
    }
  }

  function onResize(){
    width= window.innerWidth;
    height= window.innerHeight;
    canvas.width= width;
    canvas.height= height;
  }

  function spawnNebula(){
    nebulas.push(new Nebula());
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    nebulas.forEach(nb=>{
      nb.update();
      nb.draw(ctx);
    });
    // 死んだ雲を除去
    nebulas= nebulas.filter(nb=> !nb.dead);
  }

  function initAll(){
    onResize();
    animate();
    setInterval(spawnNebula, SPAWN_INTERVAL);
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log("startArtNebula => infinite cosmic clouds, no BH, bright & dreamy.");
}

window.startArtNebula = artNebulaInit;
