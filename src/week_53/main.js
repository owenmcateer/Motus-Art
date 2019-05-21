/**
 * Motus: HEX ripple
 * Is it 3D, which way is it rotating?
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
const colours = {};

const speed = 130;
const diskSize = 400;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bg = [40];
  colours.lines = [186, 0.6];
  colours.inner = [254, 1];
}


function draw() {
  background(...colours.bg);
  noFill();

  // Loop disks
  for (let i = -5; i <= 5; i++) {
    const position = map(i, -5, 5, -1, 1);
    const sining = sin(frameCount / speed) * diskSize;
    const cosing = cos(i / PI) * diskSize;

    const x = (position * sining) + cx;
    const y = cx;
    const h = (cosing) + diskSize;
    const w = h * cos(frameCount / speed);

    // Draw disk
    strokeWeight(11);
    stroke(...colours.inner);
    ellipse(x, y, w, h);

    strokeWeight(15);
    stroke(...colours.lines);
    ellipse(x, y, w, h);
  }
}
