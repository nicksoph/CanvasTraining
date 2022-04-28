/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const P2 = Math.PI * 2;
const particleArray = [];
const mouse = {
    x: undefined,
    y: undefined
    }
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
})
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 2; i++) {
        particleArray.push(new Particle());
    }
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.04
    }
    draw() {
        ctx.fillStyle = this.color
        //arc requires beginPath as it can be both a line and a shape and lines require beginPath
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, P2); // x,y,radius,startAngle (0 to the right), endangle,[reverse rotation]
        ctx.fill()
        
    }
}

function handleParticles() {
    for (i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x
            const dy = particleArray[i].y - particleArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                let gradient = ctx.createLinearGradient(particleArray[i].x, particleArray[i].y, particleArray[j].x, particleArray[j].y);
                gradient.addColorStop(0, particleArray[i].color);
                gradient.addColorStop(.5, 'white');
                gradient.addColorStop(1, particleArray[j].color);
                ctx.beginPath();
                //ctx.strokeStyle = particleArray[i].color;
                ctx.strokeStyle = gradient
                ctx.lineWidth = particleArray[i].size/7
                ctx.moveTo(particleArray[i].x, particleArray[i].y)
                ctx.lineTo(particleArray[j].x, particleArray[j].y)
                ctx.stroke()
            }
        }
        if (particleArray[i].size <= .3) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(0,0,0,0.1)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue++
    requestAnimationFrame(animate);
}
animate();
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
    
    // function init() {
        //     for (let i = 0; i < 1000; i++) {
            //         particleArray.push(new Particle());
            
            //     }
            // }
            // init()
            
            // function filterBySize(array) {
                //     return array.filter(p => p.size > 0.3);    
                // }
                // const temp=[{size:3  },{size:2  },{size:0.2  },{size:0.3  },{size:0.1  },{size:1  }]
                // temp2= filterByValue(temp)
                // console.log(temp2)
                // function filterByValue(array) {
                    //     return array.filter(p => p.size > 0.3);    
                    // }
                    //particleArray.filter 