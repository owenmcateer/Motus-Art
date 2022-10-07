/**
 * Motus: Ribble angles
 * https://owenmcateer.github.io/Motus-Art
 */
let timer = 0;
const speed = 0.005;
let loops = 0;
let cameraTarget = 0;
let cameraPos = 0;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
}

// Draw tick
function draw() {
  background(39);

  // Camera position
  cameraPos += (cameraTarget - cameraPos) / 6;
  rotateX(cameraPos);

  stroke(239, 239, 239, 20);
  for (let r = 0; r < 23; r++) {
    push();
    const direction = (r % 2 === 0) ? 1 : -1;
    rotateZ((timer / 10) * TWO_PI * direction);

    const z = sin(timer * TWO_PI + r / 3) * 45;
    const iMax = TWO_PI / (floor(map(r, 0, 19, 1, 10)) * 10);
    for (let i = 0; i < TWO_PI; i += iMax) {
      const x = cos(i) * r * 10;
      const y = sin(i) * r * 10;
      point(x, y, z);
    }
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    changeCamera();
  }
  // Loops
  if (loops >= 3) {
    loops = 0;
  }
}

// Change camera
function changeCamera() {
  loops++;
  switch (loops) {
    case 1:
      cameraTarget = HALF_PI;
      break;
    case 2:
      cameraTarget = -2;
      break;
    default:
      cameraTarget = 0;
  }
}
