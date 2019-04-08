/**
 * Motus: Bookshelf
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;
let timer = 0;
let magicAngle;
const size = 360;
const halfSize = size / 2;
const depth = size / 3;


function setup() {
  createCanvas(canvas, canvas, WEBGL);
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -canvas, canvas * 2);
}

function draw() {
  background(0);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Styles
  fill(0);
  stroke(255);
  strokeWeight(12);

  // Loop all cubes
  for (let i = 0; i < 4; i++) {
    let movement = constrain(timer, i * 0.25, i * 0.25 + 0.25);
    movement = map(movement, i * 0.25, i * 0.25 + 0.25, 0, 1);
    movement = easeInOutCubic(movement, 0, 1, 1);

    push();
    translate(-size * timer + halfSize, -160, i * depth - depth);
    rotate(-HALF_PI * movement);
    translate(-halfSize, halfSize, 0);
    box(size, size, depth);
    pop();
  }


  // Timer
  timer += 0.005;
  if (timer >= 1) {
    timer = 0;
  }
}

function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
