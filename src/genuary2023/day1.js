/**
 * Genuary 2023: Day 1
 * "Perfect loop"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let t = 0;
const boxSize = 50;
const grid = {
  x: 8,
  y: 8,
};
grid.offset = {
  x: boxSize * ((-grid.x + 1) / 2),
  y: boxSize * ((-grid.y + 1) / 2),
};
const boxes = [];
let i = 0;
const dropHeight = 300;


/**
 * Setup
 */
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);

  // Create boxes
  for (let x = 0; x < grid.x; x++) {
    for (let y = 0; y < grid.y; y++) {
      boxes.push(new Box(
        (x * boxSize) + grid.offset.x,
        (y * boxSize) + grid.offset.y,
      ));
    }
  }

  // Shuffle
  boxes.sort(() => randomWithSeed() - 0.5);
}


/**
 * Draw tick
 */
function draw() {
  // Set camera position
  rotateX(PI * 0.3);
  rotateZ(t * HALF_PI);
  translate(0, 0, dropHeight * t + 50);

  // Styles
  background(40);
  fill(255);
  stroke(0);
  strokeWeight(1);

  // Drop one at a time
  if (i < boxes.length && frameCount % 2 === 0) {
    boxes[i].fall();
    i++;
  }

  // Update & Render
  boxes.forEach((b) => {
    b.update();
    b.render();
  });

  // Timer
  t += 0.005;
  if (t >= 1) {
    t = 0;

    boxes.forEach((b) => {
      b.z = 0;
    });
    i = 0;
  }
}

/**
 * Box class
 */
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.direction = 0;
    this.transition = 0;
  }

  update() {
    if (this.direction === -1) {
      this.z = easeOutBounce(this.transition, 0, 1, 1);
      this.transition += 1 / (grid.x * grid.y);
    }

    if (this.transition >= 1) {
      this.stop();
    }
  }

  stop() {
    this.transition = 0;
    this.direction = 0;
  }

  fall() {
    this.direction = -1;
    this.transition = 0;
  }

  render() {
    push();
    translate(
      this.x,
      this.y,
      this.z * -dropHeight,
    );
    box(boxSize - 1);
    pop();
  }
}

// Random with seed
let seed = 0;
function randomWithSeed() {
  const x = Math.sin(seed++);
  return x - Math.floor(x);
}

// Easing function
function easeOutBounce(t, b, c, d) {
  if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
   return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
}
