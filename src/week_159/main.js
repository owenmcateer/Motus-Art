/**
 * Motus: Square Tunnel
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const speed = 0.05;

function setup() {
  createCanvas(1080, 1080, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
}

function draw() {
  background(39);
  stroke(239);
  strokeWeight(1);
  fill(0, 0.01);

  orbitControl();
  rotateX(HALF_PI);
  translate(0, 50 * -54, 0);

  for (let i = 0; i < 110; i++) {
    push();
    translate(0, i * 40 + (t * 40));
    stroke(239 + ((16 * i) / 110 + t * 4));
    rotateY(i / -20 + (-t * TWO_PI) / 110);
    box(500, 1, 500);
    pop();
  }

  // Timer
  t += speed;
  if (t >= 1 - speed) {
    t = 0;
  }
}
