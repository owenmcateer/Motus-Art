/**
 * Motus: Crosswork
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.015;
let magicAngle;
const planeSize = 120;
const numOfPlanes = 70;
const gap = 15;
const midPoint = (numOfPlanes * gap) / 2;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -800, canvasSize * 3);
}


// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Styling
  background(39);
  stroke(239);
  strokeWeight(3);
  noFill();

  // Planes
  translate(-midPoint, midPoint, 0);
  for (let i = 0; i < numOfPlanes; i++) {
    // X
    let r = timer;
    r -= ((numOfPlanes - i) * (1 / numOfPlanes));
    r = constrain(r, 0, 1);
    r = easeInOutSine(1 - r, 0, 1, 1);
    push();
    rotate(r * PI);
    translate(0, 0, i * gap);
    box(planeSize, planeSize, 1);
    pop();

    // Y
    r = (timer + HALF_PI) % PI;
    r -= ((numOfPlanes - i) * (1 / numOfPlanes));
    r = constrain(r, 0, 1);
    r = easeInOutSine(1 - r, 0, 1, 1);
    push();
    translate(midPoint + (i * -gap), 0, midPoint);
    rotateY(HALF_PI);
    rotate(r * -PI);
    box(planeSize, planeSize, 1);
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
