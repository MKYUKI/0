
// page4Logic.js
window.addEventListener('load', ()=>{
  const canvas = document.getElementById('canvas4');
  if(!canvas)return;
  const ctx = canvas.getContext('2d');
   function resize(){
    canvas.width = canvas.clientWidth;
    canvas.height= canvas.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);
   let tStart = performance.now();
   function animate(){
    requestAnimationFrame(animate);
    const t = (performance.now()-tStart)*0.001;
     // 背景クリア
    ctx.clearRect(0,0,canvas.width,canvas.height);
     // 波を描く
    ctx.strokeStyle= 'rgba(100,80,30,0.5)';
    ctx.lineWidth=2;
    ctx.beginPath();
    for(let x=0; x<canvas.width; x+=10){
      let y = canvas.height/2 + Math.sin((x*0.01)+ t)*50;
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  animate();
});




