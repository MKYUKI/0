// public/js/cosmicSim.js

console.log('cosmicSim.js file parsed.');

// ★ Next.jsのDOMContentLoaded問題を回避するため、
//   DOM読み込みではなく window.startCosmicSim() で起動する仕組みに変更
function cosmicInit() {
  console.log('cosmicInit() called!');

  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) {
    console.error('No #cosmic-canvas in DOM!');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get 2D context from cosmic-canvas');
    return;
  }

  // サイズを親要素に合わせる(例: hero-section の大きさ)
  function resizeCanvas() {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    console.log('cosmic-canvas resized to', canvas.width, 'x', canvas.height);
  }
  resizeCanvas();

  // 大規模な宇宙演算
  // 例: 星を大量にランダムに描画
  const STAR_COUNT = 1000;
  let t = 0;

  function animate() {
    requestAnimationFrame(animate);

    // 背景を黒で塗りつぶし
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 星を描画
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = ((Math.random() * canvas.height) + t) % canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

    t += 1; // 星の流れを作る
  }

  animate();

  // リサイズ対応
  window.addEventListener('resize', resizeCanvas);

  console.log('cosmicInit() completed. Animation started!');
}

// ★ グローバルに公開して _app.tsx の onLoad で呼べるようにする
window.startCosmicSim = cosmicInit;
