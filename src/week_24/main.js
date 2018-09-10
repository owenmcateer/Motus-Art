/**
 * Motus: Penrose cycle
 * https://owenmcateer.github.io/Motus-Art
 *
 * A recreation of Bees & Bombs - Dizzy Disks
 * https://beesandbombs.tumblr.com/post/81235027446/dizzy-disks
 */
const canvas = 1080;
const colours = [];

let dots = [];
const speed = 3;
let timer = 0;
let reset = 3;
const spacing = 120;
const size = 60;
let ease = 1;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB, 100);

  // Colours
  colours.bg = [15];

  // Start
  init();
}

function init() {
  dots = [];
  const rowCol = 14;

  for (let i = 0; i < (rowCol * rowCol); i++) {
    const col = Math.floor(i / rowCol);
    const row = i - (col * rowCol);
    let animation = 0;
    if ((col % 2 === 0 && row % 4 === 0) || (col % 2 === 1 && row % 4 === 2)) {
      animation = 1;
    }
    else if ((col % 2 === 1 && row % 4 === 0) || (col % 2 === 0 && row % 4 === 2)) {
      animation = 2;
    }
    else if ((col % 2 === 0 && row % 4 === 1) || (col % 2 === 1 && row % 4 === 3)) {
      animation = 3;
    }
    else if ((col % 2 === 1 && row % 4 === 1) || (col % 2 === 0 && row % 4 === 3)) {
      animation = 4;
    }

    // x Offset
    let xOffset = (spacing * -2);
    if (row % 2 === 0) {
      xOffset += spacing / 2;
    }

    // y Offset
    const yOffset = spacing * -2;

    // Create dot
    dots.push(new Dot((col * spacing) + xOffset, (row * spacing) + yOffset, animation));
  }
}

function draw() {
  background(...colours.bg);

  // Mad colours
  noStroke();
  fill(color(((cos(frameCount / 100)) + 1) * 50, 80, 100));

  // Loop over each dot
  for (let i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].render();
  }

  // Timer
  timer += speed;
  if (timer >= spacing && reset > 0) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].nextStep();
    }
    timer = 0;
    reset--;
  }
  if (reset === 0) {
    init();
    reset = 3;
  }

  // Easing
  ease = easeInOutCubic(timer / (spacing - 1), 0, 1, 1) * 2;
}

/**
 * Animation directions
 *
 *   6   1
 *    \ /
 * 5 - 0 - 2
 *    / \
 *   4   3
 */
const animations = {
  0: '111',
  1: '213',
  2: '246',
  3: '516',
  4: '543',
};
const directions = {
  1: [0.5, -1],
  2: [1, 0],
  3: [0.5, 1],
  4: [-0.5, 1],
  5: [-1, 0],
  6: [-0.5, -1],
};

// Dot class
class Dot {
  constructor(x, y, animation) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.step = 0;
  }

  update() {
    const movement = animations[this.animation][this.step];
    this.x += directions[movement][0] * (speed * ease);
    this.y += directions[movement][1] * (speed * ease);
  }

  nextStep() {
    this.step++;
  }

  render() {
    ellipse(this.x, this.y, size, size);
  }
}

// Easing functions
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
