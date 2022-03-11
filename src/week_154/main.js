/**
 * Motus: Cyclone
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cxy = canvasSize / 2;
let timer = 0;
const speed = 0.0075;
const rings = 6;
const innerRings = 4;

// setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  background(25);
}

// Draw tick
function draw() {
  background(10, 19);
  noFill();
  stroke(139, 100);
  strokeWeight(3);

  for (let i = 0; i < rings; i++) {
    const timerOffset = (TWO_PI / rings) * i;
    const x = cos(timer + timerOffset) * 180 + cxy;
    const y = sin(timer + timerOffset) * 180 + cxy;

    for (let j = 0; j < innerRings; j++) {
      const jTimerOffset = (TWO_PI / innerRings) * j;
      const jx = cos(timer * -4 + jTimerOffset) * 60 + x;
      const jy = sin(timer * -4 + jTimerOffset) * 60 + y;
      ellipse(jx, jy, 50);
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI / 2) {
    timer = 0;
  }
}
