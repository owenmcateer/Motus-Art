/**
 * Motus: Slates
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.01;
let magicAngle;
const planeSize = 600;
const numOfPlanes = 18;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -100, canvasSize * 3);
}


// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Styling
  background(39);
  stroke(239);
  strokeWeight(8);
  fill(0, 0.003);

  // Planes
  translate(-280, 280, 0);
  for (let i = 0; i < numOfPlanes; i++) {
    // Animation
    let r = timer;
    r -= ((numOfPlanes - i) * (1 / numOfPlanes));
    r = constrain(r, 0, 1);
    r = easeInOutSine(1 - r, 0, 1, 1);

    push();
    rotate(r * PI);
    translate(0, 0, i * (planeSize / numOfPlanes));
    box(planeSize, planeSize, 2);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= PI) {
    timer = 0;
  }
}


// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
