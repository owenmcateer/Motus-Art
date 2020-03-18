/**
 * Motus: Cube Array
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const gridCount = 10;
const gridSize = canvasSize / (gridCount + 1);
const boxSize = gridSize * 0.5;
let timer = 0;
const speed = 0.002;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  ortho();
  smooth();
}


function draw() {
  background(39);

  noFill();
  stroke(239);
  strokeWeight(2);

  translate(canvasSize * -0.5, canvasSize * -0.5);
  const animateX = map(cos(timer * TWO_PI), -1, 1, 0, 1);
  const animateY = map(cos(((timer + 0.25) % 1) * TWO_PI), -1, 1, 0, 1);

  for (let x = 0; x < gridCount; x++) {
    translate(gridSize, 0);
    push();
    for (let y = 0; y < gridCount; y++) {
      translate(0, gridSize);
      const amount = (x / gridCount) * (y / gridCount);

      push();
      rotateX((noise(x, y) + animateX) * amount);
      rotateY((noise(x * 10, y * 10) + animateY) * amount);
      rotateZ((noise(x * 20, y * 20) + animateX) * amount);

      box(boxSize);
      pop();
    }
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
