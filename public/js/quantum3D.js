/**
 * quantum3D.js
 * 3D っぽいパーティクルアニメのサンプル
 */
(function(){
  let canvas, ctx;
  let width, height;
  let particles = [];
  const NUM_PARTICLES = 60;

  function init(){
    canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    ctx = canvas.getContext('2d');
    onResize();
    createParticles();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles(){
    particles = [];
    for(let i=0; i<NUM_PARTICLES; i++){
      particles.push({
        x: Math.random()*width,
        y: Math.random()*height,
        z: Math.random()*1000, 
        size: 2+Math.random()*3,
      });
    }
  }

  function animate(){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,width,height);

    for(let i=0; i<particles.length; i++){
      let p = particles[i];
      p.z -= 2; // カメラに向かって突っ込む
      if(p.z < 1) {
        p.z = 1000;
        p.x = Math.random()*width;
        p.y = Math.random()*height;
      }
      // パース変換
      let scale = 300 / p.z;
      let px = (p.x - width/2) * scale + width/2;
      let py = (p.y - height/2) * scale + height/2;
      ctx.beginPath();
      ctx.arc(px, py, p.size * scale, 0, 2*Math.PI);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
