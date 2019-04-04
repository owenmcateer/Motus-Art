/**
 * Motus: Sagitta lines
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const colours = {};

const bpm = 128;
const fps = 60;
let speed;
const size = 100;
let process = 0;
const cubes = [];
let activePosition = 0;
const cubePositions = [
  // ###
  //  ##
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
    [2, 1],
  ],
  //  ##
  // ###
  [
    [0, 1],
    [1, 0],
    [2, 0],
    [1, 1],
    [2, 1],
  ],
  // ##
  // ###
  [
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  // ###
  // ##
  [
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 0],
  ],
  // ###
  //  ##
  [
    [1, 1],
    [0, 0],
    [1, 0],
    [2, 1],
    [2, 0],
  ],
];


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(2);
  frameRate(fps);
  setAttributes('antialias', true);

  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bg = [20];
  colours.lines = [255];

  // Create clubes
  for (let i = 0; i < cubePositions[0].length; i++) {
    cubes.push(new Cube(i, ...getPos(activePosition, i)));
  }

  // Settings
  speed = round((fps * 60) / bpm);
}


function draw() {
  background(...colours.bg);

  // Camera angle
  rotateY(-0.6);
  rotateX(-0.08);

  // Styles
  noFill();

  // Cubes
  cubes.forEach((c) => {
    c.update();
    c.render();
  });

  // Animate
  process++;
  if (process > speed) {
    activePosition++;

    // Reset?
    if (activePosition > 4) {
      activePosition = 0;
      cubes.forEach((c) => {
        c.newPosition(...getPos(activePosition, c.id));
        c.reset();
      });
      activePosition++;
    }

    // Update cubes position
    cubes.forEach((c) => {
      c.newPosition(...getPos(activePosition, c.id));
    });

    process = 0;
  }
}

// Get cube position
function getPos(position, cube) {
  return cubePositions[position][cube];
}

/**
 * Cube class
 */
class Cube {
  // Constructor
  constructor(id, x, y) {
    this.id = id;
    this.pos = createVector(x, y);
    this.target = createVector(x, y);
  }

  // Reset cubes to starting point
  reset() {
    this.pos = this.target;
  }

  // Update tick
  update() {
    const ease = easeOutQuint(process, 0, 1, 40);

    this.pos.x = map(ease, 0, 1, this.pos.x, this.target.x);
    this.pos.y = map(ease, 0, 1, this.pos.y, this.target.y);
  }

  // Set new position
  newPosition(x, y) {
    this.pos = this.target;
    this.target = createVector(x, y);
  }

  // Render cube
  render() {
    push();
    // Position
    translate((this.pos.x * size) - 100, (this.pos.y * size) - 40, 0);

    // Light outer
    stroke(...colours.lines, 0.1);
    strokeWeight(10);
    box(size);
    // Stroke
    stroke(...colours.lines);
    strokeWeight(4);
    box(size);
    pop();
  }
}

function easeOutQuint(t, b, c, d) {
  return c*((t=t/d-1)*t*t*t*t + 1) + b;
}
