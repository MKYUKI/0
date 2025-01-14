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

  let t0 = performance.now()
  function animate() {
    requestAnimationFrame(animate)
    let t = (performance.now() - t0)*0.001

    ctx.clearRect(0,0,canvas.width,canvas.height)

    // 幾何学エフェクト
    ctx.strokeStyle = 'rgba(102,255,204,0.7)'
    ctx.lineWidth = 1.2
    const cx = canvas.width/2
    const cy = canvas.height/2
    ctx.beginPath()
    for (let angle = 0; angle < Math.PI*8; angle += 0.03) {
      const r = 0.6 * angle * 50
      const x = cx + r*Math.cos(angle + t)
      const y = cy + r*Math.sin(angle + t)
      if (angle === 0) ctx.moveTo(x,y)
      else ctx.lineTo(x,y)
    }
    ctx.stroke()
  }
  animate()
})
