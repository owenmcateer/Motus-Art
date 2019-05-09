/**
 * Motus: HEX ripple
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const colours = {};

const size = 30;
const spacing = size;
const tranglePoints = [];

let cycle = 0;
const elements = [];


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bg = [40];
  colours.lines = [186];

  // Top line
  tranglePoints[0] = {
    x: size * cos(radians(270)),
    y: size * sin(radians(270)),
  };
  // Right line
  tranglePoints[1] = {
    x: size * cos(radians(30)),
    y: size * sin(radians(30)),
  };
  // Left line
  tranglePoints[2] = {
    x: size * cos(radians(150)),
    y: size * sin(radians(150)),
  };

  // Create grid of elements
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      let xOffset = 0;
      if (y % 2 === 0) {
        xOffset = spacing;
      }
      elements.push(new Trangle(
        x * spacing * 2 + xOffset,
        y * spacing * 1.7,
      ));
    }
  }
}


function draw() {
  background(...colours.bg);
  stroke(...colours.lines);
  strokeWeight(10);
  noFill();

  // Loop elements
  elements.forEach((e) => {
    e.update();
    e.render();
  });

  // Cycle
  cycle += 0.01;
}


class Trangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dist = -dist(this.x, this.y, cx, cx) / cx;
    this.rotation = this.dist;
  }

  update() {
    let sineWave = sin((cycle + this.dist) * 2);
    sineWave = constrain(sineWave, -0.2, 0.8);
    sineWave = map(sineWave, -0.2, 0.8, 0, 1);
    sineWave = easeInOutCubic(sineWave, 0, 1, 1);
    this.rotation = sineWave;
  }

  render() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation * (TWO_PI / 6));

    // Draw 3 points of trangle
    for (let p = 0; p < 3; p++) {
      line(0, 0, tranglePoints[p].x, tranglePoints[p].y);
    }
    pop();
  }
}


function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
