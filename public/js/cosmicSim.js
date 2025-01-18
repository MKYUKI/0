// public/js/cosmicSim.js

console.log('cosmicSim.js is being parsed...');

// 宇宙史上最大の星＆惑星シミュレーション
function cosmicInit() {
  console.log('cosmicInit() called!');

  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) {
    console.error('No #cosmic-canvas in DOM!');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Cannot get 2D context from cosmic-canvas!');
    return;
  }

  function resizeCanvas() {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    console.log('cosmic-canvas resized =>', canvas.width, 'x', canvas.height);
  }
  resizeCanvas();

  // 宇宙規模: 星＆惑星
  const STAR_COUNT = 2000;
  const PLANET_COUNT = 8;
  let cosmicObjects = [];
  const GRAVITY_CENTER = { x: 0, y: 0 };

  class CosmicObject {
    constructor(x, y, size, speed, color, isPlanet) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.size = size;
      this.speed = speed;
      this.color = color;
      this.isPlanet = isPlanet;
    }
  }

  function createStars() {
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 0.5 + Math.random() * 1.5;
      const speed = 0.02 + Math.random() * 0.04;
      const alpha = 0.3 + Math.random() * 0.7;
      const color = `rgba(255,255,255,${alpha})`;
      cosmicObjects.push(
        new CosmicObject(x, y, size, speed, color, false)
      );
    }
  }

  function createPlanets() {
    const planetColors = [
      'rgba(255,180,180,0.8)',
      'rgba(180,255,180,0.8)',
      'rgba(180,180,255,0.8)',
      'rgba(255,255,180,0.8)',
      'rgba(255,200,255,0.8)',
      'rgba(200,255,255,0.8)',
      'rgba(255,220,200,0.8)',
      'rgba(220,200,255,0.8)',
    ];
    for (let i = 0; i < PLANET_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 12 + Math.random() * 28;
      const speed = 0.01 + Math.random() * 0.01;
      const color = planetColors[i % planetColors.length];
      cosmicObjects.push(
        new CosmicObject(x, y, size, speed, color, true)
      );
    }
  }

  function update(obj) {
    const dx = GRAVITY_CENTER.x - obj.x;
    const dy = GRAVITY_CENTER.y - obj.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const force = 0.00008 * dist * obj.speed;
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;
    obj.vx += ax;
    obj.vy += ay;

    const maxSpeed = obj.isPlanet ? 1.2 : 0.9;
    const sp = Math.sqrt(obj.vx*obj.vx + obj.vy*obj.vy);
    if (sp > maxSpeed) {
      obj.vx = (obj.vx/sp)*maxSpeed;
      obj.vy = (obj.vy/sp)*maxSpeed;
    }

    obj.x += obj.vx;
    obj.y += obj.vy;

    if (!obj.isPlanet && dist < 30) {
      obj.x = Math.random()*canvas.width;
      obj.y = Math.random()*canvas.height;
      obj.vx = 0;
      obj.vy = 0;
    }
  }

  function draw(obj) {
    ctx.beginPath();
    ctx.fillStyle = obj.color;
    ctx.arc(obj.x, obj.y, obj.size, 0, 2*Math.PI);
    ctx.fill();
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cosmicObjects.forEach((o) => {
      update(o);
      draw(o);
    });
  }

  function initSim() {
    cosmicObjects = [];
    GRAVITY_CENTER.x = canvas.width/2;
    GRAVITY_CENTER.y = canvas.height/2;
    createStars();
    createPlanets();
    animate();
  }
  initSim();

  window.addEventListener('resize', resizeCanvas);

  console.log('cosmicInit() completed. Epic cosmic simulation has begun!');
}

window.startCosmicSim = cosmicInit;
