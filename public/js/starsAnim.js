// public/js/starsAnim.js
(() => {
  const canvas = document.getElementById('starsCanvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')

  const starCount = 100
  const stars = []
  for (let i = 0; i < starCount; i++) {
    stars.push({ x: Math.random(), y: Math.random() })
  }

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    stars.forEach(star => {
      ctx.beginPath()
      ctx.arc(star.x * canvas.width, star.y * canvas.height, 2, 0, 2 * Math.PI)
      ctx.fill()
    })
  }
  animate()

  window.addEventListener('resize', () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  })
})()
