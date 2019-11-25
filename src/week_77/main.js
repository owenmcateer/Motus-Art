/**
 * Motus Art: Breathe
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.0025;
const size = 800;
const ringCount = 5;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
}


// Draw tick
function draw() {
  background(40);
  stroke(239);
  strokeWeight(20);
  noFill();

  for (let i = 0; i < ringCount; i++) {
    const timeOffset = (i / (ringCount * 4)) + timer;
    let pos = sin(timeOffset * TWO_PI);
    pos = map(pos, -1, 1, 0, 1);
    const thisSize = pos * size;

    // Once too small for an ellipse, draw a line.
    if (thisSize < 3) {
      line(
        cx - (size / 2),
        cx - (thisSize / 2) + (size / 2),
        cx + (size / 2),
        cx - (thisSize / 2) + (size / 2),
      );
    }
    else {
      ellipse(cx, cx - (thisSize / 2) + (size / 2), size, thisSize);
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
