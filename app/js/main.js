//rain
let canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
    return Math.floor(Math.random() * max) + min;
}

function RainDrops(x, y, endy, velocity, opacity) {

    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
        c.stroke();
    }

    this.update = function () {
        let rainEnd = window.innerHeight + 100;
        if (this.y >= rainEnd) {
            this.y = this.endy - 100;
        } else {
            this.y = this.y + this.velocity;
        }
        this.draw();
    }

}

let rainArray = [];

for (let i = 0; i < 1540; i++) {
    let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
    let rainYLocation = Math.random() * -500;
    let randomRainHeight = randomNum(30, 5);
    let randomSpeed = randomNum(20, 5);
    let randomOpacity = Math.random() * .55;
    rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
}

function animateRain() {

    requestAnimationFrame(animateRain);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < rainArray.length; i++) {
        rainArray[i].update();
    }

}




//audio
function audioPlay(...audio) {
    for (let i = 0; i < audio.length; i++) {
        audio[i].play();
    }
}

const rainAudio = new Audio();
rainAudio.src = '../audio/rain.mp3';
rainAudio.loop = true;
rainAudio.volume = 0.6;


const carAudio = new Audio();
carAudio.src = '../audio/car.mp3';
carAudio.loop = true;
carAudio.volume = 1.0;



//headlights
const carHeadlights = document.querySelectorAll('.main__car__headlight');

function carHeadlightActive() {
    setInterval(() => {
        carHeadlights.forEach(item => {
            item.classList.toggle('main__car__headlight--active');
        })
    }, 3000)
}



//game start
const startButton = document.querySelector('.main__start__button'),
    startScreen = document.querySelector('.main__start');

startButton.addEventListener('click', () => {
    startScreen.classList.add('main__start--hidden');
    animateRain();
    audioPlay(rainAudio, carAudio);
    carHeadlightActive();
})
