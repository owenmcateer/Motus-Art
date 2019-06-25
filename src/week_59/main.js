/**
 * Motus: Falling cubes
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

const size = 50;
const grid = {
  x: 16,
  y: 16,
};
grid.offset = {
  x: size * (-grid.x / 2),
  y: size * (-grid.y / 2),
};
const boxes = [];
let i = 0;
let worldY = 0;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  // Create boxes
  for (let x = 0; x < grid.x; x++) {
    for (let y = 0; y < grid.y; y++) {
      boxes.push(new Box(
        (x * size) + grid.offset.x,
        (y * size) + grid.offset.y,
      ));
    }
  }

  // Shuffle
  boxes.sort(() => randomWithSeed() - 0.5);
}


// Draw tick
function draw() {
  // Set camera position
  rotateX(PI * 0.5);

  // Styles
  background(40);
  smooth();
  fill(255);
  stroke(0);
  strokeWeight(1);

  // Drop one at a time
  if (i < boxes.length) {
    boxes[i].fall();
    i++;
  }
  // Finished, reset
  else if (boxes[boxes.length - 1].transition === 0) {
    boxes.forEach((b) => {
      b.z = 1;
    });
    i = 0;
    worldY = 0;
  }

  // Move world Y axis
  worldY += 0.81;

  // Update & Render
  boxes.forEach((b) => {
    b.update();
    b.render();
  });
}


// Box class
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 1;
    this.direction = 0;
    this.transition = 0;
  }

  update() {
    if (this.direction === -1) {
      this.z = map(easeOutBounce(this.transition, 0, 1, 1), 0, 1, 1, -1);
      this.transition += 0.01;
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
      this.z * 145 + (worldY) - 100,
    );
    box(size - 1);
    pop();
  }
}


// Random with seed
var seed = 0;
function randomWithSeed() {
    var x = Math.sin(seed++);
    return x - Math.floor(x);
}



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
