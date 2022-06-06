/**
 * Motus: Square Tunnel
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const speed = 0.05;
const squaresCount = 110;


// Setup
function setup() {
  createCanvas(1080, 1080, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
}


// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(1);
  fill(0, 0.01);

  orbitControl();
  rotateX(HALF_PI);
  translate(0, 50 * -54, 0);

  for (let i = 0; i < squaresCount; i++) {
    push();
    translate(0, i * 40 + (t * 40));
    stroke(239 + ((16 * i) / squaresCount + t * 4));
    strokeWeight((i / squaresCount) * 3 + 1);
    rotateY(i / -(squaresCount / TWO_PI) + (-t * TWO_PI) / squaresCount);
    box(500, 1, 500);
    pop();
  }

  // Timer
  t += speed;
  if (t >= 1) {
    t = 0;
  }
}
