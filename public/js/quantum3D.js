// public/js/quantum3D.js
console.log('quantum3D => swirl in top hero only => super slow.');

function quantum3DInit(){
  console.log('quantum3DInit() invoked.');

  const canvas = document.getElementById('bg-canvas');
  if(!canvas){
    console.warn('No #bg-canvas found for quantum3D.');
    return;
  }
  const ctx= canvas.getContext('2d');
  if(!ctx){
    console.warn('No 2D ctx for #bg-canvas');
    return;
  }

  let width, height;
  const POINT_COUNT= 400;
  let points=[];
  let angle=0;
  let cameraRadius= 700;
  let cameraAngle= 0;

  function onResize(){
    const hero= document.querySelector('.hero-section');
    if(hero){
      width= hero.offsetWidth;
      height= hero.offsetHeight;
    } else {
      width= window.innerWidth;
      height= 600;
    }
    canvas.width= width;
    canvas.height= height;
  }

  function createPoints(){
    points=[];
    for(let i=0; i< POINT_COUNT; i++){
      let radius= 100+ Math.random()* (Math.min(width,height)*0.4);
      let theta= Math.random()* Math.PI*2;
      let x= Math.cos(theta)* radius;
      let y= (Math.random()-0.5)* radius;
      let z= Math.sin(theta)* radius;
      let size= 2+ Math.random()*3;
      let color= `hsla(${Math.random()*360}, 70%, 60%, 0.6)`;
      points.push({ x, y, z, size, color });
    }
  }

  function project3D(p, camX, camY, camZ, rotY){
    let cy= Math.cos(rotY), sy= Math.sin(rotY);
    let dx= p.x- camX;
    let dz= p.z- camZ;
    let fx= dx*cy - dz*sy;
    let fz= dx*sy + dz*cy;
    let fy= p.y- camY;

    let dist= 400;
    let scale= dist/(dist+ fz);
    let sx= fx* scale + width/2;
    let sy= fy* scale + height/2;
    let r= p.size* scale;
    return { x:sx, y:sy, r, color: p.color };
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    cameraAngle+= 0.0006; // very slow
    let camX= Math.cos(cameraAngle)* cameraRadius;
    let camZ= Math.sin(cameraAngle)* cameraRadius;
    let rotY= angle* 0.15;
    angle+= 0.001;

    points.forEach(pt=>{
      let pr= project3D(pt, camX, 0, camZ, rotY);
      ctx.beginPath();
      ctx.fillStyle= pr.color;
      ctx.arc(pr.x, pr.y, pr.r, 0,2*Math.PI);
      ctx.fill();
    });
  }

  function initAll(){
    onResize();
    createPoints();
    animate();
  }

  window.addEventListener('resize', onResize);
  initAll();
  console.log('quantum3D => swirl in hero only => super slow camera revolve.');
}

window.startQuantum3D= quantum3DInit;
