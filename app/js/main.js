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


//game words

const words = {
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'black', 'white'],
    animals: ['cat', 'dog', 'bird', 'lion', 'tiger', 'elephant', 'zebra'],
    jobs: ['engineer', 'doctor', 'teacher', 'nurse', 'chef', 'driver', 'singer'],
}

let wordKey;
let keyIndex;

function getRandomWord(arr) {
    const randomKey = Math.floor(Math.random() * Object.keys(arr).length);
    const randomKeyIndex = Math.floor(Math.random() * arr[Object.keys(arr)[randomKey]].length);

    wordKey = Object.keys(arr)[randomKey];
    keyIndex = arr[Object.keys(arr)[randomKey]][randomKeyIndex];
}



//game start
let startButton = document.querySelector('.main__start__button'),
    startScreen = document.querySelector('.main__start'),
    startTittle = document.querySelector('.main__start__title'),
    wordsBox = document.querySelector('.main__words'),
    wordsTittle = document.querySelector('.main__words__tittle'),
    wordsWord = document.querySelector('.main__words__word'),
    guyElements = document.querySelectorAll('.main__guy__item');
let wordArr;
let underscores;
let word;
let currentBodyPartIndex = 0;

function gameStart(screen) {
    screen.classList.add('main__start--hidden');
    animateRain();
    audioPlay(rainAudio, carAudio);
    carHeadlightActive();
    getRandomWord(words)

    wordsTittle.innerText = `${wordKey.toLowerCase()} :`;
    word = keyIndex.toLowerCase();
    underscores = '_'.repeat(word.length);
    wordArr = word.split('');
    wordsWord.innerText = underscores;
    guyElements.forEach(item => {
        item.classList.add('hide');
    })
    return wordArr;
}

document.addEventListener('keydown', (event) => {
    let pressedKey = event.key.toLowerCase();
    let founds = false;
    wordArr.forEach((letter, index) => {
        if (pressedKey === letter) {
            underscores = underscores.split('');
            underscores[index] = letter;
            underscores = underscores.join('');
            wordsWord.innerText = underscores;
            founds = true;
        }
    })
    if (!founds) {
        guyElements[currentBodyPartIndex].classList.remove('hide');
        currentBodyPartIndex = (currentBodyPartIndex + 1);
        console.log(currentBodyPartIndex);
    }

    if (wordsWord.innerText === word) {
        gameStart(startScreen);
        currentBodyPartIndex = 0;
    }

    if (currentBodyPartIndex === 6) {
        wordsBox.style.display = 'none';
        startTittle.innerText = 'YOU LOSE';
        startButton.innerText = 'Play Again';
        startScreen.classList.remove('main__start--hidden');
        currentBodyPartIndex = 0;
    }
})


startButton.addEventListener('click', () => {
    gameStart(startScreen);
    wordsBox.style.display = 'flex';
})
