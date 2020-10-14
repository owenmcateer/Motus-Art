/**
 * Motus Art: The passage
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const numOfRings = 60;
const maxNoise = 50;
const ringResolution = 200;

const speed = 0.01;
let timer = 0;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);
}


// Draw tick
function draw() {
  background(15);
  stroke(239);
  noFill();

  for (let i = 0; i < numOfRings; i++) {
    const easePhase = ((((timer / 10) % 0.1) * 10) / numOfRings);
    const ease = easeInCubic((i / numOfRings) + easePhase, 0, 1, 1);
    const r = (ease * (cx - 40)) + 40;
    stroke(ease * 200 + 20);

    // Last ring, fadeout
    if (i === numOfRings - 1) {
      stroke(239, 1 - timer);
    }
    strokeWeight(ease * 2 + 0.5);

    beginShape();
    const step = TWO_PI / ringResolution;
    for (let p = 0; p < TWO_PI; p += step) {
      const offsetX = cos(p) + (ease * 10);
      const offsetY = sin(p) + (ease * 10);
      let offset = noise(offsetX, offsetY);
      offset = map(offset, 0, 1, -1, 1);
      offset *= maxNoise * ease;
      const x = cos(p + HALF_PI) * r + offset + cx;
      const y = sin(p + HALF_PI) * r + offset + cx + 150 - (r * 0.4);

      if (y < 400 + (r * 0.4)) {
        vertex(x, y);
      }
      else {
        vertex(x, 400 + (r * 0.4));
      }
    }
    endShape(CLOSE);
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing function
function easeInCubic(t, b, c, d) {
  return c*(t/=d)*t*t + b;
}
