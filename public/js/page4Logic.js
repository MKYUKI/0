// public/js/page4Logic.js
window.addEventListener('load', () => {
  const canvas = document.getElementById('page4-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
  resize()
  window.addEventListener('resize', resize)

  let tStart = performance.now()

  function animate() {
    requestAnimationFrame(animate)
    const t = (performance.now() - tStart) * 0.001

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 量子スパイラルの描画例
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    ctx.strokeStyle = 'rgba(0,0,0,0.7)'
    ctx.lineWidth = 1.5

    ctx.beginPath()
    for (let angle = 0; angle < Math.PI * 6; angle += 0.05) {
      const r = angle * 5
      const x = cx + r * Math.cos(angle + t)
      const y = cy + r * Math.sin(angle + t)
      if (angle === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  animate()
})
