exports.id = 632;
exports.ids = [632];
exports.modules = {

/***/ 4269:
/***/ (() => {

// public/js/starsAnim.js
(function() {
    if (true) return;
    const canvasId = "stars-canvas";
    function initStarsPro() {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h;
        const numStars = 200;
        let stars = [];
        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }
        function createStars() {
            stars = [];
            for(let i = 0; i < numStars; i++){
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 2 + 0.5,
                    alpha: Math.random() * 0.8 + 0.2,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3
                });
            }
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars){
                s.x += s.vx;
                s.y += s.vy;
                if (s.x < 0 || s.x > w || s.y < 0 || s.y > h) {
                    s.x = Math.random() * w;
                    s.y = Math.random() * h;
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0,0,0,${s.alpha})`;
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }
        window.addEventListener("resize", ()=>{
            resize();
            createStars();
        });
        resize();
        createStars();
        draw();
    }
    window.addEventListener("load", initStarsPro);
})();


/***/ })

};
;