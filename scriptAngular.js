/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const P2 = Math.PI * 2;
const wavesArray = []
const particleArray = [];
let xs = [];
let ys = []
const mouse = {
    x: undefined,
    y: undefined
}
const XYarray = []
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ccx = canvas.width / 2
ccy = canvas.height / 2
// user inputs
const scale = .055
const num = 1000
//  freq, ampl, phase, damp, x.used, y.used, tick size
const data = [
    [60.01, 200, 0, 0.0002, true, false, .01013],
    [60.01, 2000, 0, 0.0002, false, true, 0.01013],
    [10, 2000, 1.3333333, 0.0002, true, false, 0.01013],
    [50.001, 2000, 0, .0003, false, true, 0.01013],
    [60, 200, 0, .00021, false, true, 0.01013],
    [40.01, 4000, 0.1, 0.0002, true, false, 0.0013],
    // [1.5, 100, 0, .0001, true, false, 0.0013],
    // [1.01, 200, 0, .0003, false, true, 0.0013],
    // [1, 300, 0, .00021, true, false, 0.0013]
]

//  SinWave generator that take tick number as input and gives out x,y 
//  objcts are accessed via  wavesArray[]
class sinWave {
    constructor(freq, ampl, phase, damp, x, y, ticksize) {
        this.freq = freq
        this.ampl = ampl
        this.phase = phase
        this.damp = damp
        this.x = x
        this.y = y
        this.ticksize = ticksize
    }
    calcX(tick) {
        let time = tick * this.ticksize
        return this.ampl * Math.exp(-this.damp * time) * Math.sin(this.freq * time - this.phase)
    }
    calcY(tick) {
        let time = tick * this.ticksize
        return this.ampl * Math.exp(-this.damp * time) * Math.cos(this.freq * time - this.phase)
    }
}
// Particle generator that needs x and to be calculated externally from active waves
class Particle {
    constructor(tick) {
        this.tick = tick
        this.size = 100
        this.color = 'red'
        this.x = 0
        this.y = 0

    }
}

class Spiro {
    constructor(radius, phase, speed, time) {
        this.x = cos(angle * speed * time) * radius
        this.x = cos(angle * speed * time) * radius
    }
}

function circles() {

    for (let i = 0; i < particleArray.length; i++) {
        const x = particleArray[i].x * scale + ccx
        const y = particleArray[i].y * scale + ccy
        ctx.beginPath();
        ctx.arc(x, y, particleArray[i].width * 10 * scale, 0, P2); // x,y,radius,startAngle (0 to the right), endangle,[reverse rotation]
        ctx.strokeStyle = particleArray[i].color
        ctx.stroke()

    }
}

function spiro(radius, phase, speed) {
    let tick = 0
    for (let i = 0; i < spiroData.length; i++) {
        let s = new Spiro(...data[i], t)
        spiroArray.push(s)
        tick = tick + 1
    }

    cos(angle * speed * time) * radius
}

let drawArray = []
drawd = {}


// drawd.x = spiroArray.reduce((tot, a) => tot.x + a)
// a = 0 
// drawd.y = spiroArray.reduce((tot, a) => tot.y + a),0



function pcolour(start, step) {
    hue = start
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].color = 'hsl(' + hue + ', 50%, 50%)'
        hue = hue + step
    }
}

// creates wave generators from table
function fillSinWaves() {
    for (let i = 0; i < data.length; i++) {
        let w = new sinWave(...data[i])
        wavesArray.push(w)
    }
}
// sets active wave generators
function updateWaves() {
    xs = wavesArray.filter(w => w.x == true);
    ys = wavesArray.filter(w => w.y == true);
}

function makeParticles() {
    updateWaves()
    for (let j = 0; j < num; j++) {
        let p = new Particle(j)
        for (let i = 0; i < xs.length; i++) {
            p.x = p.x + xs[i].calcX(j)
        }
        for (let i = 0; i < ys.length; i++) {
            p.y = p.y + ys[i].calcY(j)
        }
        particleArray.push(p)
    }
}

