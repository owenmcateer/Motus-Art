/**
 * Motus: Radius Inradius
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let timer = 0;
const speed = 0.0015;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  background(239);

  noFill();
  stroke(39);
  strokeWeight(40);

  // Static circle
  ellipse(cx, cx, 960);

  let prevX = cx;
  let prevY = cx;

  for (let i = 1; i <= 5; i++) {
    const r = 960 - (i * 154);
    const offset = 77;
    const timing = easeInOutQuad(timer + i, 0, 1, 1) * TWO_PI + HALF_PI;
    const x = cos(timing) * offset + prevX;
    const y = sin(timing) * offset + prevY;
    prevX = x;
    prevY = y;

    // Draw circle
    ellipse(x, y, r);
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

// Easing function
function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
