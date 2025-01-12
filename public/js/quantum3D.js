// public/js/quantum3D.js
// 参考: three.js docs https://threejs.org/docs/

import * as THREE from 'three';

function initQuantum3D() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;

  // 幾何学的なラインが揺れるようにする
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000, // 黒いライン
    transparent: true,
    opacity: 0.5,
  });

  // ランダムに頂点を配置
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 500; i++) {
    positions.push(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const line = new THREE.LineLoop(geometry, lineMaterial);
  scene.add(line);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    // ラインを回転させて揺らめくように見せる
    line.rotation.x += 0.0005;
    line.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onWindowResize, false);
  onWindowResize();
  animate();
}

window.addEventListener('load', initQuantum3D);
