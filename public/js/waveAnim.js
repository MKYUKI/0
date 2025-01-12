// public/js/waveAnim.js
;(function(){
  if (typeof window === 'undefined') return

  const canvasId = 'wave-canvas'

  function initWave() {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w, h
    let waveOffset = 0

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    function drawWave() {
      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()

      const amplitude = 40
      const wavelength = 0.01
      const speed = 0.02

      for (let x = 0; x < w; x++) {
        const y = Math.sin(x * wavelength + waveOffset) * amplitude + h / 2
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.15)'
      ctx.lineWidth = 2
      ctx.stroke()

      waveOffset += speed
      requestAnimationFrame(drawWave)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('load', () => {
      resize()
      drawWave()
    })
  }

  window.addEventListener('load', initWave)
})()
