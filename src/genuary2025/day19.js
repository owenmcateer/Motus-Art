/**
 * Genuary 2025: Day 02
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let circleMath;
let phase = 0;
const speed = 0.0005;
let lastVector;
const elements = 30;


// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Circle math
  circleMath = new CircleMath();
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

// Draw tick
function draw() {
  background(0);

  // width*0.89
  translate(width / 2, height / 2);

  // Styling
  background(0);
  stroke(255, 127);
  fill(255);
  strokeWeight(4);

  // Draw elements
  for (let i = 1; i < elements; i++) {
    const r = map(i, 1, elements, 0, width * 0.44);
    const m = phase * (TWO_PI * (elements - i));
    const x = cos(m) * r;
    const y = sin(m) * r;

    // Draw lines
    if (i > 1) {
      line(x, y, lastVector.x, lastVector.y);
    }

    // Draw
    ellipse(x, y, width * 0.018);

    // Set previous vector
    lastVector = createVector(x, y);
  }

  phase += speed;

  noFill();
  stroke(255);
  strokeWeight(width * 0.011);
  circle(0, 0, width * 0.9);
}

function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
