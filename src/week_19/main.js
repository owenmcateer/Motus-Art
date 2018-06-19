/**
 * Motus: Rainbow tunnel
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

let movement = 0.0;
const yLines = 11;
const horizon = cx - 100;
const sizeHeight = 150;
let canvasFog;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [38];
  colours.top = [16, 92, 98];
  colours.bottom = [165, 49 ,45];
  colours.middle = [127, 87, 35];

  // Render fog
  canvasFog = drawFog();
}

// Draw tick
function draw() {
  background(colours.bg);

  // Y lines
  for (let i = 0; i < yLines; i++) {
    const xOne = (canvas / yLines) * (i + 0.5);
    const xTwo = (i - 3.65) * 400;

    fill(colours.bottom);
    noStroke();

    quad(
      xOne - 1, canvas - horizon,
      xOne + 1, canvas - horizon,
      xTwo + 20, canvas,
      xTwo - 20, canvas,
    );

    fill(colours.top);
    quad(
      xOne - 1, horizon,
      xOne + 1, horizon,
      xTwo + 20, 0,
      xTwo - 20, 0,
    );
  }

  // X lines
  for (let i = 0; i < 10; i++) {
    noFill();
    stroke(colours.bottom);
    const pos = easeInCirc(i + (movement), 0, horizon, 10);
    strokeWeight(map(pos, 0, cx, 1, 30));

    // Bottom lines
    const yOffsetB = pos + cx + 100;
    line(0, yOffsetB, canvas, yOffsetB);

    // Top lines
    stroke(colours.top);
    const yOffsetT = horizon - pos;
    line(0, yOffsetT, canvas, yOffsetT);
  }

  // Fog
  image(canvasFog, 0, horizon - sizeHeight);
  push();
  translate(0, (canvas - horizon) + sizeHeight);
  scale(1, -1);
  image(canvasFog, 0, 0);
  pop();

  // Boxes
  for (let i = 0; i < 6; i++) {
    const size = easeInExpo(i + (movement), 0, canvas, 5);
    const sizeHalf = size * 0.5;
    const sizeSmaller = size * 0.9;
    const sizeSmallerHalf = sizeSmaller * 0.5;

    const opacity = (size / canvas) + 0.2;
    strokeWeight(map(size, 0, canvas, 1, 30));
    stroke(colours.middle[0], colours.middle[1], colours.middle[2], opacity);

    // Draw box
    rect(cx - sizeSmallerHalf, cx - sizeSmallerHalf, sizeSmaller, sizeSmaller);
    rect(cx - sizeHalf, cx - sizeHalf, size, size);

    // Draw connecting lines
    line(cx - sizeHalf, cx - sizeHalf, cx - sizeSmallerHalf, cx - sizeSmallerHalf);
    line(cx + sizeHalf, cx - sizeHalf, cx + sizeSmallerHalf, cx - sizeSmallerHalf);
    line(cx + sizeHalf, cx + sizeHalf, cx + sizeSmallerHalf, cx + sizeSmallerHalf);
    line(cx - sizeHalf, cx + sizeHalf, cx - sizeSmallerHalf, cx + sizeSmallerHalf);
  }

  movement += 0.0175;
  if (movement >= 1) {
    movement = 0;
  }
}

function easeInExpo(t, b, c, d) {
  return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}

function drawFog() {
  const fog = createGraphics(canvas, sizeHeight);
  fog.noFill();
  const from = color(colours.bg[0], 0);
  const to = color(colours.bg[0]);
  for (let i = 0; i <= sizeHeight; i++) {
    const c = lerpColor(from, to, i / sizeHeight);
    fog.stroke(c);
    fog.line(0, i, canvas, i);
    stroke(c);
    line(0, i, canvas, i);
  }
  return fog;
}
