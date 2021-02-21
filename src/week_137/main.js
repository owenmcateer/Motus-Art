/**
 * Motus: Polygonal Chain
 */
let timer = 0;
const speed = 0.001;
let icosphere;

// Preload
function preload() {
  icosphere = loadModel('../src/week_137/icosphere.obj');
}

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  pixelDensity(2);
}

// Draw tick
function draw() {
  // Styles
  background(39);
  noFill();
  stroke(239);
  strokeWeight(20);

  // Place and rotate icosphere
  push();
  scale(1200 + sin(timer * TWO_PI) * 100);
  rotateY(timer * TWO_PI);
  rotateX(0.5);
  model(icosphere);
  pop();

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    noLoop();
  }
}
