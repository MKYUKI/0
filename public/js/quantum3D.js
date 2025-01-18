/**
 * public/js/quantum3D.js
 * 
 * 3Dワイヤーフレーム風に幾何学模様を黒線で描く（背景は白）。
 * 立体の頂点を回転させて投影し、幻想的な量子構造を表現。
 */

(function(){
  let canvas, ctx;
  let width, height;
  
  // 3D頂点集（例：正八面体）
  const vertices = [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
  ];
  // edges: 頂点インデックスをつないで線にする
  const edges = [
    [0,1], [0,2], [0,3], [0,4],
    [5,1], [5,2], [5,3], [5,4],
    [1,2], [2,3], [3,4], [4,1]
  ];

  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;

  function init(){
    canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    ctx = canvas.getContext('2d');
    onResize();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function rotate3D(x, y, z, ax, ay, az) {
    // シンプルな回転：Z軸回転 → X軸 → Y軸など
    let cosz = Math.cos(az), sinz = Math.sin(az);
    let cosx = Math.cos(ax), sinx = Math.sin(ax);
    let cosy = Math.cos(ay), siny = Math.sin(ay);

    // 回転Z
    let dx = x * cosz - y * sinz;
    let dy = x * sinz + y * cosz;
    let dz = z;

    // 回転X
    let dy2 = dy * cosx - dz * sinx;
    let dz2 = dy * sinx + dz * cosx;
    dx = dx;
    dy = dy2;
    dz = dz2;

    // 回転Y
    let dz3 = dz * cosy - dx * siny;
    let dx3 = dz * siny + dx * cosy;

    return [dx3, dy, dz3];
  }

  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,width,height);

    // 白背景
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // 黒線
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = 2;

    angleX += 0.003;
    angleY += 0.0025;
    angleZ += 0.002;

    // edges を順に描画
    ctx.beginPath();
    for (let e of edges) {
      let v1 = vertices[e[0]];
      let v2 = vertices[e[1]];

      // 回転
      let r1 = rotate3D(v1[0], v1[1], v1[2], angleX, angleY, angleZ);
      let r2 = rotate3D(v2[0], v2[1], v2[2], angleX, angleY, angleZ);

      // 投影
      let scale = 200; // 拡大
      let x1 = r1[0]*scale + width/2;
      let y1 = r1[1]*scale + height/2;
      let x2 = r2[0]*scale + width/2;
      let y2 = r2[1]*scale + height/2;

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
