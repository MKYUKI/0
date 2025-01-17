/**
 * cosmicSimThree.js
 * 
 * 三次元的に大量の星や銀河アームを構築し、回転やズーム等で
 * 「宇宙史上最大の宇宙シミュレーション」を表現。
 * 
 * 使い方:
 *  1. <script src="/js/three.min.js"></script>
 *  2. <script src="/js/cosmicSimThree.js"></script>
 *  3. cosmicSimThree.init('myCanvasId')
 */
window.cosmicSimThree = (function() {
    let renderer, scene, camera;
    let starField, planetGroup;
    let width = 800, height = 600;
    let animationId;
  
    // パラメータ
    const STAR_COUNT = 8000;     // 星の数 (増やす)
    const GALAXY_RADIUS = 500;   // 銀河アーム全体の半径
    const PLANET_COUNT = 20;     // 惑星/銀河的オブジェクト数
    const ROTATION_SPEED = 0.0008; // 回転速度
    const ZOOM_SPEED = 0.0003;     // カメラズーム速度
  
    function init(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
  
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
  
      // レンダラー初期化
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      renderer.setSize(width, height);
  
      // シーン & カメラ
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
      camera.position.z = 1000;
      scene.add(camera);
  
      // 宇宙の星を作成
      createStarField();
  
      // 惑星/銀河的オブジェクトを追加
      createPlanets();
  
      // ライト(簡易的)
      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);
  
      animate();
      window.addEventListener('resize', onResize);
    }
  
    function onResize() {
      if (!renderer || !camera) return;
      const canvas = renderer.domElement;
      width = canvas.parentNode.offsetWidth;
      height = canvas.parentNode.offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  
    function createStarField() {
      // Geometryに点を大量に追加
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(STAR_COUNT * 3);
  
      for (let i = 0; i < STAR_COUNT; i++) {
        // 銀河アーム状にランダム分布:
        const angle = Math.random() * Math.PI * 2 * 4; // 銀河腕が4本ぐらい
        const radius = Math.pow(Math.random(), 2) * GALAXY_RADIUS; // 内側に星多め
        const x = Math.cos(angle) * radius * (1 + 0.3 * Math.random());
        const y = (Math.random() - 0.5) * 50; // 厚み
        const z = Math.sin(angle) * radius * (1 + 0.3 * Math.random());
  
        positions[3*i]   = x;
        positions[3*i+1] = y;
        positions[3*i+2] = z;
      }
  
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
      });
  
      starField = new THREE.Points(geometry, material);
      scene.add(starField);
    }
  
    function createPlanets() {
      planetGroup = new THREE.Group();
      for (let i = 0; i < PLANET_COUNT; i++) {
        const geo = new THREE.SphereGeometry(10 + Math.random() * 30, 16, 16);
        const mat = new THREE.MeshLambertMaterial({
          color: new THREE.Color(
            `hsl(${Math.random() * 360}, 70%, 50%)`
          )
        });
        const mesh = new THREE.Mesh(geo, mat);
  
        // ランダム位置
        const angle = Math.random() * Math.PI * 2 * 4;
        const radius = 300 + Math.random()*200;
        mesh.position.set(
          Math.cos(angle)*radius,
          (Math.random()-0.5)*100,
          Math.sin(angle)*radius
        );
        // ゆるい回転用にユーザーデータ
        mesh.userData = {
          rotSpeed: 0.001 + Math.random()*0.002,
        };
        planetGroup.add(mesh);
      }
      scene.add(planetGroup);
    }
  
    function animate() {
      animationId = requestAnimationFrame(animate);
  
      // ゆっくり回転 & カメラズーム
      if(starField) {
        starField.rotation.y += ROTATION_SPEED;
        starField.rotation.x += ROTATION_SPEED * 0.3;
      }
      if(planetGroup) {
        planetGroup.rotation.y -= ROTATION_SPEED*0.7;
        planetGroup.rotation.x += ROTATION_SPEED*0.2;
        planetGroup.children.forEach(p => {
          p.rotation.y += p.userData.rotSpeed;
          p.rotation.x += p.userData.rotSpeed * 0.5;
        });
      }
      camera.position.z += Math.sin(Date.now()*0.0002)*ZOOM_SPEED*100;
  
      renderer.render(scene, camera);
    }
  
    return {
      init,
    };
  })();
  