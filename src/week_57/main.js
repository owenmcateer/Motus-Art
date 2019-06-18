/**
 * Motus: Yawing Stack
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let counter = 0;
const speed = 0.01;
const blocks = 12;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(2);
  smooth();
}


function draw() {
  background(40);
  fill(255);
  stroke(0);
  strokeWeight(1);
  smooth();

  rotateX(0.01);

  for (let i = 0; i < blocks; i++) {
    push();
    translate(0, i * 28 - 150);
    let r = counter - (i * (1 / blocks));
    r = constrain(r, 0, 1);
    r = easeInOutBack(r, 0, 1, 1);
    rotateY(r * HALF_PI);
    box(180, 20, 180);
    pop();
  }

  // Phase
  counter += speed;
  if (counter >= 2) {
    counter = 0;
  }
}

function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
