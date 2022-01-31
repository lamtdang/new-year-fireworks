const fireworks = [];
let gravity;
let font
let song

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('Pesta Tahun Baru 400.ttf');
  song = loadSound('Abba_-_Happy_New_Year.mp3');
  song.play()
  song.pause()
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);  //Add gravity to fall down
  // textFont(font);
  textSize(100);
  textAlign(CENTER, CENTER);

  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(22, 27, 54);
  strokeWeight(3);
  var countDownDate = new Date("Feb 1, 2022 00:00:00").getTime()
  var now = new Date().getTime()
  var distance = countDownDate - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (distance > 0) {
    countDown(hours, minutes, seconds)
  } else {
    if (!song.isPlaying()) {
      song.play()
    }
    drawWords()

  if (random(1) < 0.02) {                   //randomly adds new fireworks
    fireworks.push(new Firework());  
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {   // Remove the exploded fireworks
      fireworks.splice(i, 1);
    }
  }
  }
}


function drawWords() {
  strokeWeight(2)
  stroke(255, 205, 60);
  fill(255, 205, 60); 
  text('Happy Lunar New Year 2022', width * 0.5, 80);
}

function countDown(hours, minutes, seconds) {
  strokeWeight(2)
  stroke(255, 205, 60);
  fill(255, 205, 60); 
  text(`${hours}:${minutes}:${seconds}`, width * 0.5, height * 0.5);
}