
// public/js/galaxyArtSim.js
console.log("=== galaxyArtSim.js => Ultra-luminous single 3D galaxy, faster & more vivid. ===");


function galaxyArtSimInit(){
 console.log("galaxyArtSimInit() invoked.");


 const canvas = document.getElementById('galaxy-art-canvas');
 if(!canvas){
   console.error("No #galaxy-art-canvas found for galaxyArtSim!");
   return;
 }
 const ctx = canvas.getContext('2d');
 if(!ctx){
   console.error("2D context not found for galaxy-art-canvas!");
   return;
 }


 let width, height;


 // ======== パラメータ(大幅強化) ========
 const STAR_COUNT = 30000;         // 星の総数: 3万に倍増
 const ARM_COUNT = 5;             // 渦状腕の本数を5本に
 const GALAXY_RADIUS = 900;       // 銀河最大半径を大きく
 const GALAXY_THICKNESS = 100;    // ディスクの厚み
 const ROTATION_SPEED = 0.0001;   // 回転速度を大幅UP
 const ROTATION_X_ANGLE = 0.9;    // X軸での傾け(さらに立体感)
 const BULGE_RADIUS = 120;        // バルジ半径
 const FLAT_REGION = 600;         // フラット部分を拡大


 let stars = [];


 class Star {
   constructor(r, theta, zOff, size, color){
     this.r = r;
     this.theta = theta;
     this.z = zOff;
     this.size = size;
     this.color = color;
   }
   get orbitalVelocity(){
     if(this.r < BULGE_RADIUS){
       // 剛体回転
       return (this.r / BULGE_RADIUS)*0.8; // 内側はやや速く
     } else if(this.r < FLAT_REGION){
       return 0.8 + ((this.r - BULGE_RADIUS)/(FLAT_REGION-BULGE_RADIUS))*0.2;
     } else {
       return 1.0;
     }
   }
 }


 function onResize(){
   width = window.innerWidth;
   height= window.innerHeight;
   canvas.width = width;
   canvas.height= height;
 }


 function createGalaxy(){
   stars = [];
   for(let i=0; i< STAR_COUNT; i++){
     // 銀河中心からの半径 [0, GALAXY_RADIUS)
     let r = Math.random()* GALAXY_RADIUS;


     // アーム数=5
     let armIndex = Math.floor(Math.random()* ARM_COUNT);
     let baseAngle = (armIndex*(2*Math.PI/ARM_COUNT)) + r*0.07;
     let angleOff = (Math.random()-0.5)*1.2; // 散らばり拡大
     let theta = baseAngle + angleOff;


     // z方向(厚み)
     let zOff = (Math.random()-0.5)* GALAXY_THICKNESS * (1 - r/GALAXY_RADIUS);


     // 星サイズ => 高輝度で映えやすく
     let size= 1 + Math.random()*2.5;


     // 色(青紫～ピンク～白あたり)
     let hueBase = 210 + Math.random()*150; // 210~360
     if(hueBase>360) hueBase -= 360;
     let saturation = 70 + Math.random()*30; // 70~100%
     let lightness  = 70 + Math.random()*25; // 70~95%
     let alpha= 0.5 + Math.random()*0.5;     // 0.5~1
     let color= `hsla(${hueBase}, ${saturation}%, ${lightness}%, ${alpha})`;


     stars.push(new Star(r, theta, zOff, size, color));
   }
 }


 let globalAngle = 0;
 function projectStar(s){
   s.theta += (s.orbitalVelocity* ROTATION_SPEED);


   // 極座標->xyz
   let x= s.r* Math.cos(s.theta);
   let y= s.r* Math.sin(s.theta);
   let z= s.z;


   // Z軸回転 => ゆるやかに
   let cosZ = Math.cos(globalAngle), sinZ = Math.sin(globalAngle);
   let rx = x*cosZ - y*sinZ;
   let ry = x*sinZ + y*cosZ;


   // X軸で傾ける
   let cosX= Math.cos(ROTATION_X_ANGLE), sinX= Math.sin(ROTATION_X_ANGLE);
   let rz = ry*sinX + z*cosX;
   let ry2= ry*cosX - z*sinX;


   // カメラ位置
   let camZ= -1300;
   let dz= rz - camZ;
   if(dz<10) dz=10;
   let perspective = 1000 / dz;


   let sx= rx * perspective + width*0.5;
   let sy= ry2* perspective + height*0.5;
   let sr= s.size * perspective* 1.2;
   return { x: sx, y: sy, r: sr };
 }


 function animate(){
   requestAnimationFrame(animate);
   ctx.clearRect(0,0,width,height);


   // 全体ゆっくり回転(少し速く)
   globalAngle += 0.00003;


   for(let i=0; i<stars.length; i++){
     let s= stars[i];
     let pr= projectStar(s);
     if(pr.x < -2000 || pr.x> width+2000 || pr.y < -2000 || pr.y> height+2000) continue;
     ctx.beginPath();
     ctx.fillStyle= s.color;
     let rr= Math.max(0, pr.r);
     if(rr>6) rr=6; // 大きすぎ抑制
     ctx.arc(pr.x, pr.y, rr, 0, 2*Math.PI);
     ctx.fill();
   }
 }


 function initAll(){
   onResize();
   createGalaxy();
   animate();
 }


 window.addEventListener('resize', onResize);
 initAll();


 console.log("startGalaxyArtSim => ULTRA-luminous galaxy, faster & bigger, unstoppable swirl!");
}


window.startGalaxyArtSim = galaxyArtSimInit;

