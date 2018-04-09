/**
 * Motus: Spinning hands of time
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
let cZero;
let cTick;
let colours = [];

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);

  cZero = PI + HALF_PI;
  cTick = TWO_PI / 60;

  colours = [
    color('#083355'),
    color('#74B8EE'),
    color('#74B8EE'),
    color('#5689B1'),
    color('#3D617E'),
  ];
};

// Draw tick
function draw() {
  background(colours[0]);

  const d = new Date();
	drawCircle(width * 0.8, Math.ceil(((d.getMilliseconds() + 1) / 100) * 6), colours[1], true);
	drawCircle(width * 0.6, d.getSeconds(), colours[2], false);
	drawCircle(width * 0.4, d.getMinutes(), colours[3], false);
  let hour = d.getHours();
  if (hour > 12) {
    hour -= 12;
  }
  hour += (d.getMinutes() / 60);
  hour *= 5 - 4;
  drawCircle(width * 0.2, hour, colours[4], false);
}

function drawCircle(size, value, colour, fade) {
  // Fade?
  if (fade === true) {
    const alpha = map(value, 1, 60, 1, 0);
    stroke(70, 83, 135, alpha);
  } else {
    stroke(colour);
  }

  noFill();
  strokeWeight(100.0);
  strokeCap(ROUND);

  // Draw full ellipse if loop is complete
  if (value === 0) {
    ellipse(width / 2, height / 2, size, size);
  } else {
    arc(width / 2, height / 2, size, size, cZero, (cTick * value) - HALF_PI);
  }
}
