exports.id = 343;
exports.ids = [343];
exports.modules = {

/***/ 7980:
/***/ (() => {

// public/js/waveAnim.js
(function() {
    if (true) return;
    const canvasId = "wave-canvas";
    function initWavePro() {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h;
        let waveOffset = 0;
        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }
        function drawWave() {
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            const amplitude = 50; //高く
            const wavelength = 0.015; //波の密度
            const speed = 0.03; //進行速度
            for(let x = 0; x < w; x++){
                const y = Math.sin(x * wavelength + waveOffset) * amplitude + h / 2;
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "rgba(0,0,0,0.2)"; //黒め
            ctx.lineWidth = 3;
            ctx.stroke();
            waveOffset += speed;
            requestAnimationFrame(drawWave);
        }
        window.addEventListener("resize", resize);
        window.addEventListener("load", ()=>{
            resize();
            drawWave();
        });
    }
    window.addEventListener("load", initWavePro);
})();


/***/ })

};
;