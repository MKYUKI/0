// public/js/starsAnim.js
console.log('starsAnim => top hero supernova + slower meteors');


function starsAnimInit(){
 console.log('starsAnimInit() called.');


 const canvas= document.getElementById('stars-canvas');
 if(!canvas){
   console.warn('No #stars-canvas found.');
   return;
 }
 const ctx= canvas.getContext('2d');
 if(!ctx){
   console.warn('No 2D ctx for #stars-canvas');
   return;
 }


 let width, height;
 const STAR_COUNT= 300;
 const METEOR_COUNT= 30;
 let stars=[];
 let meteors=[];


 class SuperStar {
   constructor(){
     this.reset();
   }
   reset(){
     this.x= Math.random()* width;
     this.y= Math.random()* height;
     this.r= 1+ Math.random()*2;
     this.phase= Math.random()* Math.PI*2;
     this.amp= 1+ Math.random()*2;
   }
   update(){
     this.phase+= 0.02; // flicker slower
     let scale= (Math.sin(this.phase)+1)/2;
     this.brightness= scale* this.amp;
   }
 }


 class Meteor {
   constructor(){
     this.reset();
   }
   reset(){
     if(Math.random()<0.5){
       this.x= Math.random()* width;
       this.y= -30;
       this.vx= (Math.random()-0.5)*1;
       this.vy= 0.5+ Math.random()*1;
     } else {
       this.x= width+30;
       this.y= Math.random()*height;
       this.vx= -(0.5+ Math.random()*1);
       this.vy= (Math.random()-0.5)*0.7;
     }
     this.r= 1+ Math.random()*2;
   }
   update(){
     this.x+= this.vx;
     this.y+= this.vy;
     if(this.x< -50 || this.y> height+50 || this.y< -50){
       this.reset();
     }
   }
 }


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


 function createObjects(){
   stars=[];
   meteors=[];
   for(let i=0;i< STAR_COUNT;i++){
     let s= new SuperStar();
     s.x= Math.random()*width;
     s.y= Math.random()*height;
     stars.push(s);
   }
   for(let j=0; j< METEOR_COUNT; j++){
     meteors.push(new Meteor());
   }
 }


 function animate(){
   requestAnimationFrame(animate);
   ctx.clearRect(0,0,width,height);


   // stars
   stars.forEach(s=>{
     s.update();
     let alpha= 0.2+ s.brightness*0.8;
     ctx.beginPath();
     ctx.fillStyle= `rgba(255,255,255,${alpha})`;
     let rad= s.r + s.brightness*0.8;
     ctx.arc(s.x, s.y, rad, 0,2*Math.PI);
     ctx.fill();
   });


   // meteors
   meteors.forEach(m=>{
     m.update();
     ctx.beginPath();
     ctx.fillStyle='rgba(255,255,255,0.9)';
     ctx.arc(m.x,m.y,m.r,0,2*Math.PI);
     ctx.fill();
     // tail
     ctx.beginPath();
     ctx.strokeStyle='rgba(255,255,255,0.4)';
     ctx.lineWidth=2;
     ctx.moveTo(m.x,m.y);
     ctx.lineTo(m.x- m.vx*12, m.y- m.vy*12);
     ctx.stroke();
   });
 }


 function initAll(){
   onResize();
   createObjects();
   animate();
 }


 window.addEventListener('resize', onResize);
 initAll();
 console.log('starsAnim => top hero only + slower supernova + meteors');
}


window.startStarsAnim= starsAnimInit;
