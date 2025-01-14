// public/js/starsAnim.js
(function(){
  if(typeof window==='undefined') return;

  window.addEventListener('load', ()=>{
    const canvas = document.getElementById('stars-canvas');
    if(!canvas) return;

    const ctx = canvas.getContext('2d');
    let w,h;
    const starCount = 150;
    let stars = [];

    function resize(){
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }
    window.addEventListener('resize', resize);
    resize();

    function createStars(){
      stars = [];
      for(let i=0; i<starCount; i++){
        stars.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: 1+Math.random()*2,
          alpha: Math.random()*0.4+0.2,
          vx: (Math.random()-0.5)*0.3,
          vy: (Math.random()-0.5)*0.3
        });
      }
    }
    createStars();

    function animate(){
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,w,h);
      stars.forEach(s=>{
        s.x += s.vx;
        s.y += s.vy;
        if(s.x<0) s.x+=w;
        if(s.x>w) s.x-=w;
        if(s.y<0) s.y+=h;
        if(s.y>h) s.y-=h;

        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,0,0,${s.alpha})`;
        ctx.fill();
      });
    }
    animate();
  });
})();
