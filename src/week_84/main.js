/**
 * MotusArt: Pattarc
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const elements = 5;
const gridPoints = canvasSize / elements;
let timer = 0;
const speed = 0.002;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  // Styles
  background(239);
  noFill();
  stroke(39);
  strokeWeight(34);
  strokeCap(SQUARE);

  // Animation
  const r = easeInOutExpo((timer * 4) % 1, 0, 1, 1);
  const amount = floor((timer * TWO_PI) / HALF_PI) * HALF_PI + HALF_PI;
  const p = r * HALF_PI + amount;

  // Draw grid
  for (let x = 0; x <= elements; x++) {
    for (let y = 0; y <= elements; y++) {
      push();
      translate(gridPoints * x, gridPoints * y);
      rotate(p);
      arc(0, 0, gridPoints, gridPoints, HALF_PI, TWO_PI);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

// Easing function: InOutExpo
function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
