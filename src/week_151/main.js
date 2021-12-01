/**
 * Motus: Null Spaces
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const grid = 11;
const s = canvasSize / (grid + 2);
let timer = 0;
const speed = 0.01;
const half = grid / 2;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
}


// Render tick
function draw() {
  background(39);
  translate(width / -2 + s, height / -2 + s);

  for (let x = 0; x <= grid; x++) {
    for (let y = 0; y <= grid; y++) {
      const val = calc(x, y);

      stroke(39);
      fill(249);
      push();
      translate(x * s, y * s);
      rotateX(HALF_PI);
      rotateZ(sin(timer) * PI);
      rotateX(val * TWO_PI);
      box(s * 0.8, s * 0.2, s * 0.9);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
    noLoop();
  }
}

/**
 * Math!
 *
 * @param {int} x X-pos in grid
 * @param {int} y Y-pos in grid
 * @returns {float} -1 1
 */
function calc(x, y) {
  return sin(y / 2 / grid + timer);
}
