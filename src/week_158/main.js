/**
 * Motus: Rotating stack
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const speed = 0.01;

// Setup
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

// Draw tick
function draw() {
  background(39);

  // Position camera
  rotateY(-0.15);
  rotateX(0.65);
  rotateZ(-0.05);

  translate(20, -2600, 300);

  // Animtion
  translate(0, t * 150);
  rotateY(t * 0.04);

  // The tower
  for (let i = 0; i < 30; i++) {
    push();
    translate(0, i * 150, 0);
    rotateY(i * 0.04);

    // Walls
    fill(239);
    stroke(239);
    beginShape();
    vertex(0, 50, 0);
    vertex(1000, 0, -1000);
    vertex(0, -50, 0);
    vertex(-1000, 0, -1000);
    vertex(0, 50, 0);
    endShape();

    // Floor
    noStroke();
    fill(39);
    beginShape();
    vertex(0, 50, 0);
    vertex(-1000, 0, -1000);
    vertex(1000, 0, -1000);
    endShape();
    pop();
  }

  // Timer
  t += speed;
  if (t >= 1) {
    t = 0;
  }
}
