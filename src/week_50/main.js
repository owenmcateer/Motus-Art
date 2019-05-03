/**
 * Motus: Millennium Falcon gun turret
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const colours = [];
const cx = canvasSize / 2;
let crossX;
let crossY;
let word;
const words = [
  '0x8kIt78e42V',
  '--ox-1le*uiZ',
  '0x18kaLwQm9b',
  'o34rKnVb8eRq',
];

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [112, 0, 1];
  colours.lines = [227, 108, 45];

  crossX = new NoiseLoop(2, 100, 900);
  crossY = new NoiseLoop(2, 400, 720);
}

// Draw tick
function draw() {
  background(...colours.bg);

  // HUD
  stroke(...colours.lines);
  strokeWeight(20);
  strokeCap(ROUND);
  noFill();
  rect(30, 60, width - 60, height - 120, 80);
  line(30, 860, width - 30, 860); // ---
  line(250, 860, 300, 910); // \
  line(width - 250, 860, width - 300, 910); // /
  line(300, 910, 360, 910);
  line(width - 300, 910, width - 360, 910);
  line(340, 890, width - 340, 890);
  line(340, 890, 440, 990);
  line(width - 340, 890, width - 440, 990);
  line(440, 990, width - 440, 990);
  // Text
  fill(...colours.lines);
  noStroke();
  textFont('Impact');
  textAlign(CENTER);
  textSize(34);
  text(word, cx, 954);
  if (frameCount % 10 === 0) {
    word = random(words);
  }

  // Graph
  strokeCap(SQUARE);
  strokeWeight(40);
  stroke(...colours.lines);
  noFill();
  line(755, 990, 755, 980);
  line(800, 990, 800, 960);
  line(845, 990, 845, 940);
  line(890, 990, 890, 920);
  line(935, 990, 935, 900);
  line(980, 990, 980, 880);

  // Target
  strokeWeight(10);
  strokeCap(ROUND);

  ellipse(cx, 450, 130, 330);

  // Grid
  grid(260, 100, 520, 900, constrain(sin(frameCount / 20), -0.8, 0.8));
  grid(810, 100, 570, 900, constrain(-sin(frameCount / 20), -0.8, 0.8));

  // Cross hair
  crossHair(crossX.value(frameCount / 80), crossY.value(frameCount / 80));
}


function crossHair(x, y) {
  stroke(...colours.bg);
  strokeWeight(16);
  ellipse(x, y, 100, 100);
  line(x, y - 75, x, y - 25);
  line(x, y + 75, x, y + 25);
  line(x - 75, y, x - 25, y);
  line(x + 75, y, x + 25, y);

  stroke(...colours.lines);
  strokeWeight(10);
  ellipse(x, y, 100, 100);
  line(x, y - 75, x, y - 25);
  line(x, y + 75, x, y + 25);
  line(x - 75, y, x - 25, y);
  line(x + 75, y, x + 25, y);
}


function grid(x, y, w, h, swing) {
  const leftX = map(swing, -1, 1, x, w);
  const topY = y;
  const rightX = (x + w) - leftX;
  const bottomY = h * 0.25;

  // Draw grid
  const gridSize = 6;
  for (let i = 0; i < gridSize; i++) {
    const xLeft = map(i, 0, gridSize - 1, leftX, rightX);
    const xRight = map(i, 0, gridSize - 1, (x + w) - leftX, rightX);
    const yTop = map(i, 0, gridSize - 1, topY, bottomY);
    const yBottom = map(i, 0, gridSize - 1, h - topY, h - bottomY);

    const horizontalYleft = map(i, 0, gridSize - 1, y, h - topY);
    const horizontalYright = map(i, 0, gridSize - 1, bottomY, h - bottomY);

    // Lines
    line(xLeft, yTop, xLeft, yBottom);
    line(leftX, horizontalYleft, xRight, horizontalYright);
  }
}

class NoiseLoop {
  constructor(diameter, min, max) {
    this.diameter = diameter;
    this.min = min;
    this.max = max;
    this.cx = random(1000);
    this.cy = random(1000);
  }

  value(a) {
    let xoff = map(cos(a), -1, 1, this.cx, this.cx + this.diameter);
    let yoff = map(sin(a), -1, 1, this.cy, this.cy + this.diameter);
    let r = noise(xoff, yoff);
    return map(r, 0, 1, this.min, this.max);
  }
}
