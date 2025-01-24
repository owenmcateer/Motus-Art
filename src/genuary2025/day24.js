/**
 * Genuary 2025: Day 24
 *
 * Remake of "Low poly waves"
 * https://owenmcateer.github.io/Motus-Art/projects/week_167.html
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let timer = 0;
const speed = 0.0007;
const rings = 50;
const ringSize = 330;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);

  background(0);
  noFill();
  stroke(239);
  strokeWeight(4);

  const globalOffset = timer * -TWO_PI;

  for (let i = 0; i < rings; i++) {
    const angle = (i / rings) * -TWO_PI - HALF_PI;

    push();
    translate(1080 * 0.5, 1080 * 0.5);
    rotate(angle + globalOffset);
    let x = cos(timer * 4 * TWO_PI + TWO_PI * (i / 300));
    x = constrain(x + 1 / 2, 0.1, 0.9);
    x = map(x, 0.1, 0.9, 0, 1);
    x = ((easeInOutBack(x, 0, 1, 1) * ringSize) / 2) + (ringSize / 2);
    ellipse(x, 0, ringSize);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
