/**
 * Motus: Plane boxes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.004;
let magicAngle;
const planeSize = 250;


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
  noFill();
  stroke(239);
  strokeWeight(12);

  // Global rotation
  const rotatingTimer = map(constrain(timer, 0.7, 1), 0.7, 1, 0, 1);
  const globalRotationAmount = easeInOutSine(rotatingTimer, 0, 1, 1) * HALF_PI;
  rotateX(globalRotationAmount);
  rotateY(globalRotationAmount);
  rotateZ(globalRotationAmount);

  // Sent plane rotation amount
  const easingTimer = map(constrain(timer, 0.1, 0.65), 0.1, 0.65, 0, 1);
  const rotateAmount = easeOutBounce(easingTimer, 0, 1, 1) * PI;

  // Planes
  for (let i = 0; i < 4; i++) {
    push();
    rotateY(HALF_PI * i);
    translate(0, 0, planeSize / 2);
    rotateY(rotateAmount);
    box(planeSize, planeSize, 2);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function easeOutBounce(t, b, c, d) {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
  } else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
}
