/**
 * Motus: Reactor core
 * https://owenmcateer.github.io/Motus-Art
 */
let timer = 0;
const speed = 0.006;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  frameRate(30);
}

// Tick
function draw() {
  // Styles
  background(39);
  stroke(39);
  fill(239);

  // Position camera
  translate(-250, 8, 100);
  rotateX(-0.1);
  rotateY(-timer * 2 * (TWO_PI / 80));

  // Build the reactor
  for (let a = 0; a < TWO_PI; a += TWO_PI / 80) {
    push();

    rotateY(a);
    for (let i = 0; i < 15; i++) {
      push();
      translate(i * 30 + 50, sin(i / 2 + timer * TWO_PI) * 3, 0);
      box(20, 20, 20);
      translate(0, -150);
      box(20, 20, 20);

      if (i === 14) {
        for (let j = 0; j < 6; j++) {
          push();
          translate(0, j * 25, 0);
          rotateY(timer * -TWO_PI);
          box(20);
          pop();
        }
      }
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
