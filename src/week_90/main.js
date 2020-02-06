/**
 * Motus: Dancing Cubes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const speed = 0.002;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(2);
}


function draw() {
  background(39);
  smooth();
  noFill();
  stroke(map(cos(timer * 30 * PI), -1, 1, 196, 239));
  strokeWeight(3);
  smooth();

  // Rotate all cubes
  rotateY(timer * TWO_PI);

  // Draw cubes
  for (let i = 0; i < 8; i++) {
    rotateX(sin(easeInOutSine(timer, 0, 1, 1) * 4 * PI) / (PI * 6));
    rotateZ(sin(easeInOutSine(timer, 0, 1, 1) * 2 * PI) / (PI * 6));
    box((i * 20) + 150);
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


function easeInOutSine(t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
