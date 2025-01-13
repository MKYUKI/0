// public/js/page5Logic.js
(function(){
  if (typeof window === 'undefined') return;

  const c = document.getElementById('starCanvas5');
  if(!c)return;
  const ctx = c.getContext('2d');

  let w,h;
  function resize(){
    w = c.clientWidth;
    h = c.clientHeight;
    c.width = w;
    c.height = h;
  }
  resize();
  window.addEventListener('resize', resize);

  // 黒星を配置
  const starCount = 120;
  let stars = [];
  for(let i=0; i<starCount;i++){
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1+Math.random()*2,
      vx:(Math.random()-0.5)*0.5,
      vy:(Math.random()-0.5)*0.5
    });
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle='#000';
    for(const s of stars){
      s.x+=s.vx;
      s.y+=s.vy;
      if(s.x<0) s.x+=w;
      if(s.x>w) s.x-=w;
      if(s.y<0) s.y+=h;
      if(s.y>h) s.y-=h;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    }
  }
  animate();
})();
