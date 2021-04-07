/**
 * Motus: Crossed Wires
 */
const canvasSize = 540;
const s = 75;
const gridSize = Math.ceil(canvasSize / s) + 1;
let timer = 0;
const speed = 0.001;

// Crosses
function crosses() {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      drawCross(x * s, y * s);
    }
  }
}

// Boxes
function boxes() {
  fill(39);
  stroke(239);
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      drawBox(x * s, y * s);
    }
  }
}

// Draw single cross
function drawCross(x, y) {
  push();
  translate(x, y);
  rotate(timer * TWO_PI);
  line(-s, 0, s, 0);
  line(0, -s, 0, s);
  pop();
}

// Draw single box
function drawBox(x, y) {
  push();
  translate(x, y);
  rotate(timer * TWO_PI);
  rect(0, 0, s, s);
  pop();
}

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
}

// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(3);

  // Crosses or boxes?
  if (timer < 0.25) {
    crosses();
  }
  else {
    boxes();
  }

  // Timer
  timer += speed;
  if (timer >= 0.5) {
    timer = 0;
  }
}
