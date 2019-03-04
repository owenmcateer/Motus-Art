/**
 * Motus: atan cubes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;
const cubes = 16;
let timer = 0;
let magicAngle;


function setup() {
  createCanvas(canvas, canvas, WEBGL);
  normalMaterial();
  colorMode(RGB, 255, 255, 255, 255);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -canvas, canvas * 2);
}

function draw() {
  background(0);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  noFill();
  stroke(255);
  strokeWeight(6);

  // Loop all cubes
  for (let i = cubes; i > 0; i--) {
    push();
    const cosTimer = constrain(cos(((cubes - i) + timer) / 10), -0.8, 0.8);
    const mappedPos = map(cosTimer, -0.8, 0.8, 0, 1);
    const rotateAmount = easeInOutQuart(mappedPos, 0, 1, 1);
    rotateY(rotateAmount * PI);

    // Stroke colour
    stroke(255, (((cubes - i) / cubes) * 180) + 75);

    // Draw cube
    box(i * 37 + 37);
    pop();
  }
  timer += 0.1;
}

function easeInOutQuart(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  return -c/2 * ((t-=2)*t*t*t - 2) + b;
}
