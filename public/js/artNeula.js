// public/js/artNeula.js
console.log("=== artNeula.js => More vivid cosmic nebulas, faster spawning & bigger. ===");

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

  const SPAWN_INTERVAL= 2500; // 3.5秒->2.5秒 (頻度UP)

  class Nebula{
    constructor(){
      this.x= Math.random()* width;
      this.y= Math.random()* height;
      this.radius= 150 + Math.random()*200; // 大きめ
      // 彩度を高め、ピンクや紫,青を強めに
      let baseHue= 200 + Math.random()*160; 
      if(baseHue>360) baseHue-=360;
      this.hue= baseHue;
      this.alpha= 0.4+ Math.random()*0.4; // 0.4~0.8
      this.growth= 0.6+ Math.random()*0.5;
      this.life= 600+ Math.random()*300;
      this.age= 0;
    }
    update(){
      this.age++;
      this.radius+= this.growth;
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
      grad.addColorStop(0, `hsla(${this.hue},90%,70%,${this.alpha})`);
      grad.addColorStop(1, `hsla(${(this.hue+40)%360},90%,30%,0)`);
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
    nebulas= nebulas.filter(nb=> !nb.dead);
  }

  function initAll(){
    onResize();
    animate();
    setInterval(spawnNebula, SPAWN_INTERVAL);
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log("startArtNebula => bigger, more frequent cosmic clouds, super vivid & dreamy.");
}

window.startArtNebula = artNebulaInit;
