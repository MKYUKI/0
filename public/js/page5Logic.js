// page5Logic.js
window.addEventListener('load', ()=>{
    const c = document.getElementById('starCanvas');
    if(!c)return;
    const ctx = c.getContext('2d');
    let w, h;
    function resize(){
      w = c.clientWidth; h = c.clientHeight;
      c.width=w; c.height=h;
    }
    resize();
    window.addEventListener('resize', resize);
  
    // 星データ
    let stars=[];
    for(let i=0; i<200; i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 1+ Math.random()*2,
        vx: -1 + Math.random()*2,
        vy: -1 + Math.random()*2
      });
    }
  
    function animate(){
      requestAnimationFrame(animate);
      ctx.fillStyle='#001133';
      ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#fff';
      for(let s of stars){
        s.x+= s.vx;
        s.y+= s.vy;
        if(s.x<0) s.x+= w;
        if(s.x>w) s.x-= w;
        if(s.y<0) s.y+= h;
        if(s.y>h) s.y-= h;
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();
      }
    }
    animate();
  });
  