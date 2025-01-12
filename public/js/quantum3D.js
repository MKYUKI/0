// quantum3D.js (new ver.)
// さらに先端的に：シェーダーを使ってラインを揺らめく

import * as THREE from 'three';

let renderer, scene, camera, line, clock;

function initQuantum3D() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  clock = new THREE.Clock();

  // Geometry: random lines
  const positions = [];
  for (let i = 0; i < 1000; i++) {
    positions.push(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.4
  });

  line = new THREE.LineLoop(geometry, material);
  scene.add(line);

  window.addEventListener('resize', onResize);
  onResize();
  animate();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // Rotate lines
  line.rotation.x += 0.02 * delta;
  line.rotation.y += 0.05 * delta;

  renderer.render(scene, camera);
}

window.addEventListener('load', initQuantum3D);
