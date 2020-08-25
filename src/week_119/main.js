/**
 * Motus: Spaced Order
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let timer = 0;
let phase = 0;
const speed = 0.004;
const rings = 12;
const entitySize = 40;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  background(39);
}


// Draw tick
function draw() {
  // Styling
  background(39, 0.7);
  noStroke();
  fill(239);
  ellipse(cx, cx, entitySize);

  // Draw elements
  for (let i = 0; i < rings; i++) {
    const radius = i * entitySize;
    const m = phase * (TWO_PI * (rings - i));

    for (let j = 0; j < i; j++) {
      const offsetAngle = TWO_PI * (j / i);
      const x = cos(m + offsetAngle) * radius + cx;
      const y = sin(m + offsetAngle) * radius + cx;
      ellipse(x, y, entitySize);
    }
  }

  // Frame
  noFill();
  stroke(239);
  strokeWeight(1);
  rect(entitySize, entitySize, width - entitySize * 2, height - entitySize * 2);

  // Order phases
  if (timer < 1) {
    phase = easeInOutSine(timer, 0, 1, 1) / 4;
  } else if (timer < 2) {
    phase = easeInOutSine(timer - 1, 0, 1, 1) / 4 + 0.25;
  } else if (timer < 3) {
    phase = easeInOutSine(timer - 2, 0, 1, 1) / 4 + 0.5;
  } else if (timer < 4) {
    phase = easeInOutSine(timer - 3, 0, 1, 1) / 4 + 0.75;
  }

  // Timer
  timer += speed;
  if (timer >= 4) {
    timer = 0;
  }
}


// Easing function
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
