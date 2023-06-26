/**
 * Motus: Step back
 * https://owenmcateer.github.io/Motus-Art
 */
let s = 600;
const gridCount = 12;

// Setup function
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

// Draw tick
function draw() {
  background(39);
  fill(255);
  noStroke();

  const t = (frameCount / 150) + 50;

  // Global position
  translate(s * gridCount * -0.5, s * gridCount * -0.5);

  // Draw the grid
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      push();
      const math = magic(x, y, t);
      const zIndex = math * s * 2;
      translate(x * s, y * s, zIndex);
      rotateZ(scaleRotate(math));
      box(s, s, 1);
      pop();
    }
  }
}

// The magic of math
function magic(x, y, t) {
  return sin((y % 2) + t) * sin((x % 2) + t) / sin((y % 1) + t) * sin((x % 1) + t);
}

// Scale the Z rotation
function scaleRotate(rad) {
  return map(constrain(rad, -0.1, 0.1), -0.1, 0.1, 0, HALF_PI);
}

// p5 mouse click
function mouseClicked() {
  s -= 100;
  if (s <= 100) {
    s = 600;
  }
}
