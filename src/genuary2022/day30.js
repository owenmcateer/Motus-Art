/**
 * Genuary Day 30
 * "Organic looking output using only rectangular shapes."
 *
 * @motus_art
 */
let timer = 0;
const speed = 0.0025;

const headCubes = 350;
const headSize = 60;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
}

// Draw tick
function draw() {
  background(39);
  stroke(0);
  fill(239);
  orbitControl();

  rotateY(1);
  rotateZ(sin(timer * TWO_PI) * 0.1);
  rotateX(sin(timer * TWO_PI) * 0.2);
  translate(-100, -20, 0);
  scale(1.3);

  for (let l = 0; l < 24; l++) {
    // Swimming
    let radius = map(sin(-timer * 2 * TWO_PI + l / 5), -1, 1, 80, 300);

    // Scal to head
    radius *= l / 30;

    // Draw
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TWO_PI;
      push();
      rotateX(a);
      translate(l * 30, radius, 0);
      box(30);
      pop();
    }
  }

  // Head
  const phi = PI * (3 - sqrt(5));
  for (let i = 0; i < headCubes; i++) {
    const y = 1 - (i / (headCubes - 1)) * 2;
    const radius = sqrt(1 - y * y) * headSize;
    const theta = phi * i; // golden angle increment

    const x = cos(theta) * radius;
    const z = sin(theta) * radius;

    push();
    translate(x, y * headSize, z);
    rotateZ(timer * 2 * PI + x);
    rotateY(timer * 2 * PI + y);
    box(10);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
