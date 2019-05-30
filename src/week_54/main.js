/**
 * Motus: Testing Grid
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const lines = 20;
let movement = 0;
const ballYpos = canvasSize * 0.31;
const bounceHeight = 250;
const trailSize = 60;
const trail = [];


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


function draw() {
  background(40);
  stroke(255);

  // Vertical lines
  line(0, cx, width, cx);
  for (let i = 0; i < lines; i++) {
    const pos = map(i, 0, lines - 1, -1, 1);

    const offsetX1 = (movement * 3) * ((cx / lines + 1) * 2);
    const offsetX2 = (movement * 3) * (((width * 2) / lines + 3) * 2);

    const x1 = (pos * cx) + cx - offsetX1;
    const x2 = (pos * (width * 2)) + cx - offsetX2;

    line(x1 + 50, cx, x2, height)
  }

  // Horizontal lines
  for (let i = 0; i < 16; i++) {
    const yOffset = easeInCirc(i, 0, cx, 15.5) + cx;
    line(0, yOffset, width, yOffset);
  }

  // Draw trail
  noFill();

  for (let i = 0; i < trail.length; i++) {
    ellipse(247 - (i * 2.4), trail[i], 20);
  }

  // Draw ball
  const x = 250;
  const yCos = cos(movement * PI);
  const y = easeInCirc(yCos, 0, 1, 1) * bounceHeight;

  // Shadow ball
  noStroke();
  fill(255, 15);
  const shadowSize = map(y, -bounceHeight, bounceHeight, 50, 15);
  ellipse(x, ballYpos + bounceHeight + 5, shadowSize, shadowSize / 2);
  // Ball
  fill(255);
  ellipse(x, y + ballYpos, 20);

  // Update trail
  if (trail.length > trailSize) {
    trail.pop();
  }
  trail.unshift(y + ballYpos);

  // Track movement
  movement += 0.01;
  if (movement >= 1) {
    movement = 0;
  }
}


function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}
