// starsAnim.js
window.addEventListener('load', ()=>{
    const c = document.getElementById('starsCanvas');
    if(!c)return;
    const ctx = c.getContext('2d');
    let w,h;
  
    function resize(){
      w=c.clientWidth; h=c.clientHeight;
      c.width=w; c.height=h;
    }
    resize();
    window.addEventListener('resize', resize);
  
    // 星データ
    const starCount=150;
    let stars=[];
    for(let i=0;i<starCount;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 1+ Math.random()*2,
        vx: -0.5 + Math.random()*1,
        vy: -0.5 + Math.random()*1
      });
    }
  
    function animate(){
      requestAnimationFrame(animate);
      ctx.fillStyle='#001133';
      ctx.fillRect(0,0,w,h);
  
      ctx.fillStyle='#fff';
      for(let s of stars){
        s.x += s.vx;
        s.y += s.vy;
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
  });
  