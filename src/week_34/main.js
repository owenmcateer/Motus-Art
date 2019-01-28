/**
 * Motus: Radar dance
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const blips = [];
let speed = 0;
const steps = 20;
const arcs = [];

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  speed = PI / 60;

  // Colours
  colours.bg = [0, 12, 21, 0.15];
  colours.inner = [0, 51, 80];
  colours.blip = [0, 170, 224];
  colours.blipFade = [0, 154, 203];

  // Create blips
  for (let i = 1; i < 7; i++) {
    blips.push(new Blip(i * 120, i % 2));
  }

  // Create arcs
  arcs.push({
    pos: PI * 1.3,
    size: PI * 0.6,
    speed: PI / 1400,
  });
  arcs.push({
    pos: HALF_PI,
    size: PI * 0.45,
    speed: PI / 800,
  });
  arcs.push({
    pos: PI * 0.3,
    size: PI * 0.3,
    speed: PI / -600,
  });
}


// Draw tick
function draw() {
  background(...colours.bg);

  // Draw lines
  noFill();
  stroke(...colours.blip, 0.03);
  strokeWeight(1);
  const lines = 16;
  for (let i = 0; i < lines; i++) {
    const step = (TWO_PI / lines) * i;
    const x = ((830 / 2) * sin(step)) + cx;
    const y = ((830 / 2) * cos(step)) + cx;
    line(cx, cx, y, x);
  }

  // Draw blips
  noStroke();
  fill(colours.blip);
  blips.forEach((b) => {
    b.update();
    b.render();
  });

  // Draw outline
  noFill();
  stroke(...colours.blip, 0.1);
  strokeWeight(20);
  strokeCap(SQUARE);
  arcs.forEach((a) => {
    arc(cx, cx, 900, 900, a.pos, a.pos + a.size);
    a.pos += a.speed;
  });
}


class Blip {
  constructor(radius, reverse) {
    this.radius = radius;
    this.speed = speed;
    if (reverse) {
      this.speed *= -1;
    }
    this.position = 0;
    this.stepSpeed = this.speed / steps;
  }

  update() {
    this.position += this.speed;
  }

  render() {
    for (let s = 0; s < steps; s++) {
      const coordinates = this.circlePos(this.position - (this.stepSpeed * s));
      ellipse(coordinates.x, coordinates.y, 40, 40);
    }
  }

  circlePos(position) {
    const x = ((this.radius / 2) * sin(position)) + cx;
    const y = ((this.radius / 2) * cos(position)) + cx;
    return createVector(x, y);
  }
}
