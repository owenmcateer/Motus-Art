/**
 * Motus: Falling sun
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
const w = 500;
const items = 8;
let timer = 0;
const speed = 0.005;
const colours = {};


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);

  colours.bg = [56, 46, 44];
  colours.stroke = [54, 43, 41];
  colours.top = [219, 78, 18];
  colours.bottom = [108, 42, 237];
}


function draw() {
  background(...colours.bg);
  strokeWeight(6);
  fill(...colours.top);
  stroke(...colours.stroke);
  ellipse(cx, 290, w);

  for (let i = items; i > 0; i--) {
    const progress = ((i - timer) / items);
    const y = (easeInQuad(progress, 0, 1, 1) * (w * -1.5)) + 1040;
    const h = easeInSine(progress, 0, 1, 1) * w;
    const c = lerpColor(color(...colours.bottom), color(...colours.top), progress);
    fill(c);
    stroke(...colours.stroke);

    if (i === 1) {
      const cs = color(...colours.stroke);
      cs.setAlpha(1 - timer);
      c.setAlpha(1 - timer);
      fill(c);
      stroke(cs);
    }

    ellipse(cx, y, w, h);
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


function easeInQuad(t, b, c, d) {
  return c*(t/=d)*t + b;
}


function easeInSine(t, b, c, d) {
  return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
