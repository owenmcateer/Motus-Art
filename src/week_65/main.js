/**
 * Motus: Triangle tunnel
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let phase = 0;
const speed = 0.001;
const items = 14;
const trangleShape = {
  center: cx,
  middle: cx,
  top: -150,
  bottom: 200,
  left: -200,
  right: 200,
};


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);
}


function draw() {
  background(40);

  noFill();
  stroke(255);

  for (let i = 0; i < items; i++) {
    let phasing = (((i + items) % items) / items) + phase;
    if (phasing >= 1) {
      phasing -= 1;
    }

    const offset = map(easeOutBack(phasing, 0, 1, 1), 0, 1, 60, -40);
    const scale = map(easeInCirc(phasing, 0, 1, 1), 0, 1, 0.16, 5);

    stroke(215 * phasing + 40, 0.8);
    strokeWeight(6 * scale + 3);

    triangle(
      trangleShape.center,
      (trangleShape.top * scale) + trangleShape.middle + offset,
      (trangleShape.left * scale) + trangleShape.center,
      (trangleShape.bottom * scale) + trangleShape.middle + offset,
      (trangleShape.right * scale) + trangleShape.center,
      (trangleShape.bottom * scale) + trangleShape.middle + offset,
    );
  }

  phase += speed;
  if (phase >= 1 / items) {
    phase = 0;
  }
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}

function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
