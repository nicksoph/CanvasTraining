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

class sinWave {
    constructor(freq, ampl, phase, damp) {
        this.freq = freq
        this.ampl = ampl
        this.phase = phase
        this.damp = damp
    }
}
const wavesArray = []
const data = [
    [60, 100, 0, 0],
    [59.9, 100, 0, 0],
    [120, 100, 0, 0],
    [30, 100, 0, 0]
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
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(t) {
        this.x = Math.sin * ((sinWave[0].phase + t) / sinWave[0].freq) * sinWave[0].ampl +
        Math.sin * ((sinWave[2].phase + t) / sinWave[2].freq) * sinWave[2].ampl
        
        this.y = Math.sin * ((sinWave[1].phase + t) / sinWave[1].freq) * sinWave[1].ampl +
        Math.sin * ((sinWave[3].phase + t) / sinWave[3].freq) * sinWave[3].ampl
    }
    
    draw() {
        ctx.fillStyle = 'white'
        //arc requires beginPath as it can be both a line and a shape and lines require beginPath
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, P2); // x,y,radius,startAngle (0 to the right), endangle,[reverse rotation]
        ctx.fill()

    }
}

function removeAddParticle() {
    particleArray.splice(0, 1)
    p = new Particle
    particleArray.push(p)
}


fill()