/**
 * Motus: Ripples
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const speed = 0.001;
const border = 30;
const lines = 11;

// Setup
function setup() {
  createCanvas(540, 540);
}

// Draw tick
function draw() {
  background(239);
  noFill();
  strokeWeight(20);
  strokeCap(SQUARE);
  stroke(150, 100);
  const w = width - (border * 2);

  // Lines
  for (let i = 1; i < lines; i++) {
    strokeWeight(10 + (i * 0.5));
    let x = ((t * i) * w) % (w * 2);
    if (x > w) x = w - x + w;
    x += border;
    line(x, border, x, height - border);
    line(border, x, height - border, x);
  }

  // Border
  stroke(39);
  strokeWeight(20);
  rect(border, border, w, w);

  // Timer
  t += speed;
  if (t >= 2) {
    t = 0;
  }
}
