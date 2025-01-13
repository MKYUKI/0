// public/js/page5Logic.js
window.addEventListener('load', ()=>{
  const canvas = document.getElementById('deepblue-star-canvas');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  let w,h;

  function resize(){
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w;
    canvas.height= h;
  }
  resize();
  window.addEventListener('resize', resize);

  // 星データ
  const starCount=160;
  let stars=[];
  for(let i=0; i<starCount; i++){
    stars.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:1+Math.random()*2,
      vx:-1+Math.random()*2,
      vy:-1+Math.random()*2
    });
  }

  function animate(){
    requestAnimationFrame(animate);
    // DeepBlue背景
    ctx.fillStyle='#d0ecff';
    ctx.fillRect(0,0,w,h);

    // 黒い星
    ctx.fillStyle='#000';
    stars.forEach(s=>{
      s.x+=s.vx;
      s.y+=s.vy;

      if(s.x<0) s.x+=w;
      if(s.x>w) s.x-=w;
      if(s.y<0) s.y+=h;
      if(s.y>h) s.y-=h;

      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    });
  }
  animate();
});
