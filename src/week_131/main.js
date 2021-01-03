/**
 * Motus: Tides Ellipses
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const numberOfEntites = 18;
const border = 2;
const gridSize = canvasSize / (numberOfEntites + (border * 2));
const borderSize = gridSize * border;
let timer = 0;
const speed = 0.02;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(2);

  fill(39);

  // Draw and animate grid
  for (let x = 0; x <= numberOfEntites; x++) {
    const xVal = x * 0.5;
    for (let y = 0; y <= numberOfEntites; y++) {
      const yVal = y * 0.5;
      const wave = sin(xVal + yVal + timer);
      const c = map(wave, -1, 1, 0, PI);
      // Draw ellipse
      push();
      translate(x * gridSize + borderSize, y * gridSize + borderSize);
      rotate(c);
      ellipse(0, 0, 40, 20);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
