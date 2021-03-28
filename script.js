function bootstrap() {
    const cnv = document.querySelector(`canvas`);
    const ctx = cnv.getContext(`2d`);

    let centerX = 0;
    let centerY = 0;
    let startAngle = 0;


    const maxWavesAmplitude = 23;
    const numberOfWaves = 3;

    const numberOfRings = 12;
    const ringRadiusOffset = 30;
    const ringRadius = 60;
    const waveOffset = 19;
    const velocity = 0.5;

    function init() {
        cnv.width = innerWidth;
        cnv.height = innerHeight;

        centerX = cnv.width / 2;
        centerY = cnv.height / 2;
    }

    function updateRings() {
        for (let i = 1; i <= numberOfRings; i++) {
            let radius = i * ringRadiusOffset + ringRadius;
            let offsetAngle = i * waveOffset * Math.PI / 180;
            let alpha = i / numberOfRings;

            drawRing(radius, alpha, offsetAngle);
        }

        startAngle >= 360 ? startAngle = 0 : startAngle += velocity;
    }

    function drawRing(radius, alpha, offsetAngle) {
        ctx.strokeStyle = `rgb(0, ${alpha * 128}, ${alpha * 128})`;
        ctx.lineWidth = 9;

        ctx.beginPath();

        for (let j = -180; j < 180; j++) {
            let currentAngle = (j + startAngle) * Math.PI / 180;
            let displacement = 0;
            let now = Math.abs(j);

            if (now > 30) {
                displacement = (now - 30) / 120;
            }

            if (displacement >= 1) {
                displacement = 1;
            }

            let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
            let x = centerX + Math.cos(currentAngle) * waveAmplitude;
            let y = centerY + Math.sin(currentAngle) * waveAmplitude;
            
            j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);

        }
        
        ctx.closePath();
        ctx.stroke();
    }

    function loop() {
        cnv.width |= 0;

        updateRings();
        requestAnimationFrame(loop);
    }


    init();
    loop();
    window.addEventListener(`resize`, init);
}

window.addEventListener('DOMContentLoaded', bootstrap)
