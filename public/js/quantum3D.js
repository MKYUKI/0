// public/js/quantum3D.js
// ES moduleではないため、"import" は使わず、THREEを別途読み込むかバンドル。
// ここでは Next.js Script で読み込めばOK (threeは依存インストール必要)
;(function(){
  // この関数内は即時関数でスコープを隠す
  if (typeof window === 'undefined') return

  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return

  // THREEをグローバル参照するか、window.THREE などにしても可
  // 下記は仮に three.jsをCDNなどで読み込む想定
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 30

  const geometry = new THREE.BufferGeometry()
  const positions = []
  for (let i = 0; i < 1000; i++) {
    positions.push(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    )
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 })
  const lineMesh = new THREE.LineSegments(geometry, lineMaterial)
  scene.add(lineMesh)

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)
  onResize()

  function animate() {
    requestAnimationFrame(animate)
    lineMesh.rotation.x += 0.0004
    lineMesh.rotation.y += 0.0007
    renderer.render(scene, camera)
  }
  animate()
})()
