/**
 * Motus: Low poly waves
 * https://owenmcateer.github.io/Motus-Art
 */
let timer = 0;
const timerSpeed = 0.0075;
const numOfTowers = 32;
const towerSize = 830;

// Setup
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(1.1);
  fill(39);

  // Position camera
  rotateX(-0.5234);
  rotateY(sin(timer * 2) * 0.1);
  translate(0, towerSize * -0.5, 0);

  // Draw boxes
  for (let i = numOfTowers; i > 0; i--) {
    let r = timer;
    r -= ((numOfTowers - i) * (1 / numOfTowers));
    r /= 2;
    r = constrain(r, 0, 1);
    r = easeInOutCubic(1 - r, 0, 1, 1);

    push();
    translate(0, i * towerSize * 0.025, 0);
    rotateY(r * HALF_PI);
    scale(sin(easeInOutSine(r, 0, 1, 1) * TWO_PI) * 0.5 + 0.5);
    box(towerSize, towerSize * 0.025, towerSize);
    pop();
  }

  // Timer
  timer += timerSpeed;
  if (timer >= PI) {
    timer = 0;
  }
}

// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
