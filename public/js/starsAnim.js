// public/js/starsAnim.js
(function() {
  const canvasId = 'stars-canvas'

  function initStars() {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w, h
    const numStars = 120
    let stars = []

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    function createStars() {
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(0,0,0,${star.alpha})` // 黒い星
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }

    window.addEventListener('resize', () => {
      resize()
      createStars()
    })

    resize()
    createStars()
    draw()
  }

  window.addEventListener('load', initStars)
})()
