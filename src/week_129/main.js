/**
 * Motus: Ripple effect
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const speed = 0.005;
const cols = {
  pink: [209, 49, 222, 200],
  green: [49, 222, 209, 200],
};


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  frameRate(60);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(29);
  blendMode(SCREEN);
  stroke(255, 220);
  strokeWeight(2);
  noFill();

  // Camera
  rotateZ(cos(timer * TWO_PI) / 40);
  rotateX(PI / 4);

  // Calculate wave
  for (let x = 0; x < 100; x++) {
    const xval = map(x, 0, 120, 0, 5);
    const yval = exp(-xval) * cos(TWO_PI * (xval + timer));
    const y = map(yval, -1, 1, 200, 0);

    push();
    translate(0, 0, y);
    const radius = x * 7;
    stroke(lerpColor(color(...cols.green), color(...cols.pink), x / 100));
    ellipse(0, 0, radius, radius, 50);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
