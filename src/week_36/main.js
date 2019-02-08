/**
 * Motus: Suspended Nether
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080 / 2;
const colours = [];
const cx = canvas / 2;

let magicAngle;
let angle = 0;
let offset = 0;

// Setup
function setup() {
  createCanvas(canvas, canvas, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -canvas, canvas);
}


// Draw tick
function draw() {
  // Styles
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(3);

  // Set viewing angle
  rotateX(-magicAngle);
  rotateY(-QUARTER_PI);

  // Build the grid
  for (let z = 0; z < 8; z++) {
    for (let x = 0; x < 8; x++) {
      push();
      const d = dist(x, z, cx, cx);
      offset = map(d, -1, 1, 100, 10);
      const a = angle + offset;
      const boxHeight = map(sin(a), -1, 1, 20, 300);

      translate(x * 80, 0 + (boxHeight * -0.5), z * 80);
      box(40 - 3, boxHeight, 40 - 3);
      pop();
    }
    offset += 0.1;
  }
  angle -= 0.025;
}
