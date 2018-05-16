/**
 * Motus: Towering circles
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const circles = 16;
let pos = 0;
let mouseDown = false;
let pointer;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [1, 48, 53];
  colours.circles = [62, 180, 188, 0.08];
}

function draw() {
  background(colours.bg);
  noStroke();

  // Mouse or auto?
  if (mouseDown) {
    pointer = createVector(mouseX, mouseY);
  }
  else {
    pointer = circlePos(pos, {
      w: canvas,
      h: canvas,
      x: cx,
      y: cx,
    });
  }

  // Size multiplier
  const sizeMult = map(sin(frameCount / 100), -1, 1, 3, 5.5);

  // Draw circles
  for (let i = 1; i <= circles; i++) {
    fill(colours.circles);
    const size = (canvas * 1.3) - (i * circles * sizeMult);
    const x = cx + ((pointer.x - cx) * (i * 0.03));
    const y = cx + ((pointer.y - cx) * (i * 0.03));
    ellipse(x, y, size, size);
  }

  pos += 2;
}

function circlePos(pos, circle) {
  const rads = radians(pos);
  const x = ((circle.w / 2) * sin(rads)) + circle.x;
  const y = ((circle.h / 2) * cos(rads)) + circle.y;
  return createVector(x, y);
}

function mousePressed() {
  mouseDown = true;
}
function mouseReleased() {
  mouseDown = false;
}
