// public/js/quantum3D.js
import * as THREE from 'three';

function initQuantum3D() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;

  // 黒い線で幾何学的ラインを大量に敷き詰める
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 1500; i++) {
    positions.push(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000, // 黒
    transparent: true,
    opacity: 0.4,
  });
  const line = new THREE.LineSegments(geometry, lineMaterial);
  scene.add(line);

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize, false);
  resize();

  function animate() {
    requestAnimationFrame(animate);
    line.rotation.x += 0.0004;
    line.rotation.y += 0.0007;
    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('load', initQuantum3D);
