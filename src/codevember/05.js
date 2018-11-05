/**
 * Motus: #codevember 05 Music Wave
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
let bg;
let sound;
let fft;

// Preload
function preload() {
  sound = loadSound('../../assets/misc/guitar.mp3');
}

// Setup
function setup() {
  sound.pause();
  frameRate(30);
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg1 = [8, 116, 98];
  colours.bg2 = [8, 80, 116];
  colours.line = [255,255,255,0.2];

  // FFT
  fft = new p5.FFT();
  sound.amp(5);
  sound.loop();

  // Gen BG
  bg = radialGradient(canvas, canvas, canvas * 3, canvas * 3, colours.bg1, colours.bg2);
}

// Draw tick
function draw() {
  background(0);
  image(bg, 0, 0);

  // Get waveform
  const waveform = fft.waveform(1024);
  noFill();
  beginShape();
  stroke(...colours.line);
  strokeWeight(20);
  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length, 0, width);
    const y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}

// Gradient function
function radialGradient(x, y, w, h, inner, outer) {
  const img = createGraphics(w * 2, h * 2);
  img.ellipseMode(CENTER);
  img.noStroke();
  for (let i = Math.max(w, h); i > 0; i--) {
    const step = i / Math.max(w, h);
    const colour = lerpColor(color(...inner), color(...outer), step);
    img.fill(colour);
    img.ellipse(x, y, step * w, step * h);
  }
  return img;
}
