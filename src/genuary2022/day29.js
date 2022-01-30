/**
 * Genuary Day 23
 * "Abstract vegetation."
 *
 * @motus_art
 *
 * Motus: Isometric fall
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 540;
const cx = canvas / 2;
const size = 80;
const gridSize = 20;
const speed = 0.01;
let magicAngle;
const blocks = [];
const fallingBlocks = [];
let i = 0;
const fallHeight = size * 14;


// Setup
function setup() {
  createCanvas(canvas, canvas, WEBGL);
  normalMaterial();
  colorMode(RGB, 255, 255, 255, 255);
  pixelDensity(2);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, canvas * -1.5, canvas * 2);

  // Build static grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      blocks.push(new Block(x * size, y * size, 0));
    }
  }

  // Build falling block array
  blocks.forEach((b) => {
    const fall = fallHeight;
    fallingBlocks.push(new Block(b.x, b.y, fall));
  });
}


// Draw tick
function draw() {
  background(40);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);
  translate(-450, -150, -600);

  // Styles
  fill(40);
  stroke(239);
  strokeWeight(4);

  // Build static grid
  blocks.forEach((b) => {
    b.render();
  });

  // Falling blocks
  fallingBlocks.forEach((b) => {
    b.update();
    b.render();
  });

  // Drop one at a time
  if (i < fallingBlocks.length) {
    fallingBlocks[i].drop();
    i++;
  }

  if (fallingBlocks.filter((b) => b.falling).length === 0) {
    fallingBlocks.forEach((b) => {
      b.reset();
    });
    i = 0;
  }
}


// Block class
class Block {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.falling = false;
    this.transition = 0;
  }

  update() {
    // Exit it not falling
    if (!this.falling) return;

    this.z = map(easeOutSine(this.transition, 0, 1, 1), 0, 1, fallHeight, size);
    // Transition
    this.transition += speed;
    if (this.transition >= 1) {
      this.falling = false;
    }
  }

  drop() {
    this.falling = true;
  }

  reset() {
    this.z = fallHeight;
    this.falling = false;
    this.transition = 0;
  }

  render() {
    push();
    translate(this.x, this.z, this.y);
    box(size);
    pop();
  }
}

function easeOutSine(t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI/2)) + b;
}
