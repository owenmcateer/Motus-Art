/**
 * Motus: Grids: Tetrahedrons
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const gridCount = 10;
const gridSize = canvasSize / (gridCount + 1);
let tetrahedron;


// Load model
function preload() {
  tetrahedron = loadModel('Tetrahedron.obj', true);
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  ortho();
  smooth();
}


// Render tick
function draw() {
  background(39);
  noFill();
  stroke(239);
  strokeWeight(2);

  // Center canvas
  translate(canvasSize * -0.5, canvasSize * -0.5);

  // The Grid
  for (let x = 0; x < gridCount; x++) {
    translate(gridSize, 0);
    push();
    for (let y = 0; y < gridCount; y++) {
      translate(0, gridSize);
      const amount = (x / gridCount) * (y / gridCount);

      // Animate amounts
      const animateX = (frameCount / 20) * amount;
      const animateY = (frameCount / 30) * amount;
      push();
      rotateX(PI * 1.5);
      rotateX((noise(x, y) + animateX) * amount);
      rotateY((noise(x + 10, y + 10) + animateY) * amount);
      rotateZ((noise(x + 20, y + 20) + animateX) * amount);

      // I'm using my own model over cone() because the base of cone() is made up of two faces.
      scale(0.3);
      translate(-1, 30, -29);
      model(tetrahedron);
      pop();
    }
    pop();
  }
}
