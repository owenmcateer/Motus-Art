/**
 * Motus: Helix^2
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const mid = canvas / 2;
let c = 0.2;
const dot = 50;
const spread = 200;

let x;
let dotSize;
let colours;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colours = [
    color('#505160'),
    color('#598234'),
    color('#AEBD38'),
  ];
}

// Draw tick
function draw() {
  background(colours[0]);
  noStroke();

  for (let i = 0; i < 20; i++) {
    // Both steams
    x = (i * dot * 1.1) ;
    dotSize = cos(c + (i / PI)); // -1 +1
    const position = sin(c + (i / PI));

    const stem1size = map(dotSize, -1, 1, 20, 60);
    const stem2size = 80 - stem1size;
    const stem1y = (position * spread) + mid;
    const stem2y = (position * (spread * -1)) + mid;

    const stem1colour = lerpColor(colours[1], colours[2], map(dotSize, -1, 1, 0, 1));
    const stem2colour = lerpColor(colours[1], colours[2], map(dotSize, -1, 1, 1, 0));

    if (dotSize < 0) {
      // Steam 1 on top
      drawDot(x, stem1y, stem1size, stem1colour);
      drawDot(x, stem2y, stem2size, stem2colour);
    } else {
      // Steam 2 on top
      drawDot(x, stem2y, stem2size, stem2colour);
      drawDot(x, stem1y, stem1size, stem1colour);
    }

    c += 0.001;
  }
}


function drawDot(x, y, s, c) {
  fill(c);
  ellipse(x, y, s, s);
}
