// public/js/quantum3D.js
// Updated: 3D scene with advanced rotating shape
(() => {
    const container = document.getElementById('quantum3DContainer');
    if (!container) return;
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
  
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 70);
    scene.add(camera);
  
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
  
    // new geometry
    const geometry = new THREE.TorusKnotGeometry(10, 2.5, 200, 18, 3, 7);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x111111,
      shininess: 200,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  
    let start = performance.now();
    function animate() {
      requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001;
      mesh.rotation.x = t * 0.4;
      mesh.rotation.y = t * 0.6;
      mesh.rotation.z = t * 0.2;
      renderer.render(scene, camera);
    }
    animate();
  
    window.addEventListener('resize', () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    });
  })();
  