function thickness(min, max, len) {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].width = Math.abs(Math.sin(i / len)) * (max - min) + min

    }
}

function colour(start, step) {
    hue = start
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].color = 'hsl(' + hue + ', 50%, 50%)'
        hue = hue + step
    }
}


function xy(arr) {
    // let point = {};
    arr.forEach(p => {
        let point = {}
        point.x = p.x
        point.y = p.y
        XYarray.push(point)
    })
}

function lines() {
    let x0 = particleArray[0].x * scale + ccx
    let y0 = particleArray[0].y * scale + ccy
    hue = 00
    for (let i = 1; i < particleArray.length; i++) {
        let x1 = particleArray[i].x * scale + ccx
        let y1 = particleArray[i].y * scale + ccy
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1)
        ctx.lineWidth = particleArray[i].width
        ctx.strokeStyle = particleArray[i].color
        ctx.stroke()
        x0 = x1
        y0 = y1
    }
}

fillSinWaves()
updateWaves()
makeParticles()
thickness(3, 40, 200000)
colour(100, 0.025)
//lines()
circles()

xy(particleArray)
console.log(XYarray)

function gradient(a, b) {
    return (b.y - a.y) / (b.x - a.x);
}

function bzCurve(points, f, t) {
    if (typeof (f) == 'undefined') f = 0.3;
    if (typeof (t) == 'undefined') t = 0.6;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    var m = 0;
    var dx1 = 0;
    var dy1 = 0;

    var preP = points[0];

    for (var i = 1; i < points.length; i++) {
        var curP = points[i];
        nexP = points[i + 1];
        if (nexP) {
            m = gradient(preP, nexP);
            dx2 = (nexP.x - curP.x) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }

        ctx.bezierCurveTo(
            preP.x * scale - dx1 * scale + ccx, preP.y * scale - dy1 * scale + ccy,
            curP.x * scale + dx2 * scale + ccx, curP.y * scale + dy2 * scale + ccy,
            curP.x * scale + ccx, curP.y * scale + ccy
        );

        dx1 = dx2;
        dy1 = dy2;
        preP = curP;
    }
    ctx.stroke();
}
// Generate random data 
var lines = [];
var X = 10;
var t = 40; // control the width of X.
for (var i = 0; i < 100; i++) {
    Y = Math.floor((Math.random() * 300) + 50);
    p = {
        x: X,
        y: Y
    };
    lines.push(p);
    X = X + t;
}

// Draw smooth line 
ctx.setLineDash([0]);
ctx.lineWidth = 1;
ctx.strokeStyle = "green";

bzCurve(XYarray, 0.3, 1);







// draw()
// animate()
// circles()
// //function circles() {
//     let x0 = particleArray[0].x * scale + ccx
//     let y0 = particleArray[0].y * scale + ccy
//     for (let i = 1; i < particleArray.length; i++) {
//         let x1 = particleArray[i].x * scale + ccx
//         let y1 = particleArray[i].y * scale + ccy
//         hue = hue + 2
//         ctx.beginPath();
//         ctx.moveTo(x0, y0)
//         ctx.arc(x1, y1, particleArray[i].size / 2, 0, P2); // x,y,radius,startAngle (0 to the right), endangle,[reverse rotation]
//         ctx.strokeStyle = 'white';
//         ctx.stroke()
//         x0 = x1
//         y0 = y1
//     }
// }

// function animate() {
//     for (let i = 0; i < num; i++) {
//         t = t + num
//         // particleArray[i].update(t)
//         // particleArray[i].draw(t)

//     }
// }



function removeAddParticle() {
    particleArray.splice(0, 1)
    p = new Particle
    particleArray.push(p)
}

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
//  let xy ={}
//  xy.x = this.ampl * Math.exp(-this.damp * tick*this.ticksize) * Math.sin(this.freq * tick*this.ticksize - this.phase)
//  xy.y = this.ampl * Math.exp(-this.damp * tick*this.ticksize) * Math.cos(this.freq * tick*this.ticksize - this.phase)
//return xy
//return this.ampl * Math.exp(-this.damp * t) * Math.cos(this.freq * t - this.phase)