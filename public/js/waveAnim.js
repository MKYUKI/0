// public/js/waveAnim.js
(function(){
  if(typeof window==='undefined')return

  window.addEventListener('load', ()=>{
    const canvas = document.getElementById('wave-canvas')
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let w,h
    let waveOffset=0

    function resize(){
      w=window.innerWidth
      h=window.innerHeight
      canvas.width=w
      canvas.height=h
    }
    window.addEventListener('resize', resize)
    resize()

    function animate(){
      requestAnimationFrame(animate)
      ctx.clearRect(0,0,w,h)
      ctx.beginPath()
      const amplitude=40, wavelength=0.02, speed=0.04
      for(let x=0; x<w; x++){
        const y=Math.sin(x*wavelength + waveOffset)*amplitude + h/2
        ctx.lineTo(x,y)
      }
      ctx.strokeStyle='rgba(0,0,0,0.15)'
      ctx.lineWidth=2
      ctx.stroke()

      waveOffset += speed
    }
    animate()
  })
})()
