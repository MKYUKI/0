(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[946],{1946:function(){window.addEventListener("load",function(){let n,t;let a=document.getElementById("stars-canvas");if(!a)return;let e=a.getContext("2d"),o=[];function r(){n=window.innerWidth,t=window.innerHeight,a.width=n,a.height=t}function i(){o=[];for(let a=0;a<200;a++)o.push({x:Math.random()*n,y:Math.random()*t,r:2*Math.random()+.5,alpha:.8*Math.random()+.2,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3})}window.addEventListener("resize",()=>{r(),i()}),r(),i(),function a(){for(let a of(e.clearRect(0,0,n,t),o))a.x+=a.vx,a.y+=a.vy,(a.x<0||a.x>n||a.y<0||a.y>t)&&(a.x=Math.random()*n,a.y=Math.random()*t),e.beginPath(),e.arc(a.x,a.y,a.r,0,2*Math.PI),e.fillStyle="rgba(0,0,0,".concat(a.alpha,")"),e.fill();requestAnimationFrame(a)}()})}}]);