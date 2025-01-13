// public/js/quantum3D.js
// three.js 必須 (CDN or npm で導入)
import * as THREE from 'three';

(function(){
  if (typeof window === 'undefined') return;

  function initQuantum3D(){
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 50);

    // 幾何学パーティクル
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for(let i=0;i<2000;i++){
      positions.push(
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));

    const material = new THREE.PointsMaterial({
      color: 0x000000,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function onResize(){
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);
    onResize();

    let angle=0;
    function animate(){
      requestAnimationFrame(animate);
      angle += 0.0005;
      points.rotation.y += 0.0008;
      points.rotation.x = Math.sin(angle)*0.3;
      renderer.render(scene, camera);
    }
    animate();
  }

  window.addEventListener('load', initQuantum3D);
})();
