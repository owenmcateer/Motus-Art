
 /**
 * Motus: Green Matrix rain
 * #codevember day 9
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 32;
const colours = [];
const cx = Math.round(canvas / 2);

const lines = [];

function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  frameRate(30);

  // Colours
  colours.bg = [0, 3, 0, 0.1];
  colours.first = [190, 227, 192];
  colours.green = [30, 130, 42];
  colours.greenDark = [0, 58, 0];

  // Create rain
  for (let i = 0; i < canvas; i++) {
    lines.push(new line(i, round(random(canvas * -1, 0))));
  }
}

function draw() {
  background(colours.bg);

  lines.forEach((line) => {
    line.update();
    line.render();
  });
}

/**
 * Line class
 */
class line {
  constructor(x, y) {
    this.x = x;
    this.reset(y);
  }

  reset(y) {
    this.y = y;
    this.count = round(random(5, 12));
    this.speed = random(0.1, 0.3);
    this.pixels = [];
    for (let i = 0; i < this.count; i++) {
      this.pixels.push(new Pixel(
        this.x,
        (this.count * -1) + i + this.y,
        i / (this.count - 1),
        this.speed));
    }
  }

  update() {
    // Move
    this.y += this.speed;
    this.pixels.forEach((p) => {
      p.update();
    });

    // Reset?
    if ((this.y - this.count) > height) {
      this.reset(0);
    }
  }

  render() {
    this.pixels.forEach((p) => {
      p.render();
    });
  }
}

class Pixel {
  constructor(x, y, pos, speed) {
    this.x = x;
    this.y = y;
    this.pos = pos;
    this.speed = speed;
    this.firstLight = (random() > 0.6) ? 1 : 0;
  }

  update() {
    this.y += this.speed;
  }

  render() {
    if (this.pos === 1 && this.firstLight) {
      fill(colours.first);
    }
    else {
      fill(lerpColor(color(...colours.green), color(...colours.greenDark), 1 - this.pos));
    }

    noStroke();
    rect(this.x, this.y, 1, 1);
  }
}
