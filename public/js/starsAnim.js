/**
 * public/js/starsAnim.js
 * 
 * もとの星アニメを廃止し、白背景＋黒線・点が量子的に生まれては消える
 * "歴史的大作"を演出。あえて"短い線分"が上から落ちてくるイメージ。
 */
(function() {
  let canvas, ctx;
  let width, height;
  const LINE_COUNT = 100;
  let lines = [];

  function init() {
    canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    onResize();
    createLines();
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    // 再作成
    createLines();
  }

  function createLines() {
    lines = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      lines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 20 + Math.random() * 80,
        speed: 1 + Math.random() * 3
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    // 背景：完全な透明にして、下の cosmicSim.js の白背景を透かす or
    // ここで白を塗って上書きするなら "ctx.fillStyle = '#fff'; ctx.fillRect(...);"
    // ここでは透過にして下層とブレンド
    // (もし白で塗りたいなら下コメント解除)
    // ctx.fillStyle = '#fff';
    // ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 2;

    for (let ln of lines) {
      ln.y += ln.speed; // 下に落ちる
      if (ln.y - ln.length > height) {
        // 画面下に消えたら上から再生成
        ln.x = Math.random() * width;
        ln.y = -10;
        ln.length = 20 + Math.random() * 80;
        ln.speed = 1 + Math.random() * 3;
      }

      // 描画
      ctx.beginPath();
      ctx.moveTo(ln.x, ln.y);
      ctx.lineTo(ln.x, ln.y - ln.length);
      ctx.stroke();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
