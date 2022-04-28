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
let t = 0
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class sinWave {
    constructor(freq, ampl, phase, damp, x, y) {
        this.freq = freq
        this.ampl = ampl
        this.phase = phase
        this.damp = damp
        this.x = x
        this.y = y
        // this.x = Math.random() < 0.5
        // this.y = Math.random() < 0.5
    }
}
const wavesArray = []
//    freq, ampl, phase, damp
const data = [
    [60.9, 450, 0, .01, true, false],
    [60.9, 450, 0, 0.1, false, true],
    [10, 200, .1, .501, false, false],
    [30.1, 560, .3, .5010, false, false]
]

function fill() {
    for (let i = 0; i < data.length; i++) {
        let w = new sinWave(...data[i])
        wavesArray.push(w)
    }
}

class Particle {
    constructor() {
        this.x = 0
        this.y = 0
        this.size = 5
        this.color = 'red';
    }
    update(t) {
        let xs = wavesArray.filter(w => w.x == true);
        console.log(xs)
        
        let ys = wavesArray.filter(w => w.y == true);
        // console.log(ys)
        this.x = 0
        this.y = 0
        console.log(Math.sin(t + xs[0].phase))
        for (let i = 0; i < xs.length; i++) {
            this.x = this.x + (Math.sin(t + xs[i].phase)) * Math.exp(-xs[i].damp) * Math.cos(xs[i].freq) * xs[i].ampl
            console.log(this.x)
        }
        for (let i = 0; i < ys.length; i++) {
            this.y = this.y + (Math.sin(t + ys[i].phase)) * Math.exp(-ys[i].damp) * Math.cos(ys[i].freq) * ys[i].ampl
        }
        
    }
    
    draw() {
        ctx.fillStyle = 'white'
        // console.log(this.x, this.y,t)
        //arc requires beginPath as it can be both a line and a shape and lines require beginPath
        ctx.beginPath();
        ctx.arc(this.x + 300, this.y + 400, this.size / 2, 0, P2); // x,y,radius,startAngle (0 to the right), endangle,[reverse rotation]
        ctx.fill()
        
        
    }
}
//console.log(particleArray)
function removeAddParticle() {
    particleArray.splice(0, 1)
    p = new Particle
    particleArray.push(p)
}

function make() {
    for (let i = 0; i < 10000; i++) {
        let p = new Particle()
        particleArray.push(p)
    }
}

function animate() {
    for (let i = 0; i < 10000; i++) {
        t = t + 10

        particleArray[i].update(t)
        particleArray[i].draw(t)

    }
}

function lines() {
    let x1 = particleArray[0].x
    let y1 = particleArray[0].y
    for (let i = 1; i < particleArray.length; i++) {
        hue = hue + .035
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(particleArray[i].x, particleArray[i].y)

        ctx.lineWidth = particleArray[i].size / 3 //particleArray[i].size
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
        
        ctx.stroke()
        x1 = particleArray[i].x
        y1 = particleArray[i].y
    }

}
fill()
make()
animate()
lines()

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
                // particleArray.filter;