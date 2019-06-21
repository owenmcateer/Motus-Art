/**
 * Motus: Quantum entanglement
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let phase = 0;
const speed = 0.0003;
const elements = 20;
const entities = [];
const minDistance = 200;


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  for (let i = 1; i < elements; i++) {
    entities.push(new Entity(i));
  }
}


function draw() {
  // Styling
  background(40);
  stroke(255, 127);
  fill(255);
  strokeWeight(2);

  // Draw elements
  entities.forEach((e) => {
    e.update();
    e.render();
  });
  entities.forEach((e) => {
    e.renderDots();
  });

  phase -= speed;
}


class Entity {
  constructor(num) {
    this.num = num;
    this.x = random(width);
    this.y = random(height);
    this.update();
  }

  update() {
    const r = this.num * 13;
    const m = phase * (TWO_PI * (elements - this.num));
    this.x = cos(m) * r + cx;
    this.y = sin(m) * r + cx;
  }

  render() {
    entities.forEach((e) => {
      const distance = dist(this.x, this.y, e.x, e.y);
      if (distance <= minDistance) {
        stroke(255, map(distance, 0, minDistance, 1, 0));
        line(this.x, this.y, e.x, e.y);
      }
    });
  }

  renderDots() {
    noStroke();
    const size = map(sin(phase * 150), -1, 1, 6, 9);
    ellipse(this.x, this.y, size);
  }
}
