// public/js/waveAnim.js
(() => {
  const canvas = document.getElementById('waveCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let startTime = performance.now()

  function animate() {
    requestAnimationFrame(animate)
    const dt = performance.now() - startTime
    const waveOffset = 20 * Math.sin(dt * 0.001)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(100, 200, 255, 0.25)'

    ctx.beginPath()
    ctx.rect(0, canvas.height / 2 + waveOffset, canvas.width, 80)
    ctx.fill()
  }
  animate()

  window.addEventListener('resize', () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  })
})()
