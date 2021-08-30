/**
 * Motus: Rotating & Flipping  (Audio reactive)
 *
 * A remixed piece made audio reactive for Observant https://www.instagram.com/obsmus/
 * https://www.instagram.com/p/CS_u7WOBs7q/
 *
 * Original: https://owenmcateer.github.io/Motus-Art/projects/week_136.html
 *
 * https://owenmcateer.github.io/Motus-Art
 */
let music;
let fft;
let timer = 0;
const speed = 0.01;
const numOfTowers = 9;
const towerSize = 27;
let flip = 0;
const ampLevels = new Array(numOfTowers).fill(0);


// Preload
function preload() {
  soundFormats('mp3');
  music = loadSound('../assets/audio/Observant-Hattori_Hanzō-Phenotypic_Variation');
}


// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  smooth();
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);

  music.play();
  fft = new p5.FFT(0.8, 1024);
}


// Draw tick
function draw() {
  background(39);

  // Styling
  stroke(239);
  strokeWeight(3);
  fill(239, 0.02);

  timer = frameCount / 75;

  const spectrum = fft.analyze();
  ampLevels.pop();
  ampLevels.unshift(spectrum[8] / 255);

  // Camera offset
  translate(towerSize * 2.5 * numOfTowers * -0.445, 0, -100);

  // Draw towers
  for (let i = 0; i < numOfTowers; i++) {
    let r = flip;
    r -= ((numOfTowers - i) * (1 / numOfTowers));
    r -= PI / 4;
    r = constrain(r, 0, 1);
    r = easeInOutSine(1 - r, 0, 1, 1);

    const ampHeight = ampLevels[i] * 120 - 60;
    fill(239, ampLevels[i] * ampLevels[i] * ampLevels[i] / 4);

    push();
    translate(i * towerSize * 2.5, 0, 0);
    rotateX(r * PI);
    rotateY((r > 0.5) ? timer : -timer);
    box(towerSize, towerSize * 13 + ampHeight, towerSize);
    pop();
  }

  // Timer
  if (flip > 0) {
    flip -= speed;
  }

  // Trigger flip
  if ((frameCount - 180) % 420 === 0 && frameCount < 60 * 56) {
    flip = PI;
  }
}

// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
