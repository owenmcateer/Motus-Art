/**
 * Motus: Hyperboloid geometry
 * https://owenmcateer.github.io/Motus-Art
 *
 * Idea from the Guangzhou/Canton Tower.
 */
const canvas = 1080;
const colours = {};
let cx;
let movement;
const lines = 30;

const circleTop = {
  y: 100,
  w: 800,
  h: 100,
};
const circleBottom = {
  y: 950,
  w: 700,
  h: 100,
};
const mult = 1.3;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);

  colours.bg = color(37, 38, 54);
  colours.line_front = color(162, 123, 17);
  colours.line_back = color(142, 103, 7);
  colours.circle = color(191, 154, 44);

  cx = width / 2;
  circleTop.x = cx;
  circleBottom.x = cx;

  movement = HALF_PI;
}

function draw() {
  blendMode(NORMAL);
  background(colours.bg);

  noFill();
  strokeWeight(20);
  stroke(colours.circle);
  ellipse(circleTop.x, circleTop.y, circleTop.w, circleTop.h);
  stroke(colours.line_front);
  ellipse(circleBottom.x, circleBottom.y, circleBottom.w * mult, circleBottom.h);

  // Blend mode hides any line overlays
  blendMode(LIGHTEST);
  strokeWeight(8);
  for (let l = 0; l < lines; l++) {
    if (l > 4 && l < 22) {
      stroke(colours.line_back);
    }
    else {
      stroke(colours.line_front);
    }
    let thisPos = map(l, 0, lines, 1, 360);
    let lineStart = circlePos(thisPos - (cos(movement) * 60), circleTop, 1);
    let lineEnd = circlePos(thisPos + (cos(movement) * 60), circleBottom, mult);
    line(lineEnd.x, lineEnd.y, lineStart.x, lineStart.y);
  }

  // Animation speed
  movement += 0.01;

  // Easter egg just for fun
  if (mouseIsPressed) {
    const dc1 = dist(mouseX, mouseY, circleTop.x, circleTop.y);
    const dc2 = dist(mouseX, mouseY, circleBottom.x, circleBottom.y);
    if (dc1 <= circleTop.h) {
      circleTop.x = mouseX;
      circleTop.y = mouseY;
    }
    else if (dc2 <= circleBottom.h) {
      circleBottom.x = mouseX;
      circleBottom.y = mouseY;
    }
  }
}

function circlePos(pos, circle, mult) {
  const rads = radians(pos);
  const x = (((circle.w * mult) / 2) * sin(rads)) + circle.x;
  const y = ((circle.h / 2) * cos(rads)) + circle.y;
  return createVector(x, y);
}
