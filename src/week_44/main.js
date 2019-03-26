/**
 * Motus: Sagitta lines
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
const colours = {};

const radius = canvasSize * 0.45;
const gap = 60;
const lines = (radius * 2) / gap;
const canvasOffset = (canvasSize - (radius * 2)) / 2;
const speed = 0.7;
let motion = 0;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
frameRate(1);
  //  Colours
  colours.bg = [40];
  colours.lines = [255, 0.6];
}


function draw() {
  background(...colours.bg);

  for (let i = 0; i <= lines; i++) {

    const s = (i * gap) + motion;
    const chordLength = (Math.sqrt((2 * s * radius) - (s * s)) * 2);
    const chordRadius = chordLength / 2;

    const x = s + canvasOffset;


    noFill();
    stroke(...colours.lines);
    strokeWeight(14);
    line(x, cx - chordRadius, x, cx + chordRadius);
  }

  // Animate
  motion += speed;
  if (motion > gap) {
    motion = 0;
  }
}
