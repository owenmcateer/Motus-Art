/**
 * Motus: Inner point
 */
let timer = 0;
const speed = 0.005;
const radius = 20;

function setup() {
  createCanvas(540, 540);
  pixelDensity(2);
}

function draw() {
  background(39);
  translate(width / 2, height / 2);
  stroke(0);
  fill(239);

  for (let r = 0; r < 20; r++) {
    const s = sin(timer * TWO_PI + (r / 5)) * (radius * 1.5);
    const iMax = TWO_PI / (floor(map(r, 0, 19, 1, 10)) * (radius / 2));
    for (let i = 0; i < TWO_PI; i += iMax) {
      const x = cos(i) * r * radius;
      const y = sin(i) * r * radius;
      ellipse(x, y, max(2, s));
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
