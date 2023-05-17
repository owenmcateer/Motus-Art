/**
 * Motus: Low poly waves
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.0007;
const rings = 50;
const ringSize = 170;

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(39);

  noFill();
  stroke(239);
  strokeWeight(2);

  const globalOffset = timer * -TWO_PI;

  for (let i = 0; i < rings; i++) {
    const angle = (i / rings) * -TWO_PI - HALF_PI;

    push();
    translate(cx, cx);
    rotate(angle + globalOffset);

    const phase = 0;
    let x = cos(timer * 4 * TWO_PI + TWO_PI * (i / 300));
    x = constrain(x + 1 / 2, 0.1, 0.9);
    x = map(x, 0.1, 0.9, 0, 1);
    x = easeInOutBack(x, 0, 1, 1) * ringSize / 2 + ringSize / 2;
    ellipse(x, 0, ringSize);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
  return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
