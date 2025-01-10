// public/js/quantum3D.js
// Minimal Three.js 3D scene to show a spinning black TorusKnot.

// For references to advanced Transformer-based 3D AI avatars, see e.g.:
// - https://arxiv.org/abs/1706.03762
// - https://github.com/CompVis/latent-diffusion
// - https://github.com/facebookresearch/AnimatedDraw
(() => {
    const container = document.getElementById('quantum3DContainer');
    if (!container) return; // no container, skip
  
    // 1) Set up three.js
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
  
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 60);
    scene.add(camera);
  
    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);
  
    // 2) Object geometry
    const geometry = new THREE.TorusKnotGeometry(10, 3, 140, 24);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x222222,
      shininess: 100,
      wireframe: false,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);
  
    // 3) Animate
    let startTime = performance.now();
  
    function animate() {
      requestAnimationFrame(animate);
      let dt = performance.now() - startTime;
      let t = dt * 0.0004; // spin speed
  
      // Spin with some "quantum" style
      knot.rotation.x = t * 0.6;
      knot.rotation.y = t * 0.45;
      knot.rotation.z = t * 0.1;
  
      renderer.render(scene, camera);
    }
    animate();
  
    // 4) Handle window resizing
    window.addEventListener('resize', () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    });
  })();
  