// public/js/artStars.js
console.log("=== artStars.js => ONLY drifting squares, bigger size, no top/right spawns. ===");

function artStarsInit(){
  console.log("artStarsInit() invoked. Now squares float in random directions.");


  const canvas= document.getElementById('art-stars-canvas');
  if(!canvas){
    console.warn("No #art-stars-canvas found for artStars.");
    return;
  }
  const ctx= canvas.getContext('2d');
  if(!ctx){
    console.warn("No 2D context for #art-stars-canvas!");
    return;
  }

  let width, height;
  
  // 四角形の個数
  const SQUARE_COUNT = 80;

  // 四角パーティクル配列
  let squares = [];


  // ======================
  // クラス: 四角形が幻想的に舞う
  // ======================
  class Square {
    constructor(){
      // 誕生時にランダム位置・ランダム速度・サイズなどをセット
      this.reset();
    }

    reset(){
      // 画面内のランダム位置
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      // 速度は -0.6 ~ +0.6 程度のゆったり
      this.vx = (Math.random()-0.5) * 1.2; 
      this.vy = (Math.random()-0.5) * 1.2;

      // 四角のサイズ (5～15 px程度)
      this.size = 5 + Math.random()*10;

      // 透明度(0.3～0.8ぐらいで少し幻想的に)
      this.alpha = 0.3 + Math.random()*0.5;
    }

    update(){
      // 移動
      this.x += this.vx;
      this.y += this.vy;

      // もし画面外に出たらリセット(再配置)
      if(this.x < -50 || this.x > width+50 || this.y < -50 || this.y > height+50){
        this.reset();
      }
    }

    draw(ctx){
      // 幻想的な白 => α込み 
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

      // fillRectで四角描画
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }


  // ======================
  // リサイズ処理
  // ======================
  function onResize(){
    width = window.innerWidth;
    height= window.innerHeight;
    canvas.width = width;
    canvas.height= height;
  }


  // ======================
  // 初期化
  // ======================
  function initAll(){
    squares = [];
    for(let i=0; i < SQUARE_COUNT; i++){
      squares.push(new Square());
    }
  }


  // ======================
  // アニメーションループ
  // ======================
  function animate(){
    requestAnimationFrame(animate);
    // 背景クリア
    ctx.clearRect(0,0,width,height);

    // squares 更新と描画
    squares.forEach(sq => {
      sq.update();
      sq.draw(ctx);
    });
  }


  // ======================
  // 実行
  // ======================
  window.addEventListener('resize', onResize);
  onResize();
  initAll();
  animate();

  console.log("startArtStars => only drifting squares, no static stars, no top/right spawn.");
}

window.startArtStars = artStarsInit;
