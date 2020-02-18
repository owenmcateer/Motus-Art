/**
 * Motus: Stack squared
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

const boxCount = 11;
const spacing = canvasSize / (boxCount - 1);
const elements = [];

let timer = 0;
const speed = 0.005;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);

  // Create grid of elements
  for (let x = 0; x < boxCount; x++) {
    for (let y = 0; y < boxCount; y++) {
      elements.push(new Entity(
        x * spacing,
        y * spacing,
      ));
    }
  }
  frameRate(30);

  // Re-order to place center elements last
  // This ensures they are rendered last, therefore on top.
  elements.sort((a, b) => a.dist - b.dist);
}


// Draw tick
function draw() {
  background(239);
  stroke(39);
  strokeWeight(4);
  fill(255);

  // Loop elements
  elements.forEach((e) => {
    e.update();
    e.render();
  });

  // Timer
  timer += speed;
  if (timer >= PI) {
    timer = 0;
    background('red');
    noLoop();
  }
}


// Entity class
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dist = -dist(this.x, this.y, cx, cx) / cx;
    this.rotation = this.dist;
  }

  update() {
    let sineWave = sin((timer + this.dist) * 2);
    sineWave = constrain(sineWave, -0.2, 0.8);
    sineWave = map(sineWave, -0.2, 0.8, 0, 1);
    sineWave = easeInOutCubic(sineWave, 0, 1, 1);
    this.rotation = sineWave;
  }

  render() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation * (TWO_PI / 8));
    scale(this.rotation * 1.5);
    rect(0, 0, spacing, spacing);
    pop();
  }
}


// Easing function
function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}
