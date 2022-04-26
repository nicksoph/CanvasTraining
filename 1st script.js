/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
P2 = Math.PI * 2;
const particleArray = [];
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

// function drawCircle() {
//     //set properties before stroking and filling
//     ctx.strokeStyle = 'green';
//     ctx.fillStyle = 'blue';
//     ctx.lineWidth = 10
//     //arc require beginPath as it can be both a line and a shape and lines require beginPath
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, P2); // <-- add the arc to the path
//     ctx.fill()
//     ctx.stroke()
// }

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = 'blue';
        //arc require beginPath as it can be both a line and a shape and lines require beginPath
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, P2); // <-- add the arc to the path
        ctx.fill()

    }
}

function init(){
    for (let i=0; i<10000;i++){
        particleArray.push(new Particle());

    }
}
init()

function handleParticles(){
    for (i = 0; i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    requestAnimationFrame(animate);
}
animate();