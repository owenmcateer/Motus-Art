/**
 * Orthogrid
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const canvasSize = 1080;
const cx = canvasSize / 2;
let magicAngle;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -1000, canvasSize * 3);
}

// Draw tick
function draw() {
  // Set viewing angle
  rotateX(-magicAngle);
  rotateY(-QUARTER_PI);

  // Styling
  background(0);
  stroke(0);
  strokeWeight(2);
  fill(239);

  // Size & grid
  const s = map(cos(t * TWO_PI), -1, 1, 100, 120);
  translate(s * -12, 0, s * -12);

  // Growth
  const growth = map(sin(t * TWO_PI), -1, 1, 0.8, 0.95);

  // Draw boxes
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      const z = (x + y)*s - 500;
      push();
      translate(x * s, z, y * s);
      rotateY(t * TWO_PI);
      rotateZ(t * TWO_PI);
      box(s * growth);
      pop();
    }
  }

  // Timer
  t += 0.001;
  if (t >= 1) {
    t = 0;
  }
}

// Easing
function easeInOutCirc(t, b, c, d) {
  if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
