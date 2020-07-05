/**
 * Motus: Pins & needles
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

const reducer = 0.85;
const speed = 0.004;
const initLength = 160;
const maxIterations = 14;
let timer = Math.PI * 1.15;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


// Draw Tick
function draw() {
  background(39);
  stroke(239, 200);
  strokeWeight(4);

  // Arms of lines
  for (let i = 0; i < 4; i++) {
    push();
    drawMovingLine(cx, cx, initLength, TWO_PI * (i * 0.25), 1);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}


/**
 * Draw rotating lines
 *
 * @param {int} x X position
 * @param {int} y Y positiob
 * @param {int} l Length
 * @param {int} offset Offset angle
 * @param {int} iteration Number of iterations
 */
function drawMovingLine(x, y, l, offset, iteration) {
  // Break after max iterations
  if (iteration > maxIterations) return;

  // Set position and rotation
  translate(x, y);
  if (iteration === 1) {
    rotate(offset);
  }
  rotate(timer);

  // Draw line
  let nextLength = l - 4;
  if (iteration > 1) {
    line(l * -reducer, 0, l * reducer, 0);
    nextLength = l * reducer;
  }

  // Next line
  drawMovingLine(l * -reducer, 0, nextLength, offset, iteration + 1);
}
