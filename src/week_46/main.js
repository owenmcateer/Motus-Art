/**
 * Motus: Minimalist Moon
 * https://owenmcateer.github.io/Motus-Art
 *
 * Inspired by @daily_minimal - No. 05
 * https://www.instagram.com/p/Bt6RAnGB651/
 * https://www.instagram.com/daily_minimal/
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const colours = {};

const radius = canvasSize * 0.44;
const border = (canvasSize - (radius * 2)) / 2;
const lineWidth = 1;
const lines = (radius * 2) / lineWidth;
const breaks = (radius * 2) / 13.3;
let texture;

function preload() {
  texture = loadImage('../assets/img/textures/dirty-texture.png');
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  rectMode(CORNER);

  //  Colours
  colours.bg = [238];
  colours.lines = [44];
}

function draw() {
  background(colours.bg);

  // Loop lines
  for (let i = 0; i <= lines; i++) {
    // Circle math
    const s = i * lineWidth;
    const chordLength = (Math.sqrt((2 * s * radius) - (s * s)) * 2);
    const chordRadius = chordLength;

    // X & Y
    const y = s + border;
    const x = cx - (chordRadius / 2);
    let mult = 1;
    let drawLine = true;

    if (i % breaks > 0 && i % breaks < 14) {
      // Solid lines
      fill(...colours.lines);
    }
    else if (i % breaks >= 14 && i % breaks < 28) {
      // Animate these lines
      fill(...colours.lines);
      mult = sin(((i * 0.3) + frameCount) / 50);
      mult = map(mult, -1, 1, 0.3, 1);
    }
    else {
      // Ignore this gap
      drawLine = false;
    }

    // Draw line?
    if (drawLine) {
      noStroke();
      rect(x, y, chordRadius * mult, 2);
    }
  }

  // Hard edge mask
  stroke(...colours.lines);
  noFill();
  strokeWeight(2);
  arc(cx, cx, (radius * 2) - 2, (radius * 2) - 2, radians(251), radians(289));
  arc(cx, cx, (radius * 2) + 2, radius * 2 + 2, radians(73), radians(107));

  // Render overlaying texture
  push();
  imageMode(CENTER);
  translate(cx, cx);
  rotate(round(map(sin(frameCount / 3), -1, 1, 0, 3)));
  image(texture, 0, 0);
  pop();
}
