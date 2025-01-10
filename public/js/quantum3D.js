// public/js/quantum3D.js
// Minimal 3D scene with a black TorusKnot rotation.

(function(){
    const container = document.getElementById('quantum3DContainer');
    if(!container) return;
  
    // 1) Three.js setup
    const renderer = new THREE.WebGLRenderer({antialias:true});
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
    camera.position.set(0,0,60);
    scene.add(camera);
  
    // Light
    const ambient = new THREE.AmbientLight(0xffffff,1);
    scene.add(ambient);
  
    // 2) Object geometry
    const geometry = new THREE.TorusKnotGeometry(10,3,140,24);
    const material = new THREE.MeshPhongMaterial({
      color:0x000000,
      emissive:0x222222,
      shininess:100,
      wireframe:false
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);
  
    let startTime = performance.now();
    function animate(){
      requestAnimationFrame(animate);
      const dt = performance.now() - startTime;
      const t = dt*0.0004;
  
      knot.rotation.x = t*0.6;
      knot.rotation.y = t*0.45;
      knot.rotation.z = t*0.1;
  
      renderer.render(scene, camera);
    }
    animate();
  
    // 3) Resize
    window.addEventListener('resize', ()=>{
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    });
  })();
  