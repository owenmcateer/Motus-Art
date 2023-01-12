/**
 * Genuary 2023: Day 12
 * "Tessellation"
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
  fill(255);

  const dirX = cos(t * TWO_PI);
  const dirY = 0.5;
  directionalLight(238, 208, 170, -dirX, -dirY, -1);
  shininess(10);

  const s = 140;
  translate(s * -12, 0, s * -12);

  // Draw boxes
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      const z = (x + y)*s - 500;
      push();
      translate(x * s, z, y * s);
      box(s);
      pop();
    }
  }

  // Timer
  t += 0.0015;
  if (t >= 1) {
    t = 0;
    noLoop();
  }
}
