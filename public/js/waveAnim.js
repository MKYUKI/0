// public/js/waveAnim.js
console.log('waveAnim => slow quantum waves in top hero only.');


function waveAnimInit(){
 console.log('waveAnimInit() invoked.');


 const canvas= document.getElementById('wave-canvas');
 if(!canvas){
   console.warn('No #wave-canvas found for waveAnim.');
   return;
 }
 const ctx= canvas.getContext('2d');
 if(!ctx){
   console.warn('No 2D ctx for wave-canvas');
   return;
 }


 let width, height;
 let t=0;


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


 function drawWave(){
   ctx.clearRect(0,0,width,height);


   // 5本の波
   let waveNum= 5;
   for(let w=0; w<waveNum; w++){
     ctx.beginPath();
     // freqをさらに小さく => 長周期
     let freq= 0.003 + 0.001*w + 0.0003*Math.sin(t*0.02 + w);
     let amp= (height*0.1) - w*8;
     let shift= t*(0.15+ w*0.1);


     let hue= (t*2 + w*60)%360;
     let alpha= 0.5 - w*0.1;
     ctx.strokeStyle= `hsla(${hue},80%,60%,${alpha})`;
     ctx.lineWidth= 2- w*0.3;


     for(let x=0; x<=width; x+= 10){
       let y= height*0.5 + Math.sin(x*freq + shift)* amp;
       if(x===0) ctx.moveTo(x,y);
       else ctx.lineTo(x,y);
     }
     ctx.stroke();
   }


   t+= 0.005;
 }


 function animate(){
   requestAnimationFrame(animate);
   drawWave();
 }


 function initAll(){
   onResize();
   animate();
 }


 window.addEventListener('resize', onResize);
 initAll();
 console.log('waveAnim => calm multi-waves in top hero only.');
}


window.startWaveAnim= waveAnimInit;


