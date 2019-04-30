/**
 * Motus: Into the grid
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540 / 2;
const cx = canvasSize / 2;
const colours = [];
const size = 40;
let movement = 0;
let canvasMist;

function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  frameRate(30);
  smooth();
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [25, 0, 25];
  colours.lines = [174, 46, 193];
  colours.mist = [87, 250, 255];

  // Render mist
  canvasMist = drawMist();
}

function draw() {
  background(...colours.bg);

  // Create grid
  push();
  noFill();
  stroke(...colours.lines);
  rotateX(HALF_PI);
  translate(width * -1.5, width * -2 + movement, 0);
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 18; y++) {
      drawBox(x, y, -50);
      drawBox(x, y, 50);
    }
  }
  pop();

  // Get moving
  movement += 2;
  if (movement >= size) {
    movement = 0;
  }


  // Render mist
  push();
  translate(0, 0, 120);
  texture(canvasMist);
  noStroke();
  plane(width, cx / 2);
  pop();
}


// Draw box grid
function drawBox(x, y, z) {
  // Cal x/y
  const xx = x * size;
  const yy = y * size;

  // Draw shape
  beginShape();
  vertex(xx, yy, z);
  vertex(xx + size, yy, z);
  vertex(xx + size, yy + size, z);
  endShape();
}


// Draw sun
function drawMist() {
  const mist = createGraphics(width, cx);

  // Draw gradient mist
  mist.noFill();
  mist.noStroke();
  for (let i = 0; i <= cx; i++) {
    const inter = map(i, 0, cx, 0, 1);
    let c;
    // Fade in/out
    if (inter <= 0.5) {
      c = lerpColor(color(...colours.bg, 0), color(...colours.mist), inter * 2);
    }
    else {
      c = lerpColor(color(...colours.mist), color(...colours.bg, 0), (inter - 0.5) * 2);
    }
    mist.stroke(c);
    mist.line(0, i, width, i);
  }
  return mist;
}
