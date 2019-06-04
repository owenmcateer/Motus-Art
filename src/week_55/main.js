/**
 * Motus: Lines of Circle
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
const r = canvasSize * 0.45;
const linesPerFrame = 2;


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  background(0);
}


function vPoint() {
  const rand = random(TWO_PI);

  const x = cos(rand) * r + cx;
  const y = sin(rand) * r + cx;
  return createVector(x, y);
}


function drawLine() {
  // Get random points
  const point1 = vPoint();
  const point2 = vPoint();
  line(point1.x, point1.y, point2.x, point2.y);
}


function draw() {
  stroke(255, 0.5);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < linesPerFrame; i++) {
    drawLine();
  }
}
