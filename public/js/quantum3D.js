// public/js/quantum3D.js

console.log('quantum3D.js is being parsed...');

// 3D量子パーティクル (background)
function quantum3DInit() {
  console.log('quantum3DInit() called!');

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    console.warn('No #bg-canvas found for quantum3D.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Could not get 2D context for #bg-canvas');
    return;
  }

  let width, height;
  let particles = [];
  const NUM_PARTICLES = 100;

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    for (let i=0; i<NUM_PARTICLES; i++){
      particles.push({
        x: Math.random()*width,
        y: Math.random()*height,
        z: 1000 + Math.random()*2000, // 手前2000~3000
        size: 1 + Math.random()*3,
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    // 透明背景
    // ctx.fillStyle = 'rgba(255,255,255,0)'; // no fill
    // ctx.fillRect(0,0,width,height);

    for (let i=0; i<particles.length; i++){
      let p = particles[i];
      p.z -= 2; 
      if (p.z < 1) {
        p.z = 3000;
        p.x = Math.random()*width;
        p.y = Math.random()*height;
      }
      let scale = 300 / p.z;
      let px = (p.x - width/2)*scale + width/2;
      let py = (p.y - height/2)*scale + height/2;
      let size = p.size * scale;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.arc(px, py, size, 0, 2*Math.PI);
      ctx.fill();
    }
  }

  function initAll() {
    onResize();
    createParticles();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('quantum3DInit() completed. 3D quantum background active!');
}

window.startQuantum3D = quantum3DInit;
