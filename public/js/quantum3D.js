// public/js/quantum3D.js
(function(){
  if(typeof window==='undefined') return;

  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js";
  document.head.appendChild(script);

  script.onload = () => {
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth/window.innerHeight, 0.1, 1000
    );
    camera.position.z = 50;

    // 黒パーティクル
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for(let i=0;i<3000;i++){
      positions.push((Math.random()-0.5)*400, (Math.random()-0.5)*400, (Math.random()-0.5)*400);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    const material = new THREE.PointsMaterial({
      color:0x000000,
      size:2.0,
      opacity:0.4,
      transparent:true
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
      angle+=0.0007;
      points.rotation.y += 0.001;
      points.rotation.x = Math.sin(angle)*0.15;
      renderer.render(scene, camera);
    }
    animate();
  };
})();
