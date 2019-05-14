/**
 * Motus: Neutron pluse
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
const colours = {};

const lines = 300;
let radius = 100;
const angleAmt = (Math.PI * 2) / lines;
const offset = Math.PI * -0.25;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bg = [23, 14, 67, 0.1];
  colours.lines = [245, 3, 246, 0.5];

  background(23, 14, 67);
}


function draw() {
  background(...colours.bg);
  stroke(...colours.lines);
  strokeWeight(2);
  noFill();

  const rotation = sin(frameCount / 75) * (PI / 0.5);
  radius = map(sin(frameCount / 75), -1, 1, 40, 120);

  for (let i = 0; i < lines; i++) {
    const angle = (angleAmt * i);

    let outerX;
    let outerY;

    if (angle >= 0 && angle < HALF_PI) {
      outerX = canvasSize;
      outerY = map(angle, 0, HALF_PI, 0, canvasSize);
    }
    else if (angle >= HALF_PI && angle < PI) {
      outerX = map(angle, HALF_PI, PI, canvasSize, 0);
      outerY = canvasSize;
    }
    else if (angle >= PI && angle < (PI + HALF_PI)) {
      outerX = 0;
      outerY = map(angle, PI, PI + HALF_PI, canvasSize, 0);
    }
    else if (angle >= (PI + HALF_PI) && angle < TWO_PI) {
      outerX = map(angle, PI + HALF_PI, TWO_PI, 0, canvasSize);
      outerY = 0;
    }

    const innerX = cos(angle + offset + rotation) * radius + cx;
    const innerY = sin(angle + offset + rotation) * radius + cx;

    line(outerX, outerY, innerX, innerY);
  }
}
