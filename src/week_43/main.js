/**
 * Motus: Tau's Arc
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let circleOffset;
const colours = {};

function setup() {
  createCanvas(canvasSize, canvasSize);
  circleOffset = -PI;

  //  Colours
  colours.bg = [7, 15, 35];
  colours.arc = [125, 135, 160];

  colours.bg = [20, 20, 30];
  colours.arc = [150, 150, 160];
}


function draw() {
  background(...colours.bg);

  // Stlying
  stroke(...colours.arc);
  strokeWeight(34);
  noFill();

  for (let i = 1; i < 12; i++) {
    const size = i * 92;
    const startAmount = map(sin(((i * 6) + frameCount) / 50), -1, 1, 0, HALF_PI);
    const amount = map(sin(((i * 6) + frameCount) / 50), -1, 1, 0, TWO_PI);

    // Entity type
    if (amount === TWO_PI) {
      // Full circle
      ellipse(cx, cx, size);
    } else {
      // Arc
      arc(cx, cx, size, size, circleOffset + startAmount, circleOffset + amount + 0.01);
      // Note: I add on 0.01 to avoid the arm not appearing at all.
    }
  }

  // Move offset
  circleOffset += (TWO_PI / 1250);
}